export async function syncDentallyData({ from, to, siteId }) {
  return {
    source: 'dentally',
    siteId,
    range: { from, to },
    syncedAt: new Date().toISOString(),
    records: {
      appointments: [],
      patients: [],
      treatments: [],
      udaActivity: []
    }
  };
}
