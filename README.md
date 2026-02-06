# ContentForge AI - AI-Powered Content Creation Platform

A complete freemium SaaS platform built with Next.js 15, featuring AI-powered content generation, 3-day trial system, Stripe payment integration, and comprehensive SEO optimization.

## Features

### 🎨 Premium Design
- Glassmorphism UI effects
- Animated gradients and micro-interactions
- Dark mode support
- Fully responsive (mobile-first)
- Custom design system with Tailwind CSS

### 🤖 AI Content Generation
- Blog Post Generator
- Social Media Content Creator (Twitter, LinkedIn, Instagram, Facebook)
- Email Template Generator
- Video Script Writer
- Ad Copy Generator
- SEO Meta Description Tool

### 💳 Freemium Business Model
- 3-day free trial (5 content generations)
- Pro Plan: $29/month (100 generations)
- Enterprise Plan: $99/month (unlimited)
- Stripe payment integration
- Automated trial management

### 🔐 Authentication
- Email/Password authentication
- OAuth (Google, GitHub)
- Protected routes
- Session management with NextAuth.js

### 📊 Usage Tracking
- Monthly quota management
- Real-time usage statistics
- Automatic monthly reset
- Trial countdown system

### 📧 Email System
- Welcome emails
- Trial reminder emails (days 1, 2, 3)
- Subscription confirmation
- Transactional emails via Resend

### 🔍 SEO Optimization
- Dynamic metadata generation
- JSON-LD structured data
- Sitemap and robots.txt
- Open Graph and Twitter Card tags
- Mobile-optimized
- Core Web Vitals optimized

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe
- **AI**: OpenAI GPT-4
- **Email**: Resend
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation

## Getting Started

### Prerequisites
- Node.js 18.17.0 or higher
- PostgreSQL database
- Stripe account
- OpenAI API key (optional for development - uses mocks)
- Resend API key (optional for development - uses console logging)

### Installation

1. **Clone the repository**
```bash
cd C:\Users\snowp\.gemini\antigravity\scratch\contentforge-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/contentforge"
NEXTAUTH_SECRET="your-secret-here"
STRIPE_SECRET_KEY="sk_test_..."
OPENAI_API_KEY="sk-..." # Optional
RESEND_API_KEY="re_..." # Optional
```

4. **Set up the database**
```bash
npm run db:push
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
```
http://localhost:3000
```

## Project Structure

```
contentforge-ai/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard pages
│   ├── pricing/           # Pricing page
│   ├── features/          # Features page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React components
│   ├── landing/           # Landing page components
│   ├── layout/            # Header, Footer
│   ├── pricing/           # Pricing components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   ├── db.ts              # Prisma client
│   ├── email.ts           # Email service
│   ├── openai.ts          # OpenAI integration
│   ├── seo.ts             # SEO utilities
│   ├── stripe.ts          # Stripe integration
│   ├── trial.ts           # Trial management
│   ├── usage.ts           # Usage tracking
│   ├── utils.ts           # General utilities
│   └── validations.ts     # Zod schemas
├── prisma/                # Database schema
│   └── schema.prisma      # Prisma schema
└── public/                # Static assets

```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Prisma Studio

## Key Features Implementation

### Trial System
- Automatically starts on signup
- 3-day countdown with reminders
- Smooth conversion to paid plans
- Usage limit enforcement

### Payment Integration
- Stripe Checkout for subscriptions
- Customer Portal for management
- Webhook handlers for events
- Automatic subscription status updates

### Content Generation
- OpenAI integration with fallback mocks
- Usage tracking per generation
- Save to content library
- Export functionality

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment
1. Build the project: `npm run build`
2. Set DATABASE_URL to production database
3. Run migrations: `npm run db:push`
4. Start server: `npm run start`

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - App URL
- `STRIPE_SECRET_KEY` - Stripe secret key

Optional (uses mocks if not provided):
- `OPENAI_API_KEY` - OpenAI API key
- `RESEND_API_KEY` - Resend email API key
- `GOOGLE_CLIENT_ID` - Google OAuth
- `GOOGLE_CLIENT_SECRET` - Google OAuth
- `GITHUB_ID` - GitHub OAuth
- `GITHUB_SECRET` - GitHub OAuth

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License - see LICENSE file for details

## Support

For support, email support@contentforge.ai or visit our contact page.

---

Built with ❤️ using Next.js, TypeScript, and AI
