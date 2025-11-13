# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript website for **Khat Alriyadah Contracting Company**, a construction and engineering company based in Saudi Arabia. The site showcases the company's services, projects, and capabilities with modern animations and interactive features.

## Development Commands

### Core Development
- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

### Development Workflow
1. Always run `npm run typecheck` and `npm run lint` before committing
2. Use `npm run dev` for local development with hot reload
3. Test production builds with `npm run preview`

## Tech Stack & Architecture

### Core Technologies
- **React 18.3** with TypeScript
- **Vite 5.4** as build tool and dev server
- **Tailwind CSS 3.4** for styling
- **Lucide React** for icons
- **Supabase** integration (currently unused but available)

### Project Structure
```
src/
├── App.tsx                    # Main app component with route structure
├── main.tsx                   # React entry point
├── index.css                  # Global styles and Tailwind imports
├── vite-env.d.ts             # Vite TypeScript declarations
└── components/               # All React components (single level)
    ├── Navigation.tsx        # Fixed header with logo and smooth scroll
    ├── Hero.tsx             # Landing section with floating logo animation
    ├── About.tsx            # Company information
    ├── AnimatedStats.tsx    # Intersection Observer animated counters
    ├── Objectives.tsx       # Company objectives
    ├── Commitments.tsx      # Company commitments
    ├── CoreValues.tsx       # Core values display
    ├── InteractiveShowcase.tsx # 3D mouse-tracking showcase
    ├── Solutions.tsx        # Services/solutions
    ├── VideoGallery.tsx     # YouTube video modals
    ├── CivilWorks.tsx       # Civil works expertise
    ├── Services.tsx         # Service categories grid
    ├── Projects.tsx         # Project portfolio
    ├── Partners.tsx         # Partner logos
    └── Contact.tsx          # Contact form with company info
```

### Architecture Patterns

#### Component Organization
- **Single-level components**: All components are in `/src/components/` (no nested folders)
- **Page sections**: Each component represents a full-width page section
- **Sequential rendering**: App.tsx renders components in order from top to bottom

#### State Management
- **Local state only**: Uses React useState for component-specific state
- **No global state**: No Redux, Zustand, or Context providers
- **Intersection Observer**: Used in AnimatedStats for viewport-triggered animations

#### Styling Approach
- **Tailwind utility-first**: All styling done with Tailwind classes
- **Responsive design**: Mobile-first with md/lg breakpoints
- **Custom animations**: CSS keyframes defined inline in components
- **Gradient themes**: Blue (#0066CC) to Cyan (#00BFFF) brand colors

## Key Features & Implementation

### Animation System
1. **Float Animation** (Hero.tsx:81-92): CSS keyframes for logo floating effect
2. **Intersection Observer** (AnimatedStats.tsx): Viewport-triggered counter animations
3. **3D Perspective** (InteractiveShowcase.tsx): Mouse-tracking transform effects
4. **Blob Animations**: Organic background movement with staggered delays

### Video Integration
- **Modal system** in VideoGallery.tsx with YouTube iframe embeds
- **Placeholder YouTube IDs**: Replace `dQw4w9WgXcQ` with actual project videos
- **Click-to-play**: Videos only load when user opens modal

### Logo Integration
- **Company logo**: `public/WhatsApp Image 2025-10-24 at 3.06.52 AM.jpeg`
- **Usage locations**: Navigation.tsx:52, Hero.tsx:15, Contact.tsx:65
- **Floating animation**: Applied in Hero section

## Important File Locations

### Logo and Assets
- Company logo: `public/WhatsApp Image 2025-10-24 at 3.06.52 AM.jpeg`
- No other static assets required (uses Tailwind gradients)

### Configuration Files
- **TypeScript**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- **ESLint**: `eslint.config.js` (flat config format)
- **Tailwind**: `tailwind.config.js` (minimal config)
- **Vite**: `vite.config.ts` (excludes lucide-react from optimization)
- **PostCSS**: `postcss.config.js` (Tailwind + Autoprefixer)

## Common Development Tasks

### Adding New Components
1. Create new `.tsx` file in `src/components/`
2. Import and add to App.tsx component list
3. Follow existing pattern: section with `id` attribute for navigation
4. Use Tailwind classes following existing design patterns

### Updating Company Information
- **Contact details**: Contact.tsx (phone, email, address)
- **Stats/metrics**: AnimatedStats.tsx stats array
- **Company description**: About.tsx, Hero.tsx

### Video Management
- **YouTube IDs**: VideoGallery.tsx videos array
- **Video metadata**: Title, description, thumbnail gradient in same array
- **Modal behavior**: Handled by selectedVideo state

### Styling Guidelines
- **Colors**: Use `from-blue-600 to-cyan-600` for brand gradients
- **Spacing**: Follow 8px grid system (`p-4`, `p-6`, `py-20`)
- **Typography**: Use semantic heading hierarchy (h1: 5xl, h2: 4xl, h3: 2xl)
- **Animations**: 300ms duration standard, smooth easing

## Build & Deployment

### Production Build
- **Output**: Optimized static files in `dist/`
- **Size**: ~205KB JS gzipped, ~28KB CSS
- **Deployment**: Static hosting compatible (Vercel, Netlify, S3)

### Environment
- **Node.js**: Modern version required for Vite
- **Browser support**: Modern browsers with CSS Grid, Flexbox, Intersection Observer
- **No backend**: Pure frontend application, no server requirements

## Important Notes

### Video Configuration
The VideoGallery component uses placeholder YouTube IDs (`dQw4w9WgXcQ`). Update these with actual project videos before deployment.

### Logo Path
The logo path is hardcoded in three components. If moving or renaming the logo file, update all three locations.

### No Testing Framework
This project has no test setup. Consider adding Vitest if test coverage is needed.

### Supabase Integration
Supabase client is installed but not actively used. Remove dependency if not needed for future features.