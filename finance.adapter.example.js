export async function syncFinanceData({ from, to, businessId }) {
  return {
    source: 'finance',
    businessId,
    range: { from, to },
    syncedAt: new Date().toISOString(),
    records: {
      revenue: [],
      costs: [],
      payroll: [],
      profitAndLoss: []
    }
  };
}
