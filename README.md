# Integration Adapters

This folder is reserved for external system connectors.

Planned adapters:

- `dentally` - appointments, treatments, NHS contract performance, UDA tracking
- `finance` - revenue, costs, payroll, supplier spend, bank feeds
- `ads` - Google Ads, Meta Ads, campaign spend, leads, CPL
- `crm` - lead sources, follow-up status, conversion tracking

Each adapter should expose a small, consistent interface:

```js
export async function syncData({ from, to, siteId }) {
  return {
    source: 'system-name',
    syncedAt: new Date().toISOString(),
    records: []
  };
}
```
