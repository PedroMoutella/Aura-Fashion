import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signToken, sanitizeString } from "@/lib/auth";

const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^[\d\s\-()+]{8,20}$/, "Telefone inválido"),
  age: z.number().int().min(14).max(120),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Precisa de ao menos uma letra maiúscula")
    .regex(/[0-9]/, "Precisa de ao menos um número"),
  acceptedTerms: z.boolean().refine((v) => v === true, "Aceite os termos"),
  acceptedPrivacy: z.boolean().refine((v) => v === true, "Aceite a política de privacidade"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse({
      ...body,
      firstName: sanitizeString(body.firstName ?? ""),
      lastName: sanitizeString(body.lastName ?? ""),
      email: sanitizeString(body.email ?? ""),
      age: Number(body.age),
    });

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Dados inválidos";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const data = parsed.data;

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        age: data.age,
        password: hashed,
        acceptedTerms: data.acceptedTerms,
        acceptedPrivacy: data.acceptedPrivacy,
      },
    });

    const token = await signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json(
      { message: "Conta criada com sucesso", user: { id: user.id, email: user.email, firstName: user.firstName } },
      { status: 201 }
    );

    response.cookies.set("aura_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
