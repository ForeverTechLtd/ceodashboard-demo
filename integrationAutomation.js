const autoSyncMinutes = Number(process.env.AUTO_SYNC_INTERVAL_MINUTES || 60);
const autoSyncEnabled = process.env.AUTO_SYNC_ENABLED !== 'false';

const connectors = [
  {
    id: 'dentally',
    name: 'Dentally',
    category: 'Dental operations',
    cadence: 'Every 60 minutes',
    pulls: ['appointments', 'patients', 'UDA activity', 'treatment plans'],
    requiredKeys: ['DENTALLY_API_KEY', 'DENTALLY_BASE_URL'],
    priority: 'Critical'
  },
  {
    id: 'finance',
    name: 'Finance',
    category: 'Revenue and costs',
    cadence: 'Every morning',
    pulls: ['revenue', 'costs', 'payroll', 'profit and loss'],
    requiredKeys: ['FINANCE_API_KEY', 'FINANCE_BASE_URL'],
    priority: 'Critical'
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    category: 'Marketing',
    cadence: 'Every 6 hours',
    pulls: ['spend', 'leads', 'cost per lead', 'conversion rate'],
    requiredKeys: ['GOOGLE_ADS_CLIENT_ID', 'GOOGLE_ADS_CLIENT_SECRET', 'GOOGLE_ADS_REFRESH_TOKEN'],
    priority: 'High'
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    category: 'Marketing',
    cadence: 'Every 6 hours',
    pulls: ['spend', 'leads', 'cost per lead', 'campaign performance'],
    requiredKeys: ['META_ADS_ACCESS_TOKEN', 'META_AD_ACCOUNT_ID'],
    priority: 'High'
  },
  {
    id: 'crm',
    name: 'CRM',
    category: 'Sales pipeline',
    cadence: 'Every 30 minutes',
    pulls: ['new leads', 'follow-up status', 'conversion outcome'],
    requiredKeys: ['CRM_API_KEY', 'CRM_BASE_URL'],
    priority: 'High'
  },
  {
    id: 'compliance',
    name: 'Manager compliance',
    category: 'Tasks and compliance',
    cadence: 'Every 30 minutes',
    pulls: ['completed tasks', 'overdue tasks', 'manager completion rate'],
    requiredKeys: ['COMPLIANCE_API_KEY', 'COMPLIANCE_BASE_URL'],
    priority: 'Critical'
  }
];

const syncState = new Map(
  connectors.map((connector) => [
    connector.id,
    {
      lastSyncAt: null,
      lastResult: null,
      status: 'waiting_for_credentials'
    }
  ])
);

function hasCredentials(connector) {
  return connector.requiredKeys.every((key) => Boolean(process.env[key]));
}

function nextRunFrom(minutes) {
  return new Date(Date.now() + minutes * 60 * 1000).toISOString();
}

function statusFor(connector, state) {
  if (!hasCredentials(connector)) {
    return 'waiting_for_credentials';
  }

  if (state.status === 'syncing') {
    return 'syncing';
  }

  if (state.lastSyncAt) {
    return 'ready_synced';
  }

  return 'credentials_ready';
}

export function getIntegrationStatus() {
  const mapped = connectors.map((connector) => {
    const state = syncState.get(connector.id);
    const status = statusFor(connector, state);

    return {
      ...connector,
      status,
      credentialsReady: status !== 'waiting_for_credentials',
      missingKeys: connector.requiredKeys.filter((key) => !process.env[key]),
      lastSyncAt: state.lastSyncAt,
      lastResult: state.lastResult,
      nextCheckAt: autoSyncEnabled ? nextRunFrom(autoSyncMinutes) : null
    };
  });

  const connected = mapped.filter((connector) => connector.credentialsReady).length;

  return {
    summary: {
      total: mapped.length,
      connected,
      waiting: mapped.length - connected,
      autoSyncEnabled,
      autoSyncMinutes,
      checkedAt: new Date().toISOString()
    },
    connectors: mapped
  };
}

export async function syncIntegrations(source = 'all', trigger = 'manual') {
  const selected = source === 'all'
    ? connectors
    : connectors.filter((connector) => connector.id === source);

  if (selected.length === 0) {
    return {
      ok: false,
      error: `Unknown integration source: ${source}`,
      results: []
    };
  }

  const results = selected.map((connector) => {
    const state = syncState.get(connector.id);

    if (!hasCredentials(connector)) {
      const result = {
        source: connector.id,
        status: 'waiting_for_credentials',
        message: `${connector.name} is waiting for API credentials.`,
        missingKeys: connector.requiredKeys.filter((key) => !process.env[key]),
        recordsImported: 0,
        trigger
      };
      syncState.set(connector.id, { ...state, status: result.status, lastResult: result });
      return result;
    }

    const result = {
      source: connector.id,
      status: 'credentials_ready',
      message: `${connector.name} credentials are present. Field mapping is ready to connect to live imports.`,
      missingKeys: [],
      recordsImported: 0,
      trigger,
      checkedAt: new Date().toISOString()
    };

    syncState.set(connector.id, {
      lastSyncAt: result.checkedAt,
      lastResult: result,
      status: 'ready_synced'
    });

    return result;
  });

  return {
    ok: results.every((result) => result.status !== 'waiting_for_credentials'),
    results,
    status: getIntegrationStatus()
  };
}

export function startAutomationScheduler() {
  if (!autoSyncEnabled) {
    return null;
  }

  const intervalMs = Math.max(5, autoSyncMinutes) * 60 * 1000;

  return setInterval(() => {
    syncIntegrations('all', 'scheduled').catch((error) => {
      console.error('Scheduled integration check failed', error);
    });
  }, intervalMs);
}
