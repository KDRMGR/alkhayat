# Troubleshooting Blank Screen on Vercel

## Quick Fix Checklist

### ✅ Step 1: Add Environment Variables
The most common cause of blank screens is missing environment variables.

1. Go to: **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**

2. Add these two variables:
   ```
   VITE_SUPABASE_URL=https://gympyawjllxbxswyuxzq.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bXB5YXdqbGx4Ynhzd3l1eHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzMjcxMDUsImV4cCI6MjA3NzkwMzEwNX0.QmgX_oi89Fj0_L34S5d6a5CfwTZaquFjiYlvfE2LT_U
   ```

3. **Important**: Select all environments (Production, Preview, Development)

### ✅ Step 2: Redeploy
After adding environment variables:
- Go to **Deployments** tab
- Click **"..."** on the latest deployment
- Click **"Redeploy"**

OR simply push a new commit to trigger redeployment.

### ✅ Step 3: Check Browser Console
1. Open your deployed site
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Look for error messages (red text)

**Common errors you might see:**
- ❌ "Missing VITE_SUPABASE_URL environment variable" → Go back to Step 1
- ❌ "Failed to fetch" → Network/API issue, check Supabase status
- ❌ JavaScript errors → Check build logs

### ✅ Step 4: Check Vercel Build Logs
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Check the **Building** section for errors

**Build should show:**
```
✓ built in X.XXs
```

### ✅ Step 5: Verify Files Exist
Make sure these files are in your repository:
- ✅ `vercel.json` (handles routing)
- ✅ `.env.example` (documentation)
- ✅ `src/components/ErrorBoundary.tsx` (error handling)

## Still Having Issues?

### Check Network Tab
1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Reload the page
4. Look for failed requests (red items)

### Verify Build Settings in Vercel
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Clear Cache and Redeploy
Sometimes Vercel cache causes issues:
1. Go to **Settings** → **General**
2. Scroll to **Build & Development Settings**
3. Try redeploying with "Clear build cache" option

## Test Locally
To verify the build works locally:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

Then open http://localhost:4173 in your browser.

## Error Boundary
If you see a nicely formatted error page instead of a blank screen, that's good! The ErrorBoundary is catching the error and showing you what went wrong. Read the error message carefully.

## Get More Help
If none of these steps work:
1. Share the **Vercel build logs**
2. Share any **browser console errors** (screenshot)
3. Check if the same issue happens locally with `npm run preview`
