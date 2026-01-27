# Production-Grade Next.js Refactoring Plan

## Executive Summary

This plan transforms the Mabu Apartments project into a production-grade Next.js 15.1.3 application following App Router best practices. The refactoring addresses architecture, rendering strategy, component organization, code quality, security, and performance optimization.

---

## Phase 1: Foundation & Structure (Week 1, Days 1-3)

### 1.1 Component Cleanup

#### Remove Unused Components

- Delete `amenities.tsx` (1.1 KB) - No imports or usage found
- Delete `rating-display.tsx` (4.1 KB) - No imports or usage found
- Delete `gallery-carousel.tsx` (2.2 KB) - No imports or usage found
- Delete `carousel.tsx` (2.1 KB) - Root-level carousel unused (UI carousel is separate)
- **Impact**: Remove 284 lines, reduce bundle by 9.5 KB

#### Fix Naming Convention Violations

- Rename `hero.tsx` → `Hero.tsx`
- Rename `contact-hero.tsx` → `ContactHero.tsx` (will be consolidated later)
- Rename `apartment-hero.tsx` → `ApartmentHero.tsx` (will be consolidated later)
- Rename `room-list.tsx` → `RoomList.tsx`
- Rename `carousel.tsx` (root) → delete (already covered above)

### 1.2 Directory Structure Reorganization

#### Create Feature-Based Architecture

```
app/
  (routes)/
    about/
      components/          # Co-located about components
      page.tsx
    bakery/
      page.tsx
    booking-success/
      page.tsx
    contact/
      components/          # Co-located contact components
      page.tsx
    payment-success/
      page.tsx
    rooms/
      page.tsx
      [slug]/
        components/       # Co-located room detail components
        page.tsx
    layout.tsx
    page.tsx
  api/
    middleware.ts         # Replace Express-style middleware

components/
  ui/                    # Keep all 14 shadcn/ui components unchanged
  booking/               # New: Booking-specific components
  layout/                # New: Layout components (header, footer, nav)
  reviews/               # New: Review components
  rooms/                 # New: Room components
  shared/                # New: Shared/reusable components
  shared/hero/           # Consolidated hero system

lib/
  api/                   # API utilities
  auth/                  # Authentication utilities
  db/                    # Database access (consolidate prisma clients)
  validators/            # Zod schemas
  utils/                 # General utilities

services/               # New: Business logic layer
types/                  # Centralized TypeScript types
hooks/                  # Custom React hooks
utils/                  # General utilities
```

### 1.3 Centralize Types

#### Create `/types/index.ts`

- Domain models: RoomType, Room, Booking, Review, Availability
- API request/response types
- Form input/output types
- Filter and search types
- Configuration types
- Remove scattered type definitions

### 1.4 Consolidate Prisma Client

#### Remove Duplicate Database Initialization

- Keep `lib/db.ts` as single source
- Delete `lib/prisma.ts` (duplicate)
- Ensure proper singleton pattern
- Update all imports throughout codebase

---

## Phase 2: Component Refactoring & Consolidation (Week 1, Days 4-5)

### 2.1 Hero Component Consolidation

#### Create Unified Hero System

**Location**: `components/shared/hero/`

**Create**:

- `Hero.tsx` - Main hero component with variant system
- `types.ts` - Hero variant type definitions

**Hero Variant System**:

- Define variants: `default`, `about`, `contact`, `apartment`
- Configurable props: title, subtitle, image, variant, height, layout
- Style variations per variant using Tailwind
- Animation support per variant

**Remove after consolidation**:

- `hero.tsx`
- `HeroSection.tsx`
- `contact-hero.tsx`
- `apartment-hero.tsx`

**Update consumers**:

- `app/rooms/page.tsx` - Use Hero with `default` variant
- `app/about/page.tsx` - Use Hero with `about` variant
- `app/contact/page.tsx` - Use Hero with `contact` variant
- `app/rooms/[slug]/page.tsx` - Use Hero with `apartment` variant

### 2.2 Component Co-Location

#### Move Page-Specific Components

**Move to `app/about/components/`**:

- `HeroSection.tsx` → Update to use unified Hero
- `GetToKnowUs.tsx`
- `LocationSection.tsx`
- `FAQ.tsx`
- `MainFacilities.tsx`

**Move to `app/contact/components/`**:

- `ContactHero.tsx` → Update to use unified Hero
- `ContactInfo.tsx`

**Move to `app/rooms/[slug]/components/`**:

- `ApartmentHero.tsx` → Update to use unified Hero
- `RoomDescription.tsx`

**Update imports** in all affected files

### 2.3 Complex Component Refactoring

#### Header Component Split (`components/layout/`)

Current: 234 lines → Target: ~120 lines total

**Create**:

- `Header.tsx` (main container, ~60 lines)
- `DesktopNavigation.tsx` (~70 lines)
- `MobileNavigation.tsx` (~90 lines)
- `hooks/useScrollHeader.ts` (extract scroll logic, ~40 lines)

#### Booking Form Split (`components/booking/`)

Current: 366 lines → Target: ~150 lines total

**Create**:

- `BookingForm.tsx` (main form orchestration, ~80 lines)
- `DateRangePicker.tsx` (~100 lines)
- `PriceSummary.tsx` (~40 lines)
- `hooks/useAvailability.ts` (fetch unavailable dates, check availability)
- `hooks/useBookingPrice.ts` (calculate total price)
- `validators/booking.schema.ts` (extract Zod schema)

#### Reviews Component Split (`components/reviews/`)

Current: 144 lines → Target: ~80 lines total

**Create**:

- `Reviews.tsx` (main container, ~50 lines)
- `ReviewCard.tsx` (~40 lines)
- `ReviewsList.tsx` (~40 lines)
- `hooks/useInfiniteReviews.ts` (fetch reviews with pagination)

### 2.4 Carousel Consolidation

#### Create Unified Carousel System (`components/shared/carousel/`)

**Create**:

- `Carousel.tsx` - Main carousel with configurable features
- `types.ts` - Carousel configuration types

**Features**:

- Configurable: auto-advance, show dots, show arrows, fullscreen
- Accept props: images array, configuration object
- Support different carousel behaviors

**Remove**:

- `room-carousel.tsx` (consolidate into unified version)

**Update consumers**:

- `app/rooms/[slug]/page.tsx` - Use unified Carousel

---

## Phase 3: Rendering Strategy Optimization (Week 2, Days 1-2)

### 3.1 Convert Pages to Server Components

#### Convert from Client to Server Components

**Target pages**:

- `app/page.tsx` - Extract interactive parts to separate client components
- `app/about/page.tsx` - Extract scroll animations to separate component
- `app/rooms/page.tsx` - Remove unnecessary "use client"

**Extract client-side functionality**:

- Home page: Extract video player, carousel to `components/home/VideoHero.tsx`
- About page: Extract Framer Motion animations to separate client components
- Any browser API usage: Move to dedicated client components

### 3.2 Fix Client/Server Misalignments

#### Components Incorrectly Marked as Client (remove "use client"):

- `hero.tsx` → Remove "use client" (no browser APIs)
- `apartment-hero.tsx` → Remove "use client" (no browser APIs)
- `room-list.tsx` → Remove "use client" (no interactivity needed)
- `rating-display.tsx` → Remove "use client" (already being deleted)

### 3.3 Implement Caching Strategies

#### Static Generation (SSG)

- Marketing pages: Home, About, Contact
- Add `generateStaticParams` where appropriate
- Build static pages at build time

#### Incremental Static Regeneration (ISR)

- Content pages: Rooms listing, Room details
- Add `export const revalidate = 3600` (1 hour)
- Revalidate when data changes

#### Server-Side Rendering (SSR)

- User-specific pages: Booking success, Payment success
- Fresh data required per request

---

## Phase 4: Server Actions Implementation (Week 2, Days 3-4)

### 4.1 Create Server Actions for Mutations

#### Replace API Routes with Server Actions

**Create `/app/actions/` directory**:

- `bookings.ts` - create booking, extend booking
- `reviews.ts` - submit review, fetch reviews
- `availability.ts` - check availability, get unavailable dates
- `payments.ts` - initialize payment, verify payment

**Server Action Implementation Requirements**:

- Use "use server" directive
- Validate all inputs with Zod schemas from `/lib/validators`
- Return typed responses
- Handle errors explicitly
- Sanitize all data
- Extract business logic to `/services`

### 4.2 Keep Necessary API Routes

#### Retain API Routes For:

- Webhooks: `/app/api/paystack-webhook/route.ts` (webhooks must be API routes)
- External integrations: `/app/api/verify-payment/route.ts`
- Public endpoints that don't require mutations

#### Remove or Migrate:

- `/app/api/create-booking/route.ts` → Migrate to Server Action
- `/app/api/check-availability/route.ts` → Migrate to Server Action
- `/app/api/unavailable-dates/route.ts` → Migrate to Server Action
- `/app/api/reviews/route.ts` → Migrate to Server Action

### 4.3 Fix Middleware

#### Replace Express-Style Middleware with Next.js Middleware

**Update `middleware.ts`** (root level, not in api/):

- Remove `express-rate-limit` (incompatible with Next.js)
- Implement Next.js-compatible rate limiting using Upstash Redis or similar
- Match pattern: `/api/:path*`
- Return NextResponse.next()

### 4.4 Migrate Client-Side API Calls

#### Update Components to Use Server Actions:

**BookingForm**:

- Replace fetch calls to `/api/check-availability` with Server Action
- Replace fetch call to `/api/create-booking` with Server Action
- Use React Hook Form with Server Actions

**LeaveReviewForm**:

- Replace fetch call to `/api/reviews` with Server Action
- Use formAction or manual invocation

**Date fetching**:

- Move unavailable dates fetching to server-side
- Pass data as props from server component

---

## Phase 5: Validation & Type Safety (Week 2, Days 5-6)

### 5.1 Create Validators Directory

#### Create `/lib/validators/` with Zod Schemas

- `booking.schema.ts` - Create booking input, check availability input
- `review.schema.ts` - Submit review input
- `contact.schema.ts` - Contact form input
- `payment.schema.ts` - Payment initialization input
- `auth.schema.ts` - Authentication inputs (if applicable)

**Validation requirements**:

- All Server Actions must validate inputs
- All API routes must validate inputs
- All forms must use these schemas
- Centralized error messages

### 5.2 Create Services Layer

#### Create `/services/` Directory

**Business logic modules**:

- `booking.service.ts` - Availability checking, booking creation, availability updates
- `room.service.ts` - Room fetching, filtering
- `review.service.ts` - Review CRUD operations
- `availability.service.ts` - Date availability logic
- `payment.service.ts` - Payment processing, Paystack integration
- `notification.service.ts` - Email sending, notifications

**Service principles**:

- No framework-specific code (pure business logic)
- Importable by Server Actions and API routes
- Handle all database operations
- Centralize error handling
- Return typed results

### 5.3 Remove `any` Types

#### Audit and Fix:

- Search for `any` usage in codebase
- Replace with proper types from `/types`
- Create new types where needed
- Ensure strict TypeScript compliance

---

## Phase 6: SEO & Metadata (Week 3, Day 1)

### 6.1 Add Metadata to All Pages

#### Implement Metadata API for Each Route

**Pages to update**:

- Root layout: Already has metadata ✓
- Home page: Add comprehensive metadata
- About page: Add metadata about company
- Contact page: Add contact information
- Rooms listing: Add dynamic metadata
- Room detail: Add per-room metadata using generateMetadata
- Booking/Payment success: Add minimal metadata

**Metadata requirements**:

- `title` - Page title
- `description` - SEO description
- `openGraph.title` - Social media title
- `openGraph.description` - Social media description
- `openGraph.images` - Social images
- `canonical` - Canonical URL
- `robots` - Robots directives

### 6.2 Improve Semantic HTML

#### Review and Improve:

- Heading hierarchy (h1, h2, h3)
- ARIA labels on interactive elements
- Alt text on all images
- Semantic HTML elements (nav, main, section, article)
- Structured data for rooms/properties (JSON-LD)

---

## Phase 7: Performance Optimization (Week 3, Days 2-3)

### 7.1 Image Optimization

#### Review and Improve `next/image` Usage

**Actions**:

- Add `priority` prop to above-the-fold images
- Add `sizes` prop for responsive images
- Use `placeholder="blur"` or `placeholder="empty"` as appropriate
- Review image formats and compression
- Check remote image configuration in `next.config.ts`

### 7.2 Dynamic Imports

#### Use dynamic() for Heavy Components:

- `RoomCarousel` - Large image arrays
- Heavy third-party libraries
- Components only needed on specific routes
- Modal components

### 7.3 Code Splitting Review

#### Bundle Optimization:

- Run `npm run build` and analyze bundle size
- Remove unused dependencies (SWR if not used)
- Split large routes
- Review tree-shaking effectiveness

### 7.4 Font Optimization

#### Review `next/font` Usage:

- Already using `Inter` font ✓
- Consider adding `next/font` for custom fonts
- Remove external font loading if possible

---

## Phase 8: Security Improvements (Week 3, Day 4)

### 8.1 Environment Variables

#### Secure Configuration:

- Ensure all secrets in environment variables
- Add `.env.example` with required variables
- Validate env variables at build time
- Never expose secrets in client code
- Use `NEXT_PUBLIC_` prefix only for public variables

### 8.2 Input Validation

#### Security Measures:

- All Server Actions validate inputs (Phase 5)
- All API routes validate inputs (Phase 5)
- Sanitize user-generated content
- Implement rate limiting (middleware)
- Add CSRF protection where applicable

### 8.3 Error Handling

#### Centralize Error Handling:

- Create error types in `/types`
- Implement consistent error responses
- Log errors appropriately (not in production responses)
- User-friendly error messages
- Server-side error boundary improvements

---

## Phase 9: Testing Setup (Week 3, Days 5-6)

### 9.1 Unit Testing

#### Set Up Jest or Vitest:

- Test services (`/services`)
- Test validators (`/lib/validators`)
- Test utilities (`/lib/utils`, `/utils`)
- Test custom hooks (`/hooks`)

### 9.2 E2E Testing

#### Set Up Playwright:

- Critical path tests:
  - Browse rooms
  - View room details
  - Check availability
  - Submit booking
  - Payment flow
  - Submit review

### 9.3 Add Test Scripts

#### Update package.json:

- Add `test` script
- Add `test:watch` script
- Add `test:e2e` script
- Add `test:coverage` script

---

## Phase 10: Production Readiness (Week 4)

### 10.1 Build Process Verification

#### Ensure Build Succeeds:

- Run `npm run build` - must pass
- Run `npm run lint` - must pass
- Run type check - must pass
- Run tests - must pass

### 10.2 CI/CD Configuration

#### Set Up Automated Checks:

- Type check on every PR
- Lint check on every PR
- Unit tests on every PR
- E2E tests on main branch
- Deploy on successful build

### 10.3 Monitoring & Logging

#### Add Production Tools:

- Error tracking (Sentry or similar)
- Performance monitoring
- Structured logging
- Core Web Vitals tracking

### 10.4 Documentation

#### Update Project Documentation:

- Update README with new structure
- Document component architecture
- Document services layer
- Document API endpoints/Server Actions
- Add AGENTS.md with project-specific guidelines

---

## Implementation Priority Matrix

### Priority 1 (Critical - Week 1)

1. Component cleanup (remove unused, fix naming)
2. Directory structure reorganization
3. Consolidate Hero components
4. Consolidate Prisma client
5. Co-locate page-specific components

### Priority 2 (High - Week 2)

6. Component refactoring (split complex components)
7. Convert pages to Server Components
8. Fix client/server misalignments
9. Implement Server Actions
10. Fix middleware
11. Create validators and services

### Priority 3 (Medium - Week 3)

12. Implement caching strategies
13. Add metadata to all pages
14. Performance optimizations
15. Security improvements

### Priority 4 (Lower - Week 4)

16. Testing setup
17. CI/CD configuration
18. Monitoring setup
19. Documentation updates

---

## Impact Summary

| Metric                      | Before    | After             | Change  |
| --------------------------- | --------- | ----------------- | ------- |
| **Components**              | 36        | ~32               | -11%    |
| **Duplicate Components**    | 7         | 0                 | -100%   |
| **Naming Violations**       | 5         | 0                 | -100%   |
| **Unused Components**       | 4         | 0                 | -100%   |
| **Client Components**       | ~20       | ~12               | -40%    |
| **Server Actions**          | 0         | ~5                | +∞      |
| **API Routes**              | 12        | ~4                | -67%    |
| **Avg Component Size**      | ~95 lines | ~70 lines         | -26%    |
| **Largest Component**       | 366 lines | ~120 lines        | -67%    |
| **Bundle Size (estimated)** | -         | -9.5 KB reduction | -9.5 KB |

---

## Success Criteria

✅ All components follow PascalCase naming
✅ All duplicate components consolidated
✅ All unused components removed
✅ Page-specific components co-located
✅ Server Components used by default
✅ Server Actions used for mutations
✅ All inputs validated with Zod
✅ All pages have proper metadata
✅ TypeScript strict mode with no `any`
✅ Build passes without errors
✅ Tests passing
✅ Security best practices in place

---

## Risk Mitigation

### Breaking Changes

**Component moves**: Plan to update all imports in single commit
**API route migration**: Maintain backwards compatibility during transition
**Server Actions**: Keep API routes until fully verified

### Rollback Strategy

**Git workflow**: Feature branches for each phase
**Incremental deployment**: Deploy in phases, monitor after each
**Testing**: E2E tests before and after each phase

---

## Notes

- This plan follows Next.js 15.1.3 App Router best practices
- All changes maintain backward compatibility where possible
- Each phase is independently deployable
- Testing should be performed after each phase completion
- Monitor performance and error rates after deployment
