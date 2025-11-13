# Supabase CMS Setup Guide

This guide explains how to set up and use the Supabase-powered CMS for managing the Al-Khayat website content.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Frontend Integration](#frontend-integration)
4. [Admin Dashboard Setup](#admin-dashboard-setup)
5. [Usage Guide](#usage-guide)
6. [API Reference](#api-reference)

---

## Prerequisites

- Supabase account and project (already created)
- Node.js 18+ installed
- Access to Supabase project dashboard

---

## Database Setup

### Step 1: Run Database Migration

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to your project: `gympyawjllxbxswyuxzq`
3. Go to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the contents of `/supabase/migrations/001_initial_schema.sql`
6. Paste into the query editor
7. Click **Run** to execute the migration
8. Wait for success confirmation

This creates 23 tables with Row Level Security (RLS) policies.

### Step 2: Seed Initial Data

1. In Supabase SQL Editor, create another **New Query**
2. Copy the contents of `/supabase/seed.sql`
3. Paste and **Run**
4. This populates your database with the current website content

### Step 3: Verify Data

Run this query to check if data was inserted:

```sql
SELECT COUNT(*) as table_name, 'site_settings' as count FROM site_settings
UNION ALL
SELECT COUNT(*), 'projects' FROM projects
UNION ALL
SELECT COUNT(*), 'faqs' FROM faqs
UNION ALL
SELECT COUNT(*), 'partners' FROM partners;
```

---

## Frontend Integration

### Step 1: Environment Variables

The environment files are already created:

- `.env.local` - Contains your actual Supabase credentials (already populated)
- `.env.local.example` - Template for other developers

**⚠️ Security Note:** `.env.local` is git-ignored and should NEVER be committed to version control.

### Step 2: Install Dependencies

Supabase client is already installed. If you need to reinstall:

```bash
npm install @supabase/supabase-js
```

### Step 3: TypeScript Types

Database types are already generated in `/src/types/database.types.ts`. These provide full type safety for database operations.

### Step 4: Supabase Client

The configured client is available at `/src/lib/supabase.ts`:

```typescript
import { supabase, db } from '../lib/supabase'

// Example: Fetch hero section
const { data, error } = await db.heroSection()
```

---

## Frontend Data Hooks

Ready-to-use React hooks are available in `/src/api/`:

### Available Hooks

```typescript
import {
  useHeroSection,      // Hero video & title
  useAboutSection,     // About content
  useStats,            // Stats (animated_stats or civil_works)
  useObjectives,       // Company objectives
  useCommitments,      // Company commitments
  useCoreValues,       // Core values
  useFeatures,         // Interactive showcase features
  useServices,         // Services with items
  useProjects,         // Project portfolio
  useVideos,           // Video gallery
  useFAQs,             // FAQs
  usePartners,         // Partners
  useCivilWorks,       // Civil works section
  useContactInfo,      // Contact information
  useContactForm,      // Form submission handler
} from '../api'
```

### Example Usage

```typescript
// In a component
import { useHeroSection } from '../api'

function HeroVideo() {
  const { data, loading, error } = useHeroSection()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <iframe
      src={`https://www.youtube.com/embed/${data.youtube_video_id}`}
      title={data.main_title}
    />
  )
}
```

### Contact Form Submission

```typescript
import { useContactForm } from '../api'

function ContactForm() {
  const { submit, loading, success, error, reset } = useContactForm()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await submit({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+966...',
      message: 'Hello!'
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {success && <p>Message sent successfully!</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  )
}
```

---

## Admin Dashboard Setup

The admin dashboard is a **separate application** built with Refine.dev for managing content.

### Option 1: Create New Refine Admin (Recommended)

1. **Create new admin folder:**

```bash
npx create-refine-app@latest admin
```

2. **Select options:**
   - Package manager: `npm`
   - Project template: `Refine(Next.js)`
   - UI Framework: `Ant Design`
   - Backend: `Supabase`
   - Authentication: `Supabase`

3. **Configure Supabase:**

When prompted, enter:
- Supabase URL: `https://gympyawjllxbxswyuxzq.supabase.co`
- Supabase Key: Use `anon public key` from `.env.local`

4. **Generate Resources:**

```bash
cd admin
npm run refine create-resource
```

Select tables to manage:
- `projects`
- `videos`
- `faqs`
- `partners`
- `services`
- `contact_info`
- `form_submissions` (view only)

5. **Start Admin Dashboard:**

```bash
cd admin
npm run dev
```

Admin will run on: `http://localhost:3000`

### Option 2: Manual Admin Setup

If you prefer manual setup, create these files in a new `admin/` folder:

#### admin/package.json

```json
{
  "name": "alkhayat-admin",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@refinedev/core": "^4.47.0",
    "@refinedev/simple-rest": "^4.5.0",
    "@refinedev/react-router-v6": "^4.5.0",
    "@refinedev/supabase": "^5.6.0",
    "@supabase/supabase-js": "^2.57.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.0"
  }
}
```

Then `npm install` in the admin folder.

---

## Usage Guide

### Managing Content via Supabase Dashboard

Until the Refine admin is set up, you can manage content directly in Supabase:

1. Go to **Table Editor** in Supabase Dashboard
2. Select a table (e.g., `projects`)
3. Click **Insert row** or edit existing rows
4. Fill in the fields
5. **Important:** Set `is_published` or `is_active` to `true` for content to appear on the website
6. Click **Save**

### Key Tables and Their Purpose

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `hero_section` | Hero video and title | `youtube_video_id`, `main_title`, `tagline` |
| `projects` | Project portfolio | `title`, `location`, `category`, `is_published` |
| `videos` | Video gallery | `youtube_id`, `title`, `category`, `is_published` |
| `faqs` | FAQ section | `question`, `answer`, `is_published` |
| `partners` | Partner companies | `name`, `logo_url`, `is_active` |
| `contact_info` | Contact details | `phone_primary`, `email`, `address` |
| `form_submissions` | Contact form data | `name`, `email`, `message`, `is_read` |

### Publishing Workflow

1. **Draft Mode:** Set `is_published` / `is_active` = `false`
2. **Published:** Set `is_published` / `is_active` = `true`
3. Content only appears on the website when published

### Display Order

Use the `display_order` field to control the order of items:
- Lower numbers appear first
- Example: `display_order: 1` appears before `display_order: 2`

---

## API Reference

### Database Helper Functions

Located in `/src/lib/supabase.ts`:

```typescript
import { db } from '../lib/supabase'

// Fetch active hero section
await db.heroSection()

// Fetch stats by section
await db.stats('animated_stats')  // or 'civil_works'

// Fetch projects by category
await db.projects('Infrastructure')

// Fetch videos by category
await db.videos('Showcase')

// Submit contact form
await db.submitContactForm({
  name: 'John',
  email: 'john@example.com',
  message: 'Hello'
})
```

### Authentication Helpers

```typescript
import { signIn, signOut, getCurrentUser } from '../lib/supabase'

// Sign in admin user
const { user, session } = await signIn('admin@example.com', 'password')

// Get current user
const user = await getCurrentUser()

// Sign out
await signOut()
```

### Row Level Security (RLS)

The database has RLS policies:

- **Public Read:** Anyone can read published/active content
- **Admin Full Access:** Authenticated users can create/update/delete
- **Anonymous Forms:** Anyone can submit contact forms

To create an admin user:

1. Go to **Authentication** > **Users** in Supabase Dashboard
2. Click **Add User**
3. Enter email and password
4. User can now sign in to admin dashboard

---

## Database Schema Overview

### Content Tables (23 total)

- `site_settings` - Global site configuration
- `hero_section` - Hero video section
- `about_section` + `highlights` + `achievements` + `bottom_features` - About page
- `stats` - Animated statistics (reusable for multiple sections)
- `objectives`, `commitments`, `core_values` - Company values
- `features` - Interactive showcase items
- `services` + `service_items` - Services with nested items
- `projects` - Project portfolio
- `videos` - Video gallery
- `faqs` - Frequently asked questions
- `partners` - Partner companies
- `civil_works_section` + `civil_works_features` + stats - Civil works
- `contact_info` - Contact information
- `form_submissions` - Form submissions (from users)
- `media_assets` - File uploads
- `audit_log` - Change tracking

### Common Fields

Most tables have:
- `id` - Primary key (auto-generated)
- `display_order` - Controls order of items
- `is_published` / `is_active` - Controls visibility
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp (auto-updated)

---

## Troubleshooting

### Environment Variables Not Loading

Make sure `.env.local` exists and contains:

```
VITE_SUPABASE_URL=https://gympyawjllxbxswyuxzq.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Restart the dev server after adding env variables:

```bash
npm run dev
```

### Database Connection Errors

1. Check your Supabase project is active
2. Verify the URL and anon key are correct
3. Check RLS policies in Supabase Dashboard > Authentication > Policies

### TypeScript Errors

If types are not recognized, regenerate types using Supabase CLI:

```bash
npx supabase gen types typescript --project-id gympyawjllxbxswyuxzq > src/types/database.types.ts
```

### Data Not Appearing

1. Check `is_published` or `is_active` is set to `true`
2. Verify data exists in Supabase Table Editor
3. Check browser console for errors
4. Ensure frontend is fetching from correct table

---

## Next Steps

1. ✅ Run database migration (`001_initial_schema.sql`)
2. ✅ Run seed script (`seed.sql`)
3. ⬜ Test frontend data fetching with existing components
4. ⬜ Create admin user in Supabase Dashboard
5. ⬜ Set up Refine admin dashboard
6. ⬜ Integrate hooks into existing React components
7. ⬜ Test contact form submissions
8. ⬜ Configure media storage for images (Supabase Storage)

---

## Support

For issues or questions:
- Check Supabase Documentation: https://supabase.com/docs
- Check Refine Documentation: https://refine.dev/docs
- Review database schema: `/supabase/migrations/001_initial_schema.sql`
- Check type definitions: `/src/types/database.types.ts`

---

## License

This CMS setup is part of the Al-Khayat website project.
