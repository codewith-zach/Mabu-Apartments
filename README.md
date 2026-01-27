# Mabu Apartments

A luxury apartment booking platform built with Next.js 15.1.3, featuring room reservations, payment processing, and guest reviews.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development Guidelines](#development-guidelines)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Mabu Apartments is a production-grade Next.js application for managing luxury apartment bookings in Abuja, Nigeria. The platform provides:

- **Room Listings**: Browse available room types with detailed descriptions
- **Online Booking**: Secure booking system with availability checking
- **Payment Processing**: Integration with Paystack for secure payments
- **Guest Reviews**: Collect and display customer feedback
- **Bakery Services**: Showcase on-site bakery offerings

### Current Status

🚧 **Note**: This project is currently undergoing a comprehensive refactoring to improve code quality, performance, and maintainability. See [Documentation](#documentation) for details.

---

## Tech Stack

### Core Framework

- **Next.js**: 15.1.3 (App Router)
- **React**: 18.3.1
- **TypeScript**: 5.7.2 (Strict Mode)

### Database & ORM

- **PostgreSQL**: Neon Database (Serverless)
- **Prisma**: 6.2.1 ORM
- **@neondatabase/serverless**: 0.10.4
- **@prisma/adapter-neon**: 6.2.1

### Styling & UI

- **Tailwind CSS**: 3.4.1
- **shadcn/ui**: Component library
- **Radix UI**: Headless UI primitives
- **Framer Motion**: 11.15.0 (Animations)
- **Lucide React**: 0.468.0 (Icons)

### Forms & Validation

- **React Hook Form**: 7.54.1 (Form management)
- **Zod**: 3.24.1 (Schema validation)
- **@hookform/resolvers**: 3.9.1 (Zod integration)

### Payment Processing

- **Paystack**: Nigerian payment gateway

### Email

- **Nodemailer**: 6.9.16 (Email sending)

### Utilities

- **date-fns**: 3.6.0 (Date manipulation)
- **clsx**: 2.1.1 (Conditional classes)
- **tailwind-merge**: 2.5.5 (Tailwind class merging)

### Carousels

- **Embla Carousel**: 8.5.1 (Image carousels)
- **Swiper**: 11.1.15 (Alternative carousel)

### Development Tools

- **ESLint**: 9.x
- **Prettier**: 3.4.2
- **TypeScript**: 5.7.2

---

## Features

### User Features

#### Room Exploration

- Browse multiple apartment types (Studio, One Bedroom, Two Bedroom)
- View detailed room descriptions and amenities
- High-quality image galleries for each room
- Capacity and pricing information

#### Booking System

- Real-time availability checking
- Date range selection with calendar picker
- Automatic price calculation based on stay duration
- WhatsApp booking option
- Secure online payment via Paystack

#### Payment Integration

- Paystack payment gateway integration
- Automatic booking confirmation on successful payment
- Webhook handling for payment verification
- Payment success/failure handling

#### Guest Reviews

- Submit reviews for booked rooms
- Display all guest reviews
- Star rating system
- Infinite scroll for review loading
- Review filtering and display

#### Bakery Services

- Menu display for pastries and juices
- Pricing information
- Category-based navigation

### Admin Features

#### Booking Management

- View all bookings with guest details
- Automatic availability updates
- Booking confirmation emails
- Manager notification emails

#### Review Management

- Guest review submissions
- Review display on room pages

### Technical Features

#### Performance

- Server-side rendering for static content
- Image optimization with `next/image`
- Code splitting for heavy components
- Caching strategies (SSG/ISR ready)

#### SEO

- Meta tags for all pages (planned)
- Semantic HTML structure
- Image alt text
- Open Graph tags for social sharing (planned)
- Structured data for rich snippets (planned)

#### Security

- Input validation on all endpoints (planned)
- Environment variable protection (planned)
- Webhook signature verification
- Rate limiting (planned)

#### Code Quality

- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Type safety enforcement (planned)

---

## Project Structure

```
mabu-apartments/
├── app/                      # Next.js App Router pages
│   ├── (routes)/          # Route groups (planned)
│   ├── api/               # API routes and webhooks
│   │   ├── create-booking/
│   │   ├── check-availability/
│   │   ├── create-payment/
│   │   ├── verify-payment/
│   │   ├── paystack-webhook/
│   │   ├── reviews/
│   │   ├── unavailable-dates/
│   │   └── debug-bookings/    # DEBUG ENDPOINT (remove in production)
│   ├── about/            # About page
│   ├── bakery/            # Bakery page
│   ├── booking-success/    # Booking success page
│   ├── contact/            # Contact page
│   ├── payment-success/    # Payment success page
│   ├── rooms/             # Rooms listing
│   │   └── [slug]/       # Individual room detail
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css         # Global styles
│
├── components/              # React components
│   ├── ui/               # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── calendar.tsx
│   │   ├── carousel.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   └── toaster.tsx
│   │
│   ├── hero.tsx          # Rooms hero (to be consolidated)
│   ├── HeroSection.tsx    # About hero (to be consolidated)
│   ├── contact-hero.tsx   # Contact hero (to be consolidated)
│   ├── apartment-hero.tsx # Room detail hero (to be consolidated)
│   ├── booking-form.tsx   # Complex booking form (needs refactoring)
│   ├── room-list.tsx      # Room listing component
│   ├── room-carousel.tsx   # Room image carousel
│   ├── reviews.tsx         # Reviews with infinite scroll
│   ├── leave-review-form.tsx
│   ├── rating-display.tsx  # Rating display (unused)
│   ├── room-description.tsx
│   ├── amenities.tsx       # Amenities display (unused)
│   ├── gallery-carousel.tsx # Gallery carousel (unused)
│   ├── carousel.tsx       # Another carousel (unused)
│   ├── GetToKnowUs.tsx   # About section
│   ├── LocationSection.tsx  # About section
│   ├── MainFacilities.tsx  # Facilities section
│   ├── FAQ.tsx            # FAQ section
│   ├── HeroSection.tsx    # About hero
│   ├── contact-hero.tsx   # Contact hero
│   ├── contact-info.tsx    # Contact information
│   ├── header.tsx         # Site navigation
│   ├── footer.tsx         # Site footer
│   ├── error-boundary.tsx # Error boundary
│   └── loading-spinner.tsx # Loading component
│
├── lib/                    # Utilities
│   ├── db.ts             # Prisma singleton (Neon adapter)
│   ├── prisma.ts         # Prisma singleton (standard) - DUPLICATE
│   └── utils.ts          # General utilities
│
├── utils/                   # Utilities
│   └── email.ts         # Email templates and sending
│
├── prisma/                  # Prisma configuration
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding script
│
├── hooks/                   # Custom React hooks
│   ├── use-toast.ts      # Toast notifications
│   └── use-scroll-animation.ts  # Scroll animations
│
├── types/                   # TypeScript types
│   └── globals.d.ts     # Global type definitions
│
├── scripts/                 # Utility scripts
│   ├── update-prices.js
│   ├── check-database.js
│   ├── check-bookings.js
│   ├── check-availabilities.js
│   └── clear-database.js
│
├── docs/                    # Documentation (newly created)
│   ├── refactoring-plan.md       # Comprehensive refactoring plan
│   └── code-analysis.md         # Best practices code analysis
│
├── public/                  # Static assets
│   ├── images/           # Image assets
│   │   ├── rooms/        # Room images
│   │   └── ...           # Other images
│   └── videos/           # Video assets
│
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.mjs       # ESLint configuration
├── postcss.config.mjs      # PostCSS configuration
├── components.json         # shadcn/ui configuration
├── .env.example            # Environment variables template
├── vercel.json            # Vercel deployment configuration
└── package.json            # Dependencies and scripts
```

---

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **PostgreSQL database** (Neon account recommended)
- **Paystack account** (for payment processing)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd mabu-apartments
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Set up database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Push schema to database (or run migrations)
   npx prisma db push

   # Seed database (optional)
   npm run seed
   ```

5. **Run development server**

   ```bash
   npm run dev
   ```

6. **Open application**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command                        | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `npm run dev`                  | Start development server with Turbopack                 |
| `npm run build`                | Build production application (includes Prisma generate) |
| `npm run start`                | Start production server                                 |
| `npm run lint`                 | Run ESLint                                              |
| `npm run seed`                 | Seed database with sample data                          |
| `npm run update-prices`        | Update room prices via script                           |
| `npm run check-database`       | Check database connection and data                      |
| `npm run check-bookings`       | Check booking data                                      |
| `npm run check-availabilities` | Check room availability data                            |
| `npm run clear-db`             | Clear all database data                                 |

---

## Development Guidelines

### Code Style

#### Naming Conventions

- **Components**: PascalCase (e.g., `BookingForm`, `RoomList`)
- **Functions/Variables**: camelCase (e.g., `fetchReviews`, `isPlaying`)
- **Files**: PascalCase for components (e.g., `BookingForm.tsx`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)

#### File Organization

- Keep components focused on single responsibility
- Co-locate route-specific components with their pages
- Extract reusable utilities to `lib/` or `utils/`
- Organize by feature, not by file type

#### Import Organization

- Use path aliases (`@/`) instead of relative imports
- Group imports: external libraries first, then internal
- Remove unused imports

### Git Workflow

#### Branch Naming

- `feature/<feature-name>` - New features
- `fix/<bug-description>` - Bug fixes
- `refactor/<area>` - Code refactoring
- `docs/<documentation>` - Documentation updates

#### Commit Messages

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

**Examples**:

- `feat(booking): add date range picker with availability check`
- `fix(api): resolve webhook signature verification issue`
- `refactor(components): extract scroll logic to custom hook`

### Testing

Currently, **no automated testing framework is set up**. This is planned for the refactoring phase.

**Planned Testing Stack**:

- **Unit Tests**: Jest or Vitest + React Testing Library
- **E2E Tests**: Playwright

**Manual Testing Checklist**:

- [ ] Test booking flow on all room types
- [ ] Verify payment processing with Paystack sandbox
- [ ] Test email notifications
- [ ] Verify availability checking
- [ ] Test review submission
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Verify SEO meta tags
- [ ] Check Core Web Vitals

### Code Review Process

1. Self-review code before committing
2. Ensure TypeScript compiles without errors
3. Run linting (`npm run lint`)
4. Test the changes manually
5. Request review for critical changes

---

## Environment Variables

### Required Variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

# Email Configuration
EMAIL_HOST="smtp.example.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-email@example.com"
EMAIL_PASS="your-email-password"
EMAIL_FROM="Mabu Apartments <noreply@mabuapartments.com>"
CONTACT_FORM_RECIPIENT="manager@mabuapartments.com"

# Payment Gateway (Paystack)
PAYSTACK_SECRET_KEY="your-paystack-secret-key"
PAYSTACK_PUBLIC_KEY="your-paystack-public-key"

# Application URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
# or production:
# NEXT_PUBLIC_APP_URL="https://mabuapartments.com"
```

### Environment-Specific Variables

#### Development

```bash
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

#### Production

```bash
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://mabuapartments.com"
```

**Security Notes**:

- Never commit `.env` file to version control
- Use `.env.example` as a template
- Rotate secret keys regularly
- Use `NEXT_PUBLIC_` prefix only for client-side safe values

---

## Database Schema

### Prisma Models

```prisma
// Prisma schema simplified view

model RoomType {
  id          String   @id @default(cuid())
  name        String   @unique
  slug        String   @unique
  description String
  price       Float
  capacity    Int
  imageUrl    String
  images      String[]
  rooms       Room[]
  roomCount   Int
}

model Room {
  id           String         @id @default(cuid())
  roomType     RoomType       @relation(fields: [roomTypeId], references: [id])
  roomTypeId   String
  roomNumber   String         @unique
  bookings     Booking[]
  availability Availability[]
  reviews      Review[]
}

model Booking {
  id               String   @id @default(cuid())
  roomId           String
  room             Room     @relation(fields: [roomId], references: [id])
  guestName        String
  guestEmail       String
  checkIn          DateTime
  checkOut         DateTime
  totalPrice       Float
  paymentStatus    String
  paymentReference String?
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model Availability {
  id          String   @id @default(cuid())
  roomId      String
  room        Room     @relation(fields: [roomId], references: [id])
  date        DateTime
  isAvailable Boolean

  @@unique([roomId, date])
}

model Review {
  id        String   @id @default(cuid())
  roomId    String
  room      Room     @relation(fields: [roomId], references: [id])
  name      String
  rating    Int
  comment   String
  createdAt DateTime @default(now())
}
```

### Database Relationships

```
RoomType (1) ── (N) Room (N) ── Availability (N) (per room, per date)
               │
               └── Booking (N)
               └── Review (N)
```

### Seed Data

The project includes a seed script (`prisma/seed.ts`) that creates:

- 3 Room types (Studio, One Bedroom, Two Bedroom)
- Sample rooms for each type
- Availability data for each room
- Sample bookings and reviews

**Run seed**: `npm run seed`

---

## API Endpoints

### Booking Endpoints

#### `POST /api/create-booking`

Create a new booking.

**Request Body**:

```typescript
{
  roomId: string
  guestName: string
  guestEmail: string
  checkIn: string (ISO date)
  checkOut: string (ISO date)
  totalPrice: number
  paymentReference: string
}
```

**Response**:

```typescript
{
  success: boolean;
  booking: Booking;
}
```

#### `POST /api/check-availability`

Check if a room is available for given dates.

**Request Body**:

```typescript
{
  roomTypeId: string
  checkIn: string (ISO date)
  checkOut: string (ISO date)
}
```

**Response**:

```typescript
{
  available: boolean
  roomId?: string
}
```

#### `GET /api/unavailable-dates?roomTypeId={id}`

Get unavailable dates for a room type.

**Response**:

```typescript
{
  unavailableDates: Date[]
}
```

### Payment Endpoints

#### `POST /api/create-payment`

Initialize Paystack payment.

**Request Body**:

```typescript
{
  email: string
  amount: number (in kobo - smallest currency unit)
  metadata: {
    roomId: string
    name: string
    checkIn: string
    checkOut: string
  }
}
```

**Response**:

```typescript
{
  authorization_url: string;
  access_code: string;
  reference: string;
}
```

#### `POST /api/verify-payment`

Verify a Paystack payment.

**Request Body**:

```typescript
{
  reference: string;
}
```

**Response**:

```typescript
{
  status: string;
  message: string;
  data: {
    amount: number;
    customer: object;
    metadata: object;
    reference: string;
  }
}
```

#### `POST /api/paystack-webhook`

Paystack webhook for payment notifications.

**Headers**:

- `x-paystack-signature`: HMAC signature for verification

**Request Body**: Paystack webhook payload

### Review Endpoints

#### `GET /api/reviews?roomId={id}&page={n}&limit={n}`

Get reviews for a room with pagination.

**Response**:

```typescript
{
  reviews: Review[]
  hasMore: boolean
}
```

#### `POST /api/reviews`

Submit a new review.

**Request Body**:

```typescript
{
  roomId: string;
  name: string;
  rating: number(1 - 5);
  comment: string;
}
```

**Response**:

```typescript
{
  success: boolean;
  review: Review;
}
```

### Debug Endpoints

⚠️ **Security Warning**: Debug endpoints should be removed in production.

#### `GET /api/debug-bookings`

Returns recent bookings (for debugging).

#### `GET /api/rooms/[slug]`

Get room details by slug.

---

## Documentation

### Comprehensive Documentation

The project includes detailed documentation to guide development and refactoring:

#### 📋 [Refactoring Plan](docs/refactoring-plan.md)

**Complete refactoring roadmap to achieve production-grade standards**

A 4-week implementation plan addressing:

- Component cleanup and consolidation
- Architecture reorganization
- Rendering strategy optimization
- Server Actions implementation
- Type safety improvements
- Performance optimization
- Security enhancements
- Testing setup
- CI/CD configuration

**Includes**:

- 10 phases with detailed tasks
- Priority matrix
- Impact analysis
- Success criteria
- Risk mitigation strategies

#### 📊 [Code Analysis](docs/code-analysis.md)

**Best practices evaluation of current codebase**

Comprehensive analysis covering:

- **38 identified violations** across 12 categories
- Current problematic code with examples
- Corrected approaches with implementation guidance
- Benefits of each improvement

**Categories**:

- Project Architecture & Structure
- Rendering Strategy
- Data Fetching & Server Actions
- Type Safety
- Performance & Bundling
- State Management
- API Routes & Modularization
- Code Quality
- SEO & Metadata
- Security Best Practices
- Production Readiness Checklist

**Learning Outcomes**:

- Key takeaways for production-grade development
- Common anti-patterns to avoid
- Recommended next steps prioritized by severity

---

## Deployment

### Vercel Deployment (Recommended)

The project is configured for Vercel deployment via `vercel.json`.

#### Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- Environment variables configured in Vercel dashboard

#### Deployment Steps

1. **Push code to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Configure Environment Variables in Vercel**

   - Go to Vercel dashboard → Project Settings → Environment Variables
   - Add all required variables from [Environment Variables](#environment-variables)
   - Ensure `PAYSTACK_SECRET_KEY` is NOT marked public
   - Add `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` as public variable

3. **Deploy**

   - Vercel will auto-deploy on push to main branch
   - Or trigger manual deploy from Vercel dashboard

4. **Verify Deployment**
   - Check that the site loads correctly
   - Test booking flow
   - Verify payment processing
   - Check email notifications

#### Vercel Configuration (`vercel.json`)

```json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "prisma generate && next dev",
  "installCommand": "prisma generate",
  "framework": "nextjs"
}
```

### Environment-Specific Configuration

#### Development

```bash
# Run locally with hot reload
npm run dev

# Access at: http://localhost:3000
```

#### Production

```bash
# Build for production
npm run build

# Start production server (for testing)
npm run start

# Production URL: https://your-domain.com
```

### Database Deployment

**Neon Database (Serverless PostgreSQL)**

1. **Create Neon account**: [neon.tech](https://neon.tech)
2. **Create database**: Via Neon dashboard
3. **Get connection string**: Copy DATABASE_URL from Neon dashboard
4. **Configure in Vercel**: Add DATABASE_URL to environment variables
5. **Push schema**:
   ```bash
   npx prisma db push --preview-feature
   npx prisma db push
   ```

---

## Contributing

### For Team Members

#### Setting Up Development Environment

1. **Fork and clone** the repository
2. **Install dependencies**: `npm install`
3. **Set up environment variables**: Copy `.env.example` to `.env` and configure
4. **Set up database**: `npx prisma db push`
5. **Start development server**: `npm run dev`

#### Code Review Guidelines

- **Review the refactoring plan** before making changes
- **Follow naming conventions**: PascalCase for components, camelCase for functions
- **Check TypeScript errors**: Ensure no `any` types, proper typing
- **Test locally**: Verify changes work before committing
- **Keep components focused**: Single responsibility, reasonable size (<150 lines)
- **Use Server Components by default**: Only use "use client" when necessary
- **Validate inputs**: All API routes and Server Actions should validate inputs

### Bug Reporting

When reporting bugs:

1. **Check existing issues** in the project repository
2. **Use bug report template**:

   ```
   **Description**
   A clear and concise description of what the bug is.

   **To Reproduce**
   Steps to reproduce the behavior:
   1. Go to '...'
   2. Click on '...'
   3. Scroll down to '...'
   4. See error

   **Expected Behavior**
   What you expected to happen.

   **Actual Behavior**
   What actually happened.

   **Screenshots**
   If applicable, add screenshots to help explain your problem.

   **Environment**
   - Node version: [e.g., 18.x]
   - Browser: [e.g., Chrome 120]
   - OS: [e.g., macOS]
   ```

3. **Label issues** appropriately: `bug`, `enhancement`, `documentation`, etc.

### Feature Requests

For new features:

1. **Check the refactoring plan** to see if it's already planned
2. **Describe the feature** clearly and concisely
3. **Explain the use case**: Why is this feature needed?
4. **Provide examples**: How should it work?
5. **Label as enhancement**: For new feature requests

---

## Current Architecture Notes

### Known Issues & Improvements Needed

The current codebase has several areas that need improvement. See the detailed analysis in [Code Analysis](docs/code-analysis.md) for specific issues and solutions.

#### High Priority Issues

1. **Security**

   - Debug endpoints exposed (`/api/debug-bookings`)
   - Missing input validation on API routes
   - Hardcoded contact information
   - Console.log statements in production

2. **Architecture**

   - Duplicate hero components (4 separate implementations)
   - Components not co-located with routes
   - No services layer (business logic in API routes)
   - Duplicate Prisma client instances

3. **Type Safety**

   - Extensive use of `any` types in `utils/email.ts`
   - Scattered type definitions across components

4. **Rendering**

   - Entire pages as client components unnecessarily
   - No caching strategies defined
   - Client-side data fetching that could be server-rendered

5. **Performance**
   - Large components (366 lines for booking form)
   - No dynamic imports for heavy libraries
   - Missing image priority for above-fold images

### Planned Refactoring

All improvements are documented in the [Refactoring Plan](docs/refactoring-plan.md). The plan is organized into:

- **Phase 1** (Week 1): Foundation & Structure
- **Phase 2** (Week 1): Component Refactoring
- **Phase 3** (Week 2): Rendering Strategy
- **Phase 4** (Week 2): Server Actions
- **Phase 5** (Week 2): Validation & Type Safety
- **Phase 6** (Week 3): SEO & Metadata
- **Phase 7** (Week 3): Performance Optimization
- **Phase 8** (Week 3): Security Improvements
- **Phase 9** (Week 3): Testing Setup
- **Phase 10** (Week 4): Production Readiness

---

## Performance Metrics

### Key Performance Indicators (KPIs)

#### Core Web Vitals (Target Metrics)

| Metric                         | Target  | Current         | Notes                     |
| ------------------------------ | ------- | --------------- | ------------------------- |
| LCP (Largest Contentful Paint) | < 2.5s  | ❌ Not measured | Use `next/image` priority |
| FID (First Input Delay)        | < 100ms | ❌ Not measured | Minimize JS execution     |
| CLS (Cumulative Layout Shift)  | < 0.1   | ⚠️ Some shifts  | Add image placeholders    |
| TTI (Time to Interactive)      | < 3.8s  | ❌ Not measured | Code splitting needed     |

#### Bundle Size Goals

- Initial JS bundle: < 100 KB (gzipped)
- CSS bundle: < 20 KB (gzipped)
- Total page weight: < 500 KB (including images)

---

## Troubleshooting

### Common Issues

#### Database Connection Issues

**Problem**: Prisma client fails to connect

**Solutions**:

1. Verify `DATABASE_URL` is correct
2. Check if Neon database is active
3. Run `npx prisma db push` to verify schema
4. Check network connectivity

#### Payment Issues

**Problem**: Paystack payments failing

**Solutions**:

1. Verify `PAYSTACK_SECRET_KEY` is correct
2. Check if `PAYSTACK_PUBLIC_KEY` is set as `NEXT_PUBLIC_`
3. Test with Paystack sandbox first
4. Check webhook URL is accessible
5. Verify webhook signature verification

#### Build Errors

**Problem**: `npm run build` fails

**Solutions**:

1. Run `npx prisma generate` first
2. Check TypeScript errors: `npx tsc --noEmit`
3. Fix lint errors: `npm run lint`
4. Check for missing dependencies: `npm install`
5. Clear `.next` directory and rebuild

---

## Resources

### Official Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Paystack Documentation](https://paystack.com/docs/)

### Community Resources

- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Prisma Community](https://pris.ly/discord)
- [shadcn/ui Examples](https://ui.shadcn.com)

### Learning Resources

- [Next.js Learn Course](https://nextjs.org/learn)
- [React Patterns](https://reactpatterns.com/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

---

## License

This project is proprietary software. All rights reserved by Mabu Apartments.

---

## Contact

- **Project Repository**: [GitHub URL]
- **Website**: [https://mabuapartments.com](https://mabuapartments.com)
- **Email**: info@mabuapartments.com

---

**Last Updated**: January 27, 2026
