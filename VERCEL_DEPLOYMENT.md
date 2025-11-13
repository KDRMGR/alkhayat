# Vercel Deployment Guide

## Issue: Blank White Screen on Vercel

If you're seeing a blank white screen on Vercel, follow these steps:

## 1. Add Environment Variables in Vercel Dashboard

Go to your Vercel project settings and add these environment variables:

```
VITE_SUPABASE_URL=https://gympyawjllxbxswyuxzq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bXB5YXdqbGx4Ynhzd3l1eHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMjcxMDUsImV4cCI6MjA3NzkwMzEwNX0.QmgX_oi89Fj0_L34S5d6a5CfwTZaquFjiYlvfE2LT_U
```

### How to add environment variables:
1. Go to your Vercel project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables" in the left sidebar
4. Add each variable:
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://gympyawjllxbxswyuxzq.supabase.co`
   - Select all environments (Production, Preview, Development)
   - Click "Save"
5. Repeat for `VITE_SUPABASE_ANON_KEY`

## 2. Redeploy the Project

After adding environment variables, you must redeploy:
1. Go to "Deployments" tab
2. Click the three dots menu on the latest deployment
3. Click "Redeploy"

Or simply push a new commit to trigger redeployment.

## 3. Check Build Logs

If still blank:
1. Go to "Deployments" tab
2. Click on the latest deployment
3. View the "Building" logs for any errors

## 4. Check Browser Console

Open browser console (F12) on the deployed site and check for errors:
- Red errors indicating missing environment variables
- Network errors for failed API calls
- JavaScript errors

## Common Issues:

### Missing Environment Variables
**Symptom**: Console shows `undefined` for `import.meta.env.VITE_SUPABASE_URL`
**Fix**: Add environment variables in Vercel dashboard (step 1 above)

### React Router Not Working
**Symptom**: Page refreshes show 404
**Fix**: Already handled by `vercel.json` file (included in project)

### Build Fails
**Symptom**: Deployment fails during build step
**Fix**: Check that all dependencies are in `package.json` (already configured)

## Files Created for Vercel:

1. **vercel.json** - Handles client-side routing
2. **.env.example** - Documents required environment variables
3. This guide

## Need More Help?

Check Vercel deployment logs and browser console for specific errors.
