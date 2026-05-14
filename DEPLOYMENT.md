# Deployment Guide

## Fastest First Deployment

Use Render as a simple first home for the dashboard.

1. Create a private GitHub repository called `CEO-Dashboard-System`.
2. Upload this project folder to that repository.
3. In Render, create a new Web Service from the GitHub repository.
4. Use these settings:

```text
Runtime: Node
Build command: leave blank
Start command: node backend/src/server.js
Health check path: /health
```

5. Add this environment variable:

```text
NODE_ENV=production
DEMO_MODE=true
```

Render will provide the public URL after the first deploy.

## Public Demo Settings

For a public demo, keep `DEMO_MODE=true` and do not add real API keys. The app will show clear demo labeling and read-only automation controls.

## GitHub Notes

Use a private repository. Keep `.env.example` in GitHub, but never commit a real `.env` file or real API keys.

Once GitHub is connected to Render, every update to the main branch can redeploy the dashboard automatically.

## Local Preview

```bash
node backend/src/server.js
```

Open `http://localhost:4000`.

## Making The Data Truly Live

The current dashboard is ready for hosting, but its numbers are still sample data. The next production phase is to replace `backend/src/services/dashboardData.js` with real data from:

- Dentally appointments, UDA activity, and patient/session metrics
- finance revenue, cost, and profit sources
- Google Ads and Meta Ads spend/leads
- CRM lead and conversion data
- manager task and compliance completion systems

Keep real API keys out of code. Store them as environment variables in the hosting platform.

See `AUTOMATION_SETUP.md` for the API credentials and automation endpoints.
