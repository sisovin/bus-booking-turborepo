# Bus Booking Turborepo 
## Project Overview
This project is a bus booking system built using a monorepo structure with Turborepo. It consists of a backend built with NestJs (TypeScript) and a frontend built with NextJs (TypeScript). The backend handles authentication, bookings, buses, and seats, while the frontend provides a user interface for users to search for buses, book seats, and manage their bookings.

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
1. Clone the repository:
   ```bash
   git clone https://github.com/sisovin/bus-booking-turborepo.git
   cd bus-booking-turborepo
   ```

2. Navigate to the backend directory:
   ```bash
   cd apps/api
   ```

3. Install the dependencies:
   ```bash
   pnpm install
   ```

4. Set up the environment variables:
   Create a `.env` file in the `apps/api` directory and add the necessary environment variables. Refer to the `.env.example` file for the required variables.

5. Run the application:
   ```bash
   pnpm run start:dev
   ```

### Frontend with NextJs (TypeScript)
1. Navigate to the frontend directory:
   ```bash
   cd apps/web
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the `apps/web` directory and add the necessary environment variables. Refer to the `.env.example` file for the required variables.

4. Run the application:
   ```bash
   pnpm run dev
   ```

### Setting up Redis
1. Ensure you have Docker installed on your machine.

2. Navigate to the root directory of the project:
   ```bash
   cd bus-booking-turborepo
   ```

3. Start the Redis service using Docker Compose:
   ```bash
   docker-compose up -d redis
   ```

4. Verify that the Redis service is running:
   ```bash
   docker-compose ps
   ```
