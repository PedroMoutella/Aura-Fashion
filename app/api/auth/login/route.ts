import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { signToken, sanitizeString } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse({
      email: sanitizeString(body.email ?? ""),
      password: body.password ?? "",
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    // Same error message for wrong email or password — prevents user enumeration
    if (!user) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const token = await signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json({
      message: "Login realizado com sucesso",
      user: { id: user.id, email: user.email, firstName: user.firstName },
    });

    response.cookies.set("aura_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
