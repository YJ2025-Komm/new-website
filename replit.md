# GeoRankers - AI Search Visibility Intelligence Tool

## Overview

GeoRankers is a React-based web application that helps brands understand and improve their presence in AI-generated search results across platforms like ChatGPT, Gemini, Perplexity, and Claude. The application features a modern landing page with waitlist functionality and is built using a full-stack TypeScript architecture.

## User Preferences

Preferred communication style: Simple, everyday language.
Blog format preference: User prefers simple, everyday language.
GEO Guide: Restored to navigation per user request (August 28, 2025).

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
4. **Pricing Page**: Three-tier pricing (Launch $49, Grow $159, Enterprise Custom) with quarterly billing toggle, agency banner, and 6 FAQs at /pricing
4. **Multi-Page Website Analysis**: Intelligent web crawler that analyzes up to 30 pages to provide AI visibility scores and actionable recommendations
5. **Component Library**: Comprehensive UI components from shadcn/ui
6. **Form Validation**: Type-safe forms with Zod schemas
7. **Email Marketing Integration**: Automatic Mailchimp sync for new subscribers

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

### Website Analysis Flow
1. User enters website URL on `/website-analysis` page
2. Client-side validation using React Hook Form + Zod
3. API request to `/api/analyze-website` endpoint
4. Backend performs intelligent multi-page crawling:
   - Discovers up to 100 pages from website
   - Prioritizes 10 main pages (homepage, about, pricing, contact, product, features, etc.)
   - Includes up to 20 blog posts for content analysis
   - Uses 5-way concurrent scraping for optimal performance
   - 2-minute timeout for entire operation
5. Aggregated content sent to OpenAI for comprehensive analysis
6. Results returned with AI visibility score (0-100), key findings, and recommendations
7. Frontend displays results with pages analyzed count and actionable insights

### API Endpoints
- `POST /api/waitlist` - Register new waitlist entry
- `GET /api/waitlist/count` - Get total waitlist count
- `POST /api/analyze-website` - Analyze website for AI visibility (multi-page crawling + OpenAI analysis)
- `GET /sitemap.xml` - Dynamic sitemap (auto-updates with WordPress blog posts)

### Performance Metrics (Website Analysis)
- **Analysis Time**: 40-90 seconds (typical: 40s for 28 pages)
- **Pages Discovered**: Up to 100 pages
- **Pages Analyzed**: Up to 30 pages (10 priority main + 20 blog)
- **Concurrency**: 5-way parallel scraping for speed
- **Timeout**: 2-minute global timeout with graceful error handling
- **Cost per Analysis**: ~$0.016 actual (6,176 tokens @ GPT-4o-mini rates)
- **User-Facing Estimate**: ~$0.20 per analysis (conservative estimate)

### Dynamic Sitemap
- **Endpoint**: `/sitemap.xml` - Generated dynamically on each request
- **Main Pages**: Homepage, GEO Guide, Website Analysis (3 pages)
- **Blog Integration**: Fetches all posts from WordPress RSS feed (blog.georankers.co/feed/)
- **Auto-Updates**: New blog posts are automatically included when published
- **RSS Pagination**: Fetches multiple RSS pages to capture all posts (currently 13 blog posts)

### External Integrations
- **Mailchimp**: Complete subscriber sync with all form fields including challenge responses in Comments column (MMERGE7)
- **Google Sheets**: Optional integration (currently configured but not active)
- **OpenAI**: GPT-4o-mini for AI visibility analysis (website crawler integration)
- **WordPress Blog**: RSS feed integration for dynamic sitemap (blog.georankers.co)

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