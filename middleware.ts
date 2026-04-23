import { NextRequest, NextResponse } from "next/server";

// NOTE ON RATE LIMITING:
// This in-memory Map works correctly in long-running Node.js servers (VPS, Docker).
// In serverless environments (Vercel, AWS Lambda), each cold start resets the Map,
// making this limit ineffective. If you deploy to Vercel, replace this with a
// persistent store such as Upstash Redis + @upstash/ratelimit.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  // HSTS — instructs browsers to always use HTTPS for this domain (2 years)
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains"
  );

  // CSP: restrictive in production, permissive in dev for Next.js HMR / Framer Motion
  const cspProduction = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
  ].join("; ");

  const cspDev = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
  ].join("; ");

  response.headers.set(
    "Content-Security-Policy",
    process.env.NODE_ENV === "production" ? cspProduction : cspDev
  );

  // Rate limit on auth routes: 10 requests per minute per IP
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const allowed = rateLimit(ip, 10, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 1 minuto." },
        { status: 429 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
