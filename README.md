# Bus Booking Turborepo 
## Project Overview

## Full Project Structure 
```
1. NestJs backend (apps/API)
bus-booking-turborepo/
api/
├── src/
│   ├── auth/                         # Auth Module
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts       # Passport JWT
│   │   │   └── refresh.strategy.ts
│   │   └── guards/
│   │       └── jwt-auth.guard.ts
│   ├── bookings/                     # Booking Module
│   │   ├── booking.controller.ts
│   │   ├── booking.service.ts
│   │   └── dto/
│   │       ├── create-booking.dto.ts
│   │       └── booking-response.dto.ts
│   ├── buses/                        # Bus Module
│   │   ├── bus.controller.ts
│   │   ├── bus.service.ts
│   │   └── interfaces/
│   │       └── bus.interface.ts
│   ├── seats/                        # Seat Module
│   │   ├── seat.controller.ts
│   │   ├── seat.service.ts
│   │   └── utils/
│   │       └── seat-lock.util.ts     # Redis seat locking
│   ├── shared/
│   │   ├── middleware/               # Global middleware
│   │   │   └── soft-delete.middleware.ts
│   │   └── interceptors/
│   │       └── transform.interceptor.ts
│   ├── app.module.ts                 # Root Module
│   └── main.ts                       # Entry Point
├── test/                             # E2E/Unit Tests
│   ├── auth.e2e-spec.ts
│   └── bookings.e2e-spec.ts
├── .env                              # Environment variables
└── package.json
2. frontend with TypeScript NextJs (apps/web)
bus-booking-turborepo/
web/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (public)/                 # Public routes
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (protected)/              # Auth-protected routes
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── bookings/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── search/
│   │   │       ├── page.tsx          # Search Page
│   │   │       ├── buses/
│   │   │       │   └── page.tsx      # Bus Selection
│   │   │       └── seats/
│   │   │           └── page.tsx      # Seat Selection
│   │   ├── api/                      # Next.js API Routes
│   │   │   ├── auth/
│   │   │   │   ├── route.ts          # JWT Login/Refresh
│   │   │   │   └── logout/route.ts
│   │   │   ├── bookings/
│   │   │   │   └── route.ts          # Ticket Booking API
│   │   │   └── buses/
│   │   │       └── route.ts          # Bus Search API
│   │   └── layout.tsx
│   ├── components/                   # Shared Components
│   │   ├── bus/
│   │   │   ├── BusCard.tsx
│   │   │   └── SeatPicker.tsx
│   │   ├── search/
│   │   │   └── SearchForm.tsx
│   │   └── ui/
│   │       ├── button.tsx            # ShadCN-like components
│   │       └── dialog.tsx
│   ├── lib/
│   │   ├── constants.ts              # Routes/pricing config
│   │   └── utils.ts                  # Formatters/helpers
│   └── styles/
│       └── globals.css               # Tailwind imports
├── next.config.js
└── package.json
```
## How to install 
### Backend with NestJs (TypeScript)

### Frontend with NextJs (TypeScript)
