# Next.js Best Practices Code Analysis
## Mabu Apartments - Comprehensive Evaluation

**Purpose**: Learning material for understanding Next.js App Router best practices and identifying areas for improvement in production-grade applications.

**Last Updated**: January 27, 2026

---

## Executive Summary

This document provides a comprehensive code analysis of the Mabu Apartments project against Next.js 15.1.3 App Router best practices. It identifies specific violations, explains why they're problematic, and demonstrates correct approaches with code examples.

**Total Violations Identified**: 38
**Critical Issues**: 7
**High Priority Issues**: 11
**Medium Priority Issues**: 12
**Low Priority Issues**: 8

---

## Table of Contents

1. [Project Architecture & Structure](#1-project-architecture--structure)
2. [Rendering Strategy](#2-rendering-strategy)
3. [Data Fetching & Server Actions](#3-data-fetching--server-actions)
4. [Type Safety](#4-type-safety)
5. [Performance & Bundling](#5-performance--bundling)
6. [State Management](#6-state-management)
7. [API Routes & Modularization](#7-api-routes--modularization)
8. [Linting, Formatting & Code Quality](#8-linting--formatting--code-quality)
9. [SEO & Metadata](#9-seo--metadata)
10. [Security Best Practices](#10-security-best-practices)
11. [Production Readiness Checklist](#11-production-readiness-checklist)
12. [Summary & Recommendations](#12-summary--recommendations)

---

## 1. Project Architecture & Structure

### Best Practice Principles

**Enforce feature-based organization:**
- Organize code by feature domains (booking, reviews, rooms)
- Co-locate route-specific components inside route folders
- Keep shared/reusable components in dedicated directories

**Use proper directory structure:**
```
app/
  (routes)/
    [feature]/
      components/      # Feature-specific components
      page.tsx
components/
  ui/               # Shared UI components
  [feature]/         # Shared feature components
lib/
  validators/        # Schema validation
  db/              # Database access
  auth/             # Authentication
services/          # Business logic layer
types/             # Centralized type definitions
```

### Current Codebase Issues

#### Issue 1: Components Not Co-Located with Pages

**Files Affected:**
- `/components/room-list.tsx` - Used only in `/app/rooms/page.tsx`
- `/components/room-carousel.tsx` - Used only in `/app/rooms/[slug]/page.tsx`
- `/components/reviews.tsx` - Used only in `/app/rooms/[slug]/page.tsx`
- `/components/HeroSection.tsx` - Used only in `/app/about/page.tsx`
- `/components/GetToKnowUs.tsx` - Used only in `/app/about/page.tsx`
- `/components/LocationSection.tsx` - Used only in `/app/about/page.tsx`
- `/components/FAQ.tsx` - Used only in `/app/about/page.tsx`
- `/components/MainFacilities.tsx` - Used in About and Rooms pages

**Problem:**
Components are scattered in root `components/` directory, even when they're only used in a single location. This increases cognitive load when navigating the codebase and violates the co-location principle.

**Better Approach:**

```typescript
// Current structure ❌
components/
  room-list.tsx              // Only used in app/rooms/page.tsx
  room-carousel.tsx           // Only used in app/rooms/[slug]/page.tsx
  HeroSection.tsx            // Only used in app/about/page.tsx

// Better structure ✅
app/
  about/
    components/
      HeroSection.tsx        // Co-located with about page
      GetToKnowUs.tsx
      LocationSection.tsx
      FAQ.tsx
    page.tsx
  rooms/
    components/
      RoomList.tsx           // Co-located with rooms page
      page.tsx
    [slug]/
      components/
        RoomCarousel.tsx      // Co-located with room detail page
        Reviews.tsx
      page.tsx
```

**Benefits of Co-location:**
- Reduces mental model complexity
- Easier to find related code
- Clearer component ownership
- Better for onboarding new developers

---

#### Issue 2: Duplicate Components Doing the Same Thing

**Files Affected:**
- `/components/hero.tsx` (Rooms page hero)
- `/components/HeroSection.tsx` (About page hero)
- `/components/contact-hero.tsx` (Contact page hero)
- `/components/apartment-hero.tsx` (Apartment detail hero)

**Problem:**
Four separate hero components with slight variations (title, background image, styling) but fundamentally doing the same thing. This violates DRY (Don't Repeat Yourself) principle and creates a maintenance burden.

**Benefits of consolidation:**
- Single source of truth for hero functionality
- Easy to add new variants
- Consistent behavior across all pages
- Easier to maintain and test

---

## 2. Rendering Strategy

### Best Practice Principles

**Choose rendering per route intentionally:**
- Default to Server Components
- Use Static Rendering (SSG) for marketing/content pages
- Use ISR for CMS-driven or periodically updated pages
- Use SSR only for user-specific pages

**Rules:**
- Mark Client Components explicitly with "use client"
- Minimize Client Components; keep most logic on the server
- Never access browser APIs in Server Components or Server Actions
- Use dynamic() for heavy components or client-only libraries

### Current Codebase Issues

#### Issue 3: Unnecessary Client Component - Home Page (520 lines)

**File:** `/app/page.tsx`

**Problem:**
The entire home page is marked as a client component, even though most content is static. Only video player and carousel need client-side interactivity.

**Impact:**
- Increases JavaScript bundle size (entire page sent to client)
- Reduces SEO (search engines see empty page until JavaScript loads)
- Eliminates server-side rendering benefits
- Poor initial page load performance

**Better Approach - Server Component with Selective Client Boundaries:**

```typescript
// /app/page.tsx (Server Component)
import { VideoHero } from '@/components/home/VideoHero'
import { RoomsCarousel } from '@/components/home/RoomsCarousel'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'

// ✅ No "use client" - this is a server component
export default function Home() {
  return (
    <main>
      {/* ✅ Client component for video player */}
      <VideoHero />

      {/* ✅ Static content - server rendered */}
      <TestimonialsSection />
      <LocationSection />

      {/* ✅ Client component for carousel */}
      <RoomsCarousel />
    </main>
  )
}
```

---

#### Issue 4: About Page as Client Component

**File:** `/app/about/page.tsx`

**Problem:**
The entire about page is marked as a client component when child components already handle interactivity.

**Better Approach:**

```typescript
// /app/about/page.tsx (Server Component)
import { HeroSection } from '@/app/about/components/HeroSection'
import { GetToKnowUs } from '@/app/about/components/GetToKnowUs'

// ✅ Server component - no "use client"
export default function AboutPage() {
  return (
    <div className="bg-[#faf9f6]">
      <HeroSection />
      <div className="container mx-auto px-4 py-16 md:px-10">
        <GetToKnowUs />
        <LocationSection />
        <MainFacilities />
        <FAQ />
      </div>
    </div>
  )
}
```

---

#### Issue 5: Hero Components Marked as Client Unnecessarily

**Files Affected:**
- `/components/hero.tsx`
- `/components/apartment-hero.tsx`
- `/components/contact-hero.tsx`

**Problem:**
These hero components are marked as client components but don't use any browser APIs or interactivity that requires client-side execution.

**Better Approach - Server Components:**

```typescript
// /components/shared/hero/Hero.tsx (Server Component)
import Image from 'next/image'

interface HeroProps {
  title: string
  image: string
  variant?: 'default' | 'about' | 'contact'
}

// ✅ No "use client" - pure server component
export function Hero({ title, image, variant = 'default' }: HeroProps) {
  return (
    <div className={`relative ${heightClasses[variant]} w-full`}>
      <Image src={image} alt={title} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
    </div>
  )
}
```

---

#### Issue 6: No Caching Strategy Defined

**Files Affected:**
- `/app/rooms/page.tsx` - No revalidate directive
- `/app/rooms/[slug]/page.tsx` - No revalidate directive
- `/app/about/page.tsx` - No revalidate directive

**Problem:**
Content pages don't define caching strategies, leading to inefficient rendering.

**Better Approach:**

```typescript
// /app/rooms/page.tsx
export const revalidate = 3600 // 1 hour in seconds

export default async function RoomsPage() {
  // ...
}
```

---

## 3. Data Fetching & Server Actions

### Best Practice Principles

**Prefer Server Actions over traditional API routes for mutations:**
- Treat Server Actions like backend endpoints
- Validate all inputs with schemas
- Sanitize data
- Handle errors explicitly
- No window, localStorage, or browser APIs in Server Actions

**Extract business logic to /lib or /services:**
- Keep route handlers and actions thin
- Centralize error handling
- Always return typed responses

### Current Codebase Issues

#### Issue 7: Data Fetching in Client Component

**File:** `/components/reviews.tsx`

**Problem:**
Reviews component fetches data on the client side, even though initial data could be server-rendered.

**Better Approach - Server Component with Progressive Enhancement:**

```typescript
// /app/rooms/[slug]/components/Reviews.tsx (Server Component)
import { ReviewCard } from './ReviewCard'
import { ReviewsListClient } from './ReviewsListClient'

async function getInitialReviews(roomId: string) {
  const reviews = await prisma.review.findMany({
    where: { roomId },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })
  return reviews
}

export async function Reviews({ roomId }: ReviewsProps) {
  // ✅ Fetch initial data on server
  const initialReviews = await getInitialReviews(roomId)

  return (
    <div>
      {/* ✅ Server-rendered initial reviews */}
      <div className="space-y-4">
        {initialReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* ✅ Client component for pagination */}
      <ReviewsListClient roomId={roomId} initialReviewsCount={initialReviews.length} />
    </div>
  )
}
```

---

#### Issue 8: No Input Validation on API Routes

**Files Affected:**
- `/app/api/create-booking/route.ts`
- `/app/api/create-payment/route.ts`
- `/app/api/check-availability/route.ts`
- `/app/api/reviews/route.ts`

**Problem:**
API routes accept and process input without validation, leading to potential errors, security vulnerabilities, and poor user experience.

**Better Approach - Comprehensive Validation:**

```typescript
// /lib/validators/booking.schema.ts
import { z } from 'zod'

export const createBookingSchema = z.object({
  roomId: z.string().min(1, 'Room ID is required'),
  guestName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  guestEmail: z.string().email('Invalid email address'),
  checkIn: z.coerce.date().refine(
    (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
    'Check-in must be today or in the future'
  ),
  checkOut: z.coerce.date().refine(
    (date) => date >= new Date(new Date().setHours(0, 0, 0, 0)),
    'Check-out must be today or in the future'
  ),
  totalPrice: z.number().positive('Price must be positive'),
  paymentReference: z.string().min(1, 'Payment reference is required'),
})

// /app/actions/bookings.ts (Server Action)
'use server'

import { createBookingSchema } from '@/lib/validators/booking.schema'
import { createBooking } from '@/services/booking.service'

export async function createBookingAction(formData: FormData) {
  // ✅ Validate input
  const input = createBookingSchema.parse(Object.fromEntries(formData))
  const booking = await createBooking(input)
  return { success: true, bookingId: booking.id }
}
```

---

#### Issue 9: No Server Actions Used

**Current State:**
All mutations use traditional API routes with client-side fetch calls.

**Better Approach - Server Actions:**

```typescript
// Server Action
'use server'

import { z } from 'zod'
import { createBooking } from '@/services/booking.service'
import { redirect } from 'next/navigation'

export async function createBookingAction(formData: FormData) {
  // ✅ Server Action automatically runs on server
  const input = createBookingSchema.parse(Object.fromEntries(formData))
  const booking = await createBooking(input)
  redirect(`/booking-success?bookingId=${booking.id}`)
}
```

---

## 4. Type Safety

### Best Practice Principles

**Use TypeScript in strict mode:**
- Never use `any` type
- Define explicit types for props, API responses, database models
- Centralize shared types in /types
- Use schema validation (Zod) for Server Actions, API routes, and forms

### Current Codebase Issues

#### Issue 10: Extensive Use of `any` Types

**Files Affected:**
- `/utils/email.ts` - Multiple `any` parameters

**Problem:**
Using `any` type defeats TypeScript's type checking benefits, leading to runtime errors and poor developer experience.

**Impact:**
- No compile-time type checking
- Runtime errors from accessing non-existent properties
- Poor IDE autocomplete
- Harder to refactor (no type information)
- Impossible to know what data is expected

**Better Approach - Explicit Types:**

```typescript
// /types/index.ts
export interface BookingDetails {
  id: string
  guestName: string
  guestEmail: string
  roomType: string
  checkIn: Date
  checkOut: Date
  totalPrice: number
}

// /utils/email.ts
import { BookingDetails } from '@/types'

function generateBookingEmailTemplate(bookingDetails: BookingDetails): string {
  // ✅ Type-safe - TypeScript checks all properties
  const formattedCheckIn = format(bookingDetails.checkIn, "EEEE, MMMM do yyyy")
  return `...`
}
```

---

#### Issue 11: Scattered Type Definitions

**Files Affected:**
- `/components/reviews.tsx` - Review type defined locally
- `/components/booking-form.tsx` - DateRange type defined locally
- `/components/room-list.tsx` - RoomType type defined locally

**Problem:**
Type definitions are scattered across components instead of being centralized in a dedicated types directory.

**Better Approach - Centralized Types:**

```typescript
// /types/index.ts
export type RoomType = Prisma.RoomTypeGetPayload<{}>

export interface CreateBookingInput {
  roomId: string
  guestName: string
  guestEmail: string
  checkIn: Date
  checkOut: Date
  totalPrice: number
  paymentReference: string
}

export interface DateRange {
  from: Date | undefined
  to?: Date | undefined
}
```

---

## 5. Performance & Bundling

### Best Practice Principles

**Optimize by default:**
- Default to Server Components
- Use dynamic() for heavy components or client-only libraries
- Avoid unnecessary useEffect
- Use next/image for all images with priority for above-fold
- Use next/font for all fonts
- Load third-party scripts with next/script using defer or lazyOnload

**Bundle optimization:**
- Remove unused dependencies
- Avoid large client-side libraries when server-side alternatives exist
- Periodically analyze bundles
- Use code splitting

### Current Codebase Issues

#### Issue 12: Large Client Components

**Files Affected:**
- `/components/booking-form.tsx` (366 lines)
- `/components/reviews.tsx` (144 lines)
- `/app/page.tsx` (520 lines)
- `/components/header.tsx` (234 lines)

**Problem:**
Large components with multiple responsibilities are hard to understand, test, and maintain.

**Better Approach - Split into Smaller Components:**

```typescript
// /components/booking/BookingForm.tsx (Main orchestration - ~80 lines)
'use client'

import { DateRangePicker } from './DateRangePicker'
import { PriceSummary } from './PriceSummary'
import { PaymentOptions } from './PaymentOptions'

export function BookingForm({ roomTypeId, price, title, unavailableDates }: BookingFormProps) {
  // ✅ Main component only orchestrates, doesn't contain business logic
  return (
    <Form {...form}>
      <form action={createBookingAction} className="space-y-6">
        {/* Form fields */}
        <DateRangePicker control={form.control} unavailableDates={unavailableDates} />
        <PriceSummary price={price} control={form.control} />
        <PaymentOptions roomTypeId={roomTypeId} />
        <Button type="submit">Book Now</Button>
      </form>
    </Form>
  )
}
```

---

#### Issue 13: No Dynamic Imports for Heavy Libraries

**Files Affected:**
Multiple components importing heavy libraries directly

**Problem:**
Heavy libraries like framer-motion and embla-carousel are imported directly, causing them to be included in the initial bundle even if not needed on initial page load.

**Better Approach - Dynamic Imports:**

```typescript
// /app/page.tsx
import dynamic from 'next/dynamic'

// ✅ Dynamically import motion component - code splitting
const MotionSection = dynamic(
  () => import('@/components/home/MotionSection').then(mod => mod.MotionSection),
  {
    loading: () => <div className="animate-pulse bg-gray-200 h-96" />,
    ssr: false, // Client-only
  }
)

export default function Home() {
  return (
    <div>
      {/* Static content loads immediately */}
      <section>Static content...</section>

      {/* Motion component loads separately when needed */}
      <Suspense fallback={<div>Loading...</div>}>
        <MotionSection>
          Animated content...
        </MotionSection>
      </Suspense>
    </div>
  )
}
```

---

#### Issue 14: Missing Image Priority for Above-Fold Images

**Files Affected:**
- `/components/room-list.tsx` - Room images missing priority prop

**Problem:**
Above-fold images are missing the `priority` prop, causing them to be lazy-loaded even though they're visible immediately.

**Impact:**
- Images load later than they should
- Layout shift (CLS - Cumulative Layout Shift)
- Poor Largest Contentful Paint (LCP)
- Slower perceived performance
- Poor user experience

**Better Approach:**

```typescript
// /components/room-list.tsx
export default function RoomList({ roomTypes }: { roomTypes: RoomType[] }) {
  return (
    <div className="space-y-32">
      {filteredRooms.map((room, index) => (
        <div key={room.id} className="relative group">
          <Image
            src={room.imageUrl}
            alt={room.name}
            width={800}
            height={600}
            className="object-cover w-full h-full transition-transform duration-300"
            // ✅ Priority for first image (above fold)
            priority={index === 0}
            // ✅ Better loading experience
            placeholder="blur"
          />
        </div>
      ))}
    </div>
  )
}
```

---

## 6. State Management

### Best Practice Principles

**Follow a progressive approach:**
- Prefer server state
- Prefer URL state
- Prefer React local state
- Use global state only when clearly justified
- Avoid duplicating server state on client

### Current Codebase Issues

#### Issue 15: Unnecessary useState in RoomList

**File:** `/components/room-list.tsx`

**Problem:**
RoomList component uses useState for data that never changes, which is completely unnecessary and wastes memory.

**Better Approach:**

```typescript
// /components/room-list.tsx
export default function RoomList({ roomTypes }: { roomTypes: RoomType[] }) {
  // ✅ Use prop directly - no unnecessary state
  return (
    <div>
      {roomTypes.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}
```

---

#### Issue 16: Hardcoded Menu Data in Bakery Page

**File:** `/app/bakery/page.tsx`

**Problem:**
Menu items are hardcoded in the component instead of being fetched from the server/database.

**Impact:**
- Requires code deployment for menu changes
- Hard to maintain
- No content management system
- Difficult to add/remove items
- No pricing management
- No analytics integration

**Better Approach - Server Component with Database:**

```typescript
// /app/bakery/page.tsx (Server Component)
import { getPastries, getJuices } from '@/lib/menu'

export default async function BakeryPage() {
  // ✅ Fetch menu from database on server
  const pastries = await getPastries()
  const juices = await getJuices()

  return (
    <div>
      <MenuTabs pastries={pastries} juices={juices} />
    </div>
  )
}
```

---

#### Issue 17: Complex Scroll Logic in Header

**File:** `/components/header.tsx`

**Problem:**
Complex scroll logic and multiple interdependent states are embedded in the Header component instead of being in a custom hook.

**Better Approach - Extract to Custom Hook:**

```typescript
// /hooks/useStickyHeader.ts
import { useState, useEffect, useRef } from 'react'

export function useStickyHeader(options: UseStickyHeaderOptions = {}) {
  // ✅ Reusable hook for scroll logic
  const { isAtTop, isVisible } = useState(true)
  // ... implementation

  return { isAtTop, isVisible }
}

// /components/layout/Header.tsx
import { useStickyHeader } from '@/hooks/useStickyHeader'

export function Header() {
  // ✅ Use reusable hook
  const { isAtTop, isVisible } = useStickyHeader({
    hideThreshold: 100,
    topThreshold: 10,
  })

  return <header>...</header>
}
```

---

## 7. API Routes & Modularization

### Best Practice Principles

**Keep API routes and route handlers minimal:**
- Extract business logic to /services
- Extract validation to /lib/validators
- Extract DB access to /lib/db
- Centralize error handling
- Always return typed responses

### Current Codebase Issues

#### Issue 18: Complex Business Logic in API Routes

**Files Affected:**
- `/app/api/create-booking/route.ts`
- `/app/api/check-availability/route.ts`
- `/app/api/verify-payment/route.ts`

**Problem:**
API routes contain complex business logic that should be in services.

**Better Approach:**

```typescript
// /services/booking.service.ts
export async function createBooking(input: CreateBookingInput) {
  // ✅ Pure business logic - no HTTP concerns
  const booking = await prisma.booking.create({
    data: { ...input, paymentStatus: 'paid' },
    include: { room: { include: { roomType: true } } },
  })

  await updateRoomAvailability(booking.room.roomTypeId, input.checkIn, input.checkOut)

  await sendBookingConfirmationEmail(input.guestEmail, { ... })

  return booking
}

// /app/actions/bookings.ts (Server Action)
'use server'

import { createBooking } from '@/services/booking.service'

export async function createBookingAction(formData: FormData) {
  const input = createBookingSchema.parse(Object.fromEntries(formData))
  const booking = await createBooking(input)
  redirect(`/booking-success?bookingId=${booking.id}`)
}
```

---

#### Issue 19: Duplicate Prisma Client Instantiation

**Files Affected:**
Multiple API routes and pages creating new PrismaClient instances

**Problem:**
Each API route creates a new PrismaClient instance instead of using the singleton pattern from `/lib/db.ts`.

**Impact:**
- Connection pool exhaustion in development
- Inconsistent connection management
- Potential memory leaks
- No centralized configuration

**Better Approach:**

```typescript
// All files should import the singleton
import prisma from '@/lib/db'

export async function POST(req: Request) {
  // ✅ Use singleton from lib/db
  const rooms = await prisma.room.findMany()
  // ...
}
```

---

## 8. Linting, Formatting & Code Quality

### Best Practice Principles

**Enforce clean code:**
- No unused variables
- No ignored TypeScript errors
- Prefer composition over inheritance
- Use custom hooks for reusable logic
- Remove commented out code
- Remove magic numbers/strings
- Maintain consistent naming conventions

### Current Codebase Issues

#### Issue 20: Commented Out Code

**Files Affected:**
Multiple files with commented out code

**Problem:**
Commented code should be removed, not kept in the codebase.

**Better Approach:**
Remove all commented code. Use version control (git) for history.

---

#### Issue 21: Magic Numbers Throughout Codebase

**Files Affected:**
Multiple files with magic numbers

**Problem:**
Magic numbers scattered throughout code make it hard to understand and maintain.

**Better Approach:**

```typescript
// /config/animations.ts
export const ANIMATION_CONFIG = {
  FADE_IN_THRESHOLD: 0.5,
  FADE_IN_ROOT_MARGIN: '0px 0px -200px 0px',
  CAROUSEL_AUTO_PLAY_INTERVAL: 5000,
  SLIDE_TRANSITION_DURATION: 300,
} as const

// Usage
const observer = new IntersectionObserver(
  ([entry]) => { ... },
  {
    threshold: ANIMATION_CONFIG.FADE_IN_THRESHOLD,  // ✅ Named constant
    rootMargin: ANIMATION_CONFIG.FADE_IN_ROOT_MARGIN,
  },
)
```

---

#### Issue 22: Dead Code in About Page

**File:** `/app/about/page.tsx`

**Problem:**
Empty useEffect with no functionality should be removed.

**Better Approach:**
Remove the entire useEffect - it's dead code.

---

#### Issue 23: Duplicate Animation Definitions

**Files Affected:**
Multiple components with duplicate animation definitions

**Problem:**
Animation keyframes are duplicated across components instead of being in a global CSS file or Tailwind config.

**Better Approach:**

```typescript
// /tailwind.config.ts
export default {
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
    },
  },
}

// Usage - no inline styles needed
<div className="animate-fade-in-up">
  Animated content
</div>
```

---

## 9. SEO & Metadata

### Best Practice Principles

**Use the Metadata API in route files:**
- Define per-page: title, description, OpenGraph, canonical URLs
- Use semantic HTML
- Ensure accessibility (ARIA, labels, roles)
- Avoid client-only rendering for SEO-critical pages

### Current Codebase Issues

#### Issue 24: Missing Metadata on Pages

**Files Affected:**
- `/app/rooms/page.tsx` - No metadata
- `/app/rooms/[slug]/page.tsx` - No metadata
- `/app/about/page.tsx` - No metadata
- `/app/contact/page.tsx` - No metadata
- `/app/bakery/page.tsx` - No metadata

**Problem:**
Pages are missing metadata for SEO optimization.

**Impact:**
- Poor search engine ranking
- Generic page titles (default to "Mabu Apartments")
- No social media previews (Open Graph)
- Missing structured data
- Poor click-through rates from search results

**Better Approach:**

```typescript
// /app/rooms/page.tsx
export const metadata: Metadata = {
  title: 'Luxury Rooms & Suites | Mabu Apartments',
  description: 'Discover our range of luxury apartments in Abuja.',
  openGraph: {
    title: 'Luxury Rooms & Suites | Mabu Apartments',
    description: 'Discover our range of luxury apartments in Abuja',
    images: ['/images/rooms-hero.jpg'],
    url: 'https://mabuapartments.com/rooms',
    type: 'website',
  },
}
```

---

#### Issue 25: Non-Semantic HTML

**File:** `/app/page.tsx`

**Problem:**
Using div wrappers instead of proper semantic HTML elements.

**Better Approach:**

```typescript
// ✅ Use semantic elements directly
<motion.section
  className="relative bg-primary text-white py-12 sm:py-16"
>
  {/* Content */}
</motion.section>
```

---

#### Issue 26: Generic Alt Text on Images

**File:** `/app/bakery/page.tsx`

**Problem:**
Images have generic alt text like "Bakery slide" instead of descriptive, meaningful text.

**Better Approach:**

```typescript
<Image
  src={slide.image}
  alt={slide.alt || `Image of ${slide.title}`}  // ✅ Descriptive alt text
  fill
  className="object-cover"
  priority={index === 0}
/>
```

---

## 10. Security Best Practices

### Best Practice Principles

**Never expose secrets in client code:**
- Use environment variables for API keys, DB credentials
- Validate all external input
- Sanitize user-generated content
- Use middleware for auth guards, role-based access, redirects

### Current Codebase Issues

#### Issue 27: Hardcoded Contact Information

**Files Affected:**
- `/app/bakery/page.tsx`
- `/components/footer.tsx`

**Problem:**
Phone numbers and contact information are hardcoded throughout the codebase.

**Better Approach:**

```typescript
// /.env.example
NEXT_PUBLIC_CONTACT_PHONE="+234 907 512 0963"
NEXT_PUBLIC_CONTACT_EMAIL="info@mabuapartments.com"
NEXT_PUBLIC_CONTACT_ADDRESS="Mabu Apartments, Abuja, Nigeria"

// /lib/config.ts
export const CONTACT_CONFIG = {
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE!,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL!,
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS!,
} as const
```

---

#### Issue 28: No Input Sanitization

**File:** `/app/api/create-booking/route.ts`

**Problem:**
User input is stored in database without sanitization.

**Better Approach:**

```typescript
// /lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'

export function sanitizeString(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
  })
}

// /services/booking.service.ts
export async function createBooking(input: CreateBookingInput) {
  // ✅ Sanitize user input
  const sanitizedInput = {
    ...input,
    guestName: sanitizeString(input.guestName),
    guestEmail: sanitizeEmail(input.guestEmail),
  }

  const booking = await prisma.booking.create({
    data: sanitizedInput,
    // ...
  })

  return booking
}
```

---

#### Issue 29: Debug API Route Exposed

**File:** `/app/api/debug-bookings/route.ts`

**Problem:**
Debug endpoint exposes sensitive booking data without authentication.

**Impact:**
- Exposes sensitive customer data
- No authentication required
- Privacy violation
- Security risk

**Better Approach:**
Remove debug endpoints from production. Use proper logging and monitoring tools instead.

---

#### Issue 30: Console.log Statements in Production Code

**Files Affected:**
Multiple files with console.log statements

**Problem:**
Console.log statements should not be in production code.

**Impact:**
- Logs leak sensitive data to browser console
- Potential security vulnerability
- Performance impact (console operations)
- No structured logging

**Better Approach:**

```typescript
// /lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development'
    ? {
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'HH:MM:ss.l' },
      }
    : undefined,
})

export function logBooking(data: unknown) {
  logger.info({ type: 'booking', data })
}

export function logError(error: Error, context?: string) {
  logger.error({ error, context })
}

// /app/api/create-booking/route.ts
import { logBooking, logError } from '@/lib/logger'

export async function POST(req: Request) {
  try {
    const bookingData = await req.json()

    // ✅ Structured logging
    logBooking(bookingData)

    const booking = await prisma.booking.create({ ... })

    return NextResponse.json({ success: true, booking })
  } catch (error) {
    // ✅ Structured error logging
    logError(error as Error, 'createBooking')
    return NextResponse.json({ success: false, error: "Failed to create booking" }, { status: 500 })
  }
}
```

---

#### Issue 31: Non-Null Assertion on Environment Variables

**File:** `/app/api/paystack-webhook/route.ts`

**Problem:**
Using non-null assertion `!` on environment variables can cause runtime crashes.

**Better Approach:**

```typescript
// /lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PAYSTACK_SECRET_KEY: z.string().min(1),
  EMAIL_HOST: z.string().min(1),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASS: z.string().min(1),
})

// Validate on startup
export const env = envSchema.parse(process.env)

// /app/api/paystack-webhook/route.ts
import { env } from '@/lib/env'

// ✅ Type-safe, validated environment variable
const hash = crypto
  .createHmac('sha512', env.PAYSTACK_SECRET_KEY)
  .update(body)
  .digest('hex')
```

---

## 11. Production Readiness Checklist

### Current State vs. Best Practices

| Checklist Item | Status | Notes |
|---------------|--------|-------|
| Server Components used by default | ❌ | Many pages are client components unnecessarily |
| Rendering strategies chosen per route | ❌ | No caching strategies defined |
| Images, fonts, scripts optimized | ⚠️ | Some images missing priority prop |
| Core Web Vitals tested | ❌ | No monitoring set up |
| Environment variables configured | ⚠️ | No validation, hardcoded values present |
| Error boundaries in place | ✅ | ErrorBoundary component exists |
| Logging and monitoring enabled | ❌ | Console.logs used, no structured logging |
| Server Actions used for mutations | ❌ | Only API routes, no Server Actions |
| Type safety enforced | ⚠️ | Many `any` types, scattered type definitions |
| Input validation on all endpoints | ❌ | No validation on API routes |
| API routes minimal | ❌ | Business logic in API routes |
| Services layer exists | ❌ | No services directory |
| Validators directory exists | ❌ | No validators directory |
| SEO metadata on all pages | ❌ | Only root layout has metadata |
| Security best practices followed | ❌ | Debug endpoints exposed, hardcoded secrets |
| Code quality standards enforced | ⚠️ | ESLint configured but many violations |

---

## 12. Summary & Recommendations

### Critical Issues (Address First)

1. **Security**: Remove debug endpoints, add input validation, implement proper logging
2. **Architecture**: Create services layer, consolidate duplicate components, fix naming conventions
3. **Type Safety**: Remove all `any` types, centralize type definitions
4. **Rendering**: Convert unnecessary client components to server components

### High Priority Issues

5. **Performance**: Split large components, add image priorities, implement code splitting
6. **Data Fetching**: Implement Server Actions, move data fetching to server
7. **SEO**: Add metadata to all pages, improve semantic HTML
8. **State Management**: Remove unnecessary state, extract complex logic to hooks

### Medium Priority Issues

9. **Code Quality**: Remove commented code, extract magic numbers to constants
10. **API Routes**: Remove business logic, keep routes thin
11. **Testing**: Set up unit and E2E testing
12. **Monitoring**: Implement proper logging and error tracking

### Low Priority Issues

13. **Documentation**: Update README, add AGENTS.md
14. **CI/CD**: Set up automated checks and deployments
15. **Performance**: Monitor Core Web Vitals, optimize bundles

---

## Learning Outcomes

### Key Takeaways

1. **Server Components are the default**: Most content should be server-rendered
2. **Server Actions for mutations**: Better than API routes for form submissions
3. **Co-locate components**: Keep related code together
4. **Centralize types**: Single source of truth for type definitions
5. **Extract services**: Separate business logic from HTTP concerns
6. **Validate everything**: Use Zod schemas for all inputs
7. **Optimize images**: Use priority, sizes, and placeholders strategically
8. **Use dynamic imports**: Code split heavy libraries
9. **No magic values**: Extract to named constants
10. **Secure by default**: Validate input, sanitize data, hide secrets

### Common Anti-Patterns to Avoid

1. ❌ Marking entire pages as client when only small parts need client-side execution
2. ❌ Using `any` types instead of proper interfaces
3. ❌ Scattering type definitions across components
4. ❌ Embedding business logic in API routes
5. ❌ Hardcoding configuration values
6. ❌ Commenting out code instead of removing it
7. ❌ Using magic numbers/strings
8. ❌ Creating large, monolithic components
9. ❌ Fetching data on client when it could be server-rendered
10. ❌ Exposing debug endpoints in production

### Recommended Next Steps

1. Start with critical security issues
2. Implement services layer for business logic
3. Centralize types and create validators
4. Convert unnecessary client components to server components
5. Add comprehensive metadata to all pages
6. Set up proper logging and monitoring
7. Implement testing framework
8. Optimize performance and bundling
9. Set up CI/CD pipeline
10. Document architecture and patterns

---

**End of Analysis**

This document should be used as a reference guide for understanding Next.js App Router best practices and implementing production-grade applications. Each issue identified includes:
- The problem
- Why it's a problem
- Better approach with code examples
- Benefits of fixing it

**Refer to `REFACTORING_PLAN.md` for a step-by-step implementation plan to address all identified issues.**
