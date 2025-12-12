# Debug Blank Screen Issue - Step by Step

## Step 1: Open Browser Console

1. Go to your Vercel deployment URL
2. Press **F12** (or Right-click → Inspect)
3. Click the **Console** tab
4. **Take a screenshot of any errors** (red text)

## Step 2: Look for These Specific Messages

### ✅ Good Signs (App is loading):
```
App component rendering
HomePage component rendering
Environment: { hasSupabaseUrl: true, hasSupabaseKey: true }
```

### ❌ Bad Signs (Problems):

#### Missing Environment Variables:
```
❌ Missing VITE_SUPABASE_URL environment variable
Environment: { hasSupabaseUrl: false, hasSupabaseKey: false }
```
**Fix**: Add environment variables in Vercel dashboard (see below)

#### JavaScript/Import Errors:
```
Failed to fetch dynamically imported module
Uncaught SyntaxError
```
**Fix**: Clear Vercel build cache and redeploy

#### Network Errors:
```
Failed to load resource: net::ERR_NAME_NOT_RESOLVED
```
**Fix**: Check your internet connection, check Supabase status

## Step 3: Add Environment Variables in Vercel

**This is the #1 cause of blank screens!**

### How to Add:
1. Go to: https://vercel.com/dashboard
2. Click on your project
3. Click **Settings** tab (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Add these two variables:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://gympyawjllxbxswyuxzq.supabase.co`
- Environment: Check all three (Production, Preview, Development)
- Click **Save**

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bXB5YXdqbGx4Ynhzd3l1eHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMjcxMDUsImV4cCI6MjA3NzkwMzEwNX0.QmgX_oi89Fj0_L34S5d6a5CfwTZaquFjiYlvfE2LT_U`
- Environment: Check all three (Production, Preview, Development)
- Click **Save**

## Step 4: Redeploy

After adding environment variables, you **MUST** redeploy:

### Option A: Redeploy from Vercel Dashboard
1. Go to **Deployments** tab
2. Find the latest deployment
3. Click the **"..."** menu (three dots)
4. Click **"Redeploy"**
5. Wait for deployment to finish (usually 1-2 minutes)

### Option B: Push a New Commit
```bash
git add .
git commit -m "Add environment variables"
git push
```

## Step 5: Verify Console Output

After redeployment, go back to your site and check console:

**You should now see:**
```
App component rendering
HomePage component rendering
Environment: { hasSupabaseUrl: true, hasSupabaseKey: true }
```

## Step 6: Check Network Tab

If still blank:

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Reload the page
4. Look for any red/failed requests
5. Click on failed requests to see error details

## Common Causes & Solutions

### 1. Environment Variables Not Set (90% of cases)
**Symptom**: Console shows `hasSupabaseUrl: false`
**Solution**: Follow Step 3 above

### 2. Environment Variables Not Applied
**Symptom**: Variables are in Vercel dashboard but console still shows `false`
**Solution**: You forgot to redeploy! Do Step 4.

### 3. React Router Not Working
**Symptom**: Homepage works but refresh shows 404
**Solution**: Already fixed by `vercel.json` file

### 4. Build Cache Issue
**Symptom**: Old version keeps deploying
**Solution**:
1. Go to Settings → General
2. Scroll down
3. Click "Clear Build Cache"
4. Redeploy

### 5. Wrong Repository Branch
**Symptom**: Changes not appearing
**Solution**: Check that Vercel is deploying from the correct branch (usually `main` or `master`)

## Still Not Working?

### Test Locally First

```bash
# Install dependencies
npm install

# Build production version
npm run build

# Preview production build
npm run preview
```

Open http://localhost:4173 - Does it work locally?

- ✅ **Works locally, not on Vercel**: Environment variable issue
- ❌ **Doesn't work locally**: Check the console error in your terminal

### Get More Information

Send me:
1. Screenshot of browser console (F12 → Console tab)
2. Screenshot of Vercel build logs (Deployments → Click deployment → Building section)
3. Confirmation that environment variables are added in Vercel dashboard
4. URL of your Vercel deployment

## Quick Test: Does ErrorBoundary Show?

If you see a nicely formatted error page (not blank) with a "Reload Page" button, that's actually good! It means:
- ✅ React is loading
- ✅ The app is running
- ❌ There's an error being caught

The error page will tell you what's wrong. Read it carefully!

## Environment Variables Explained

These variables tell your app how to connect to Supabase:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Public key for API access

Without these, the app crashes immediately when trying to import the Supabase client.

**Note**: The `VITE_` prefix is required for Vite to expose these variables to the browser.
