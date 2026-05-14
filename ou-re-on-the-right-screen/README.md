# CEO Dashboard System

A modular CEO dashboard for a multi-business group covering dental clinics, medical clinics, an AI app, VR product, property, and investments.

## Structure

- `frontend` - web dashboard UI
- `backend` - Node API with mock operational, finance, dental, CRM, and marketing data
- `integrations` - adapter placeholders for Dentally, finance systems, ads platforms, and CRM tools

## Run Locally

```bash
node backend/src/server.js
```

The dashboard and API run on `http://localhost:4000`.

## Deploy Online

See `DEPLOYMENT.md` for the fastest Render deployment path.

For a public prototype, deploy with `DEMO_MODE=true`. See `DEMO_SHARING_COPY.md` for wording you can send with the demo link.

## What Is Built First

- Executive overview with daily revenue, profit/loss, KPI health, and underperformance alerts
- Dental performance section with appointments, session productivity, UDA tracking, and missed-target alerts
- Finance section with revenue, costs, profit, and daily/monthly filtering
- CRM and marketing section with leads, conversion, cost per lead, and source performance
- Manager compliance section showing task completion percentage and overdue tasks by manager/site
- Automation status section showing API readiness, sync cadence, and missing credentials
- Modular backend route structure ready for real integrations
