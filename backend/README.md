# Visit Counter API

Simple Express API for tracking visit counts. This backend needs to be deployed separately from your GitHub Pages frontend.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables (optional):
- `PORT`: Server port (default: 3001)
- `FRONTEND_URL`: Your frontend URL for CORS (default: '*')

3. Run the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Deployment Options

### Option 1: Railway (Recommended - Free tier available)
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repo
4. Select the `backend` folder
5. Deploy!

### Option 2: Render (Free tier available)
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repo
4. Set root directory to `backend`
5. Build command: `npm install`
6. Start command: `npm start`

### Option 3: Heroku
1. Install Heroku CLI
2. `cd backend`
3. `heroku create your-app-name`
4. `git push heroku main`

### Option 4: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. `cd backend`
3. `vercel`

## Update Frontend

After deploying, update the API URL in your frontend:

1. Create a `.env` file in the `personal-portfolio` root:
```
REACT_APP_VISIT_COUNTER_API=https://your-deployed-api-url.com
```

2. Rebuild and redeploy your frontend.

## Production Notes

- **Current implementation uses in-memory storage** - visit count resets on server restart
- For production, integrate with a database (MongoDB, PostgreSQL, etc.)
- Update CORS settings to only allow your frontend domain
- Consider adding rate limiting to prevent abuse
