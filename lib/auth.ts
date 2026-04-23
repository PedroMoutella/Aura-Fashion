import { SignJWT, jwtVerify } from "jose";

// JWT_SECRET must be set via environment variable.
// The app will refuse to start if it is missing — never fall back to a hardcoded value.
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error(
    "JWT_SECRET environment variable is not defined. " +
    "Add it to your .env file before starting the app."
  );
}

const SECRET = new TextEncoder().encode(jwtSecret);

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
