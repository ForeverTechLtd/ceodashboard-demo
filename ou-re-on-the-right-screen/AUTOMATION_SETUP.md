# Automation Setup

The dashboard is now automation-first. Manual entry should only be used as a fallback while API credentials are being connected.

## Priority Order

1. Dentally - appointments, patient activity, UDA tracking, session productivity
2. Finance - revenue, costs, payroll, profit/loss
3. Manager compliance - completed tasks, overdue tasks, completion percentage
4. Google Ads and Meta Ads - spend, leads, cost per lead, conversion
5. CRM - lead source, follow-up stage, conversion outcome

## Credentials Needed

Add credentials as environment variables in the hosting platform. Do not put real API keys into files committed to GitHub.

```text
DENTALLY_API_KEY
DENTALLY_BASE_URL
FINANCE_API_KEY
FINANCE_BASE_URL
COMPLIANCE_API_KEY
COMPLIANCE_BASE_URL
GOOGLE_ADS_CLIENT_ID
GOOGLE_ADS_CLIENT_SECRET
GOOGLE_ADS_REFRESH_TOKEN
META_ADS_ACCESS_TOKEN
META_AD_ACCOUNT_ID
CRM_API_KEY
CRM_BASE_URL
```

## New API Endpoints

```text
GET  /api/integrations
POST /api/integrations/sync
POST /api/integrations/sync?source=dentally
POST /api/integrations/sync?source=finance
POST /api/integrations/sync?source=compliance
```

## Current Automation Behaviour

The system can already detect which credentials are present, show readiness in the dashboard, and run a connection readiness check. The next implementation step is mapping each provider response into the dashboard data model once the real API access details are available.
