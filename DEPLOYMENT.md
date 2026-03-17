# Deployment Guide

## Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (free)
- Supabase database (already configured)
- Google AI Studio API key (for Gemini AI)

### Environment Variables Required

Set these in Vercel dashboard:

```
DATABASE_URL=your_supabase_connection_string
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
GEMINI_API_KEY=your_gemini_api_key
```

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add all required environment variables
   - Make sure to use production values

4. **Deploy**
   - Vercel will automatically deploy
   - Build process includes Prisma generation
   - Database will be seeded on first deployment

### Post-Deployment

1. **Update NEXT_PUBLIC_APP_URL**
   - Copy your Vercel domain
   - Update the environment variable
   - Redeploy if needed

2. **Test All Features**
   - Homepage statistics
   - Admin dashboard
   - API endpoints
   - Database operations

### Troubleshooting

- **Build Errors**: Check Vercel build logs
- **Database Issues**: Verify DATABASE_URL format
- **API Errors**: Check environment variables are set
- **Prisma Issues**: Ensure postinstall script runs

### Features Included

✅ Homepage with dynamic statistics  
✅ Admin dashboard for content management  
✅ Prop firm comparison and reviews  
✅ Forum functionality  
✅ Giveaway system  
✅ AI-powered chatbot  
✅ Bilingual support (EN/ID)  
✅ Responsive design  
✅ SEO optimized  