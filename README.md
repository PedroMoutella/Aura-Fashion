# AURA Fashion — E-Commerce Platform

Premium sportswear e-commerce platform built with modern web technologies. Full-stack Next.js application featuring authentication, shopping cart, product catalog with dynamic variants, and secure payments infrastructure.

## 🎯 Features

### Product Catalog
- **11 Products** across 8 categories (Conjuntos, Casacos, T-Shirts, Tops, Polos, Calçado, Acessórios)
- **Dynamic Variants**: Size selection, color swatches (3 colors per product)
- **Detailed Descriptions**: Context-aware product narratives
- **Price Calculator**: 6x installment options (first 3 interest-free, 1.5% from 4x)
- **Product Detail Pages**: `/produto/[id]` with full specifications

### User Authentication
- **Registration**: Email, name, phone, age, password with validation
- **Login**: Secure credential verification
- **Database**: SQLite with Prisma ORM, bcryptjs password hashing (12 salt rounds)
- **Sessions**: JWT tokens in httpOnly cookies (7-day expiry)
- **Legal Compliance**: Mandatory acceptance of Terms and Privacy Policy

### Security Highlights
- Input validation (Zod schemas), XSS protection (CSP headers), rate limiting (10 req/min auth)
- No hardcoded secrets, no debug code, database files gitignored
- bcryptjs password hashing (12 rounds), JWT secure tokens (httpOnly, SameSite=Lax)
- Security headers: X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy

### Shopping Cart
- Global cart context shared across all pages
- Add/remove items with quantity tracking
- Side drawer with order summary

### Shipping & Payments
- CTT integration: 3 shipping modes by postal code zone
- Installment calculator: 6x with compound interest (1.5%/month from 4x)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS v4, Framer Motion animations |
| Database | SQLite + Prisma 7 (better-sqlite3 adapter) |
| Auth | bcryptjs (hashing), jose (JWT) |
| Validation | Zod |

## 📁 Key Directories

```
app/api/auth/          → Register/login endpoints
app/produto/[id]/      → Dynamic product pages
components/            → React components + UI
lib/                   → Database, auth, product data
prisma/                → Schema + migrations
```

## 🔐 Security Verified

- ✅ Input validation on all forms
- ✅ XSS/injection prevention (sanitization, CSP)
- ✅ Rate limiting (10 req/min on /api/auth)
- ✅ Secure password storage (bcryptjs, 12 rounds)
- ✅ Secure sessions (JWT httpOnly cookies)
- ✅ No hardcoded secrets (env vars only)
- ✅ No debug code in source
- ✅ Database excluded from git

## 🚀 Quick Start

```bash
git clone https://github.com/PedroMoutella/teste.git
cd teste
npm install
npx prisma migrate deploy
npm run dev
```

Open http://localhost:3000

### Environment Setup

Create `.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
```

## 📊 API Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/register | User signup |
| POST | /api/auth/login | User login |
| GET | /produto/[id] | Product details |

## 🌍 Localization

- Language: Portuguese (PT-BR)
- Currency: EUR
- Shipping: Portugal CTT
- Legal: LGPD/GDPR compliant (Terms + Privacy)

## 📄 Pages

- `/` — Homepage with product grid
- `/produto/[1-11]` — Dynamic product detail pages
- `/terms` — Terms of Use (Decreto-Lei 24/2014)
- `/privacy` — Privacy Policy (LGPD + GDPR)

## 🎨 Design

- **Colors**: Gold (#C9A84C), Cream (#FAFAF7), Charcoal (#1A1A1A)
- **Responsive**: 375px mobile → 1440px+ desktop
- **Animations**: Scroll reveals, hover effects, cart drawer transitions

## 🚀 Next Phase

- Payment gateway (Stripe/Paddle)
- Order management
- Email notifications
- Admin dashboard
- Mobile app

---

**Built**: Claude (Anthropic)  
**License**: MIT
