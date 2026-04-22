import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "change-this-secret-in-production"
);

export async function signToken(payload: { userId: number; email: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { userId: number; email: string };
  } catch {
    return null;
  }
}

export function sanitizeString(input: string): string {
  return input.trim().replace(/[<>'"]/g, "");
}
