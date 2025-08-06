# GeoRankers - AI Search Visibility Intelligence Tool

## Overview

GeoRankers is a React-based web application that helps brands understand and improve their presence in AI-generated search results across platforms like ChatGPT, Gemini, Perplexity, and Claude. The application features a modern landing page with waitlist functionality and is built using a full-stack TypeScript architecture.

## User Preferences

Preferred communication style: Simple, everyday language.
Blog format preference: Current GEO guide format maintained as-is per user request (August 6, 2025).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Style**: RESTful endpoints
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (Neon serverless)
- **Schema Validation**: Zod schemas shared between client and server

### Development Setup
- **Monorepo Structure**: Shared code between client, server, and shared directories
- **Hot Reload**: Vite dev server with HMR
- **Development Tools**: tsx for TypeScript execution, Replit-specific plugins

## Key Components

### Directory Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend API
├── shared/          # Shared TypeScript types and schemas
└── attached_assets/ # Product documentation and assets
```

### Core Features
1. **Landing Page**: Modern, responsive design showcasing GeoRankers features
2. **Waitlist System**: Email collection with duplicate prevention and Mailchimp integration
3. **Interactive FAQ Section**: Expandable questions with smooth animations and SEO optimization
4. **Component Library**: Comprehensive UI components from shadcn/ui
5. **Form Validation**: Type-safe forms with Zod schemas
6. **Email Marketing Integration**: Automatic Mailchimp sync for new subscribers

### Planned Features
- **Built-in Blog System**: Content management for AI search optimization articles (pending content creation)

### Database Schema
- **Users Table**: Basic user authentication structure (username, password)
- **Waitlist Entries Table**: Stores user signups (full name, email, timestamp)
- **Validation**: Shared Zod schemas ensure type safety across the stack

## Data Flow

### Waitlist Registration Flow
1. User fills out waitlist form on landing page (Full Name, Email, Company Name, AI Search Challenge)
2. Client-side validation using React Hook Form + Zod
3. API request to `/api/waitlist` endpoint
4. Server validates data and saves directly to Mailchimp audience with all merge fields:
   - FNAME: First name
   - LNAME: Last name 
   - FULLNAME: Complete full name
   - COMPANY: Company name
   - MMERGE7: Challenge response (Comments column)
5. Mailchimp handles duplicate detection and email validation
6. Success/error feedback to user via toast notifications

### API Endpoints
- `POST /api/waitlist` - Register new waitlist entry
- `GET /api/waitlist/count` - Get total waitlist count

### External Integrations
- **Mailchimp**: Complete subscriber sync with all form fields including challenge responses in Comments column (MMERGE7)
- **Google Sheets**: Optional integration (currently configured but not active)

## External Dependencies

### Core Libraries
- **UI Framework**: React, Radix UI, Tailwind CSS
- **Backend**: Express.js, Drizzle ORM
- **Database**: Neon PostgreSQL serverless
- **Validation**: Zod for schema validation
- **State Management**: TanStack Query
- **Icons**: Lucide React icons

### Development Tools
- **Build**: Vite, esbuild for production builds
- **TypeScript**: Full type safety across the stack
- **Replit Integration**: Custom plugins for development environment

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations handle schema updates

### Environment Configuration
- `NODE_ENV`: Development/production mode switching
- `DATABASE_URL`: PostgreSQL connection string (required)
- Vite handles development server with proxy to Express API

### Production Deployment
- Single Node.js process serves both API and static files
- Express serves built React app for non-API routes
- Database migrations run via `npm run db:push`

### Development Workflow
- `npm run dev`: Starts development server with hot reload
- `npm run build`: Creates production build
- `npm run start`: Runs production server
- `npm run check`: TypeScript type checking

## Key Architectural Decisions

### Monorepo with Shared Types
**Problem**: Ensuring type safety between frontend and backend
**Solution**: Shared directory with Zod schemas that generate both runtime validation and TypeScript types
**Benefits**: Single source of truth, compile-time safety, runtime validation

### Drizzle ORM Choice
**Problem**: Need for type-safe database operations with PostgreSQL
**Solution**: Drizzle ORM with schema-first approach
**Benefits**: Excellent TypeScript integration, lightweight, migration support

### shadcn/ui Component System
**Problem**: Need for consistent, accessible UI components
**Solution**: shadcn/ui built on Radix UI primitives
**Benefits**: Copy-paste components, full customization, accessibility built-in

### TanStack Query for State Management
**Problem**: Managing server state and API interactions
**Solution**: TanStack Query with custom fetch wrapper
**Benefits**: Caching, background updates, error handling, loading states