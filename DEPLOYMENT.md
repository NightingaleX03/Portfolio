# GitHub Pages Deployment Guide

This guide will help you deploy your React portfolio to GitHub Pages.

## Prerequisites

1. Make sure you have a GitHub account
2. Your project should be pushed to a GitHub repository
3. You should have Node.js and npm installed

## Step 1: Update Repository Settings

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch (this will be created automatically)
6. Click "Save"

## Step 2: Update Homepage URL

In your `package.json`, update the `homepage` field to match your GitHub username and repository name:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
}
```

For example:
- If your username is `NightingaleX03` and repo is `Portfolio`: `https://NightingaleX03.github.io/Portfolio`
- If your username is `johndoe` and repo is `my-portfolio`: `https://johndoe.github.io/my-portfolio`

## Step 3: Handle React Router (Important!)

Since you're using React Router with `BrowserRouter`, you need to handle client-side routing for GitHub Pages. The current setup should work, but if you encounter 404 errors on direct navigation, you may need to:

1. Create a `404.html` file in the `public` folder
2. Or use `HashRouter` instead of `BrowserRouter`

## Step 4: Deploy

Run these commands in your project directory:

```bash
# Install dependencies (if not already done)
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## Step 5: Verify Deployment

1. Wait a few minutes for GitHub Pages to build and deploy
2. Visit your site at the URL specified in your `homepage` field
3. Test all your routes to make sure they work

## Troubleshooting

### 404 Errors on Direct Navigation
If you get 404 errors when directly navigating to routes like `/projects` or `/journey`, you can:

**Option 1: Use HashRouter (Recommended for GitHub Pages)**
Update your `App.tsx`:

```tsx
import { HashRouter as Router } from 'react-router-dom';
```

**Option 2: Create a 404.html file**
Create a `public/404.html` file that redirects to your main page.

### Build Errors
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run build`
- Ensure all imports are correct

### Deployment Not Working
- Check that the `gh-pages` package is installed: `npm install gh-pages --save-dev`
- Verify your GitHub repository settings
- Check the GitHub Actions tab for any build errors

## Custom Domain (Optional)

If you want to use a custom domain:

1. Add your custom domain to your GitHub repository settings
2. Update the `homepage` field in `package.json` to your custom domain
3. Create a `CNAME` file in the `public` folder with your domain name
4. Deploy again: `npm run deploy`

## Environment Variables

If you're using environment variables, make sure to:
1. Create a `.env` file with your production variables
2. Prefix them with `REACT_APP_` for Create React App
3. Never commit sensitive information to your repository

## Performance Optimization

After deployment, consider:
1. Optimizing images
2. Enabling GitHub Pages caching
3. Using a CDN for static assets
4. Implementing lazy loading for components

## Support

If you encounter issues:
1. Check the GitHub Pages documentation
2. Review the build logs in GitHub Actions
3. Test locally with `npm run build` and `npm run start` 