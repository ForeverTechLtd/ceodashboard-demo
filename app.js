const sampleData = {
  businesses: [
    { id: 'dental', name: 'Dental Clinics', type: 'NHS + Private', dailyRevenue: 48250, dailyProfit: 14200, status: 'Attention', kpis: ['UDA 91%', 'Private conversion 22%', 'Hygiene fill 87%'] },
    { id: 'medical', name: 'Medical Clinics', type: 'Clinical services', dailyRevenue: 31800, dailyProfit: 9800, status: 'Healthy', kpis: ['Utilisation 84%', 'DNA 4.8%', 'Avg value £186'] },
    { id: 'sofina-ai', name: 'AI App', type: 'AI product', dailyRevenue: 9200, dailyProfit: 3300, status: 'Growth', kpis: ['MRR £76k', 'Churn 2.1%', 'CAC payback 4.3m'] },
    { id: 'vr-product', name: 'VR Product', type: 'Product sales', dailyRevenue: 6400, dailyProfit: -1200, status: 'Underperforming', kpis: ['Pipeline £44k', 'Demo close 14%', 'Returns 3.4%'] },
    { id: 'property-investments', name: 'Property + Investments', type: 'Assets', dailyRevenue: 12850, dailyProfit: 7600, status: 'Healthy', kpis: ['Occupancy 96%', 'Yield 7.4%', 'Cash reserve £180k'] }
  ],
  dental: {
    sites: [
      { clinic: 'Clinic A', appointments: 92, appointmentTarget: 110, patientsPerSession: 11.8, udaPercent: 91 },
      { clinic: 'Clinic B', appointments: 124, appointmentTarget: 120, patientsPerSession: 14.2, udaPercent: 104 },
      { clinic: 'Clinic C', appointments: 76, appointmentTarget: 96, patientsPerSession: 9.4, udaPercent: 78 }
    ]
  },
  finance: [
    { period: 'Today', revenue: 108500, costs: 74800, profit: 33700 },
    { period: 'This month', revenue: 2240000, costs: 1545000, profit: 695000 },
    { period: 'Forecast', revenue: 2710000, costs: 1810000, profit: 900000 }
  ],
  marketing: [
    { channel: 'Google Ads', leads: 318, conversionRate: 18.4, costPerLead: 31 },
    { channel: 'Meta Ads', leads: 226, conversionRate: 11.8, costPerLead: 24 },
    { channel: 'Organic / Referral', leads: 142, conversionRate: 27.2, costPerLead: 6 }
  ],
  compliance: {
    overallCompletionRate: 86,
    managers: [
      { manager: 'Practice Manager A', site: 'Clinic A', completed: 43, total: 50, completionRate: 86, overdue: 3 },
      { manager: 'Practice Manager B', site: 'Clinic B', completed: 57, total: 60, completionRate: 95, overdue: 0 },
      { manager: 'Practice Manager C', site: 'Clinic C', completed: 31, total: 45, completionRate: 69, overdue: 8 },
      { manager: 'Operations Manager', site: 'Medical Clinics', completed: 38, total: 42, completionRate: 90, overdue: 1 }
    ]
  },
  integrations: {
    summary: {
      total: 6,
      connected: 0,
      waiting: 6,
      autoSyncEnabled: true,
      autoSyncMinutes: 60,
      checkedAt: new Date().toISOString()
    },
    connectors: [
      { id: 'dentally', name: 'Dentally', category: 'Dental operations', cadence: 'Every 60 minutes', pulls: ['appointments', 'patients', 'UDA activity'], priority: 'Critical', status: 'waiting_for_credentials', credentialsReady: false, missingKeys: ['DENTALLY_API_KEY', 'DENTALLY_BASE_URL'] },
      { id: 'finance', name: 'Finance', category: 'Revenue and costs', cadence: 'Every morning', pulls: ['revenue', 'costs', 'profit and loss'], priority: 'Critical', status: 'waiting_for_credentials', credentialsReady: false, missingKeys: ['FINANCE_API_KEY', 'FINANCE_BASE_URL'] },
      { id: 'google-ads', name: 'Google Ads', category: 'Marketing', cadence: 'Every 6 hours', pulls: ['spend', 'leads', 'cost per lead'], priority: 'High', status: 'waiting_for_credentials', credentialsReady: false, missingKeys: ['GOOGLE_ADS_CLIENT_ID', 'GOOGLE_ADS_CLIENT_SECRET', 'GOOGLE_ADS_REFRESH_TOKEN'] },
      { id: 'meta-ads', name: 'Meta Ads', category: 'Marketing', cadence: 'Every 6 hours', pulls: ['spend', 'leads', 'campaign performance'], priority: 'High', status: 'waiting_for_credentials', credentialsReady: false, missingKeys: ['META_ADS_ACCESS_TOKEN', 'META_AD_ACCOUNT_ID'] },
      { id: 'crm', name: 'CRM', category: 'Sales pipeline', cadence: 'Every 30 minutes', pulls: ['new leads', 'follow-up status', 'conversion outcome'], priority: 'High', status: 'waiting_for_credentials', credentialsReady: false, missingKeys: ['CRM_API_KEY', 'CRM_BASE_URL'] },
      { id: 'compliance', name: 'Manager compliance', category: 'Tasks and compliance', cadence: 'Every 30 minutes', pulls: ['completed tasks', 'overdue tasks', 'completion rate'], priority: 'Critical', status: 'waiting_for_credentials', credentialsReady: false, missingKeys: ['COMPLIANCE_API_KEY', 'COMPLIANCE_BASE_URL'] }
    ]
  },
  demo: {
    enabled: true,
    label: 'Demo prototype',
    message: 'Sample data only. No patient, client, staff, or real financial records are included.',
    readOnly: true
  },
  alerts: [
    { message: 'Clinic C is 18 UDA points below target and needs session-level review.' },
    { message: 'VR Product has negative daily profit. Check fulfilment costs and close rate.' },
    { message: 'Clinic C manager compliance is below 75% with 8 overdue tasks.' },
    { message: 'Dental Clinics missed appointment target by 34 appointments today.' },
    { message: 'Google Ads CPL rose 12% week-on-week while conversion softened.' }
  ]
};

const icons = {
  overview: '<svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/></svg>',
  dental: '<svg viewBox="0 0 24 24"><path d="M11 2v7"/><path d="M7.5 2h7"/><path d="M5 9h14"/><path d="M6 9v5a6 6 0 0 0 12 0V9"/></svg>',
  finance: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  users: '<svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>',
  compliance: '<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  automation: '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M16 8h5V3"/></svg>',
  target: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  money: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>'
};

function money(value) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(value);
}

function safeStatus(status) {
  return status.toLowerCase().replace(/\s+/g, '-');
}

function formatDateTime(value) {
  if (!value) return 'Not checked yet';
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(value));
}

function formatToday() {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date());
}

async function loadData() {
  try {
    const response = await fetch('/api/dashboard');
    if (!response.ok) throw new Error('API unavailable');
    return response.json();
  } catch {
    return sampleData;
  }
}

function renderDashboard(data) {
  const totalRevenue = data.businesses.reduce((sum, item) => sum + item.dailyRevenue, 0);
  const totalProfit = data.businesses.reduce((sum, item) => sum + item.dailyProfit, 0);
  const integrations = data.integrations || sampleData.integrations;
  const demo = data.demo || sampleData.demo;

  document.getElementById('root').innerHTML = `
    <main class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">S</div>
          <div><strong>CEO System</strong><span>Group command centre</span></div>
        </div>
        <nav>
          <a class="active" href="#overview">${icons.overview} Overview</a>
          <a href="#dental">${icons.dental} Dental</a>
          <a href="#finance">${icons.finance} Finance</a>
          <a href="#marketing">${icons.users} CRM + Marketing</a>
          <a href="#compliance">${icons.compliance} Compliance</a>
          <a href="#automations">${icons.automation} Automations</a>
          <a href="#alerts">${icons.alert} Alerts</a>
        </nav>
      </aside>
      <section class="workspace">
        ${demo.enabled ? `<div class="demo-banner"><strong>${demo.label}</strong><span>${demo.message}</span></div>` : ''}
        <header class="topbar">
          <div>
            <p class="eyebrow">${formatToday()}</p>
            <h1>${demo.enabled ? 'CEO Dashboard Demo' : 'Multi-Business CEO Dashboard'}</h1>
          </div>
          <div class="filters">
            <select aria-label="Business filter">
              <option>All businesses</option><option>Dental clinics</option><option>Medical clinics</option><option>AI App</option><option>VR Product</option>
            </select>
            <select aria-label="Time period"><option>Today</option><option>This month</option><option>Quarter</option></select>
          </div>
        </header>

        <section id="overview" class="stats-grid">
          ${statCard(icons.money, 'Daily revenue', money(totalRevenue), '+8.6%', 'green')}
          ${statCard(icons.overview, 'Daily profit', money(totalProfit), '+4.1%', 'blue')}
          ${statCard(icons.compliance, 'Manager compliance', `${data.compliance.overallCompletionRate}%`, '-4%', data.compliance.overallCompletionRate >= 85 ? 'green' : 'amber')}
          ${statCard(icons.automation, 'Automation feeds', `${integrations.summary.connected}/${integrations.summary.total}`, `${integrations.summary.waiting} waiting`, integrations.summary.waiting ? 'amber' : 'green')}
        </section>

        <section class="panel business-panel">
          <div class="panel-heading"><div><p class="eyebrow">Overview</p><h2>Daily performance by business</h2></div></div>
          <div class="business-grid">${data.businesses.map(businessCard).join('')}</div>
        </section>

        <section class="two-column">
          <div id="dental" class="panel">
            <div class="panel-heading"><div><p class="eyebrow">Dental</p><h2>Appointments, sessions and UDA tracking</h2></div>${icons.dental}</div>
            <div class="table">
              <div class="table-row table-head"><span>Clinic</span><span>Appts</span><span>Patients/session</span><span>UDA</span></div>
              ${data.dental.sites.map(dentalRow).join('')}
            </div>
          </div>
          <div id="alerts" class="panel alert-panel">
            <div class="panel-heading"><div><p class="eyebrow">Exceptions</p><h2>Underperformance alerts</h2></div>${icons.alert}</div>
            <div class="alerts">${data.alerts.map((alert) => `<div class="alert-item"><span></span><p>${alert.message}</p></div>`).join('')}</div>
          </div>
        </section>

        <section class="two-column">
          <div id="finance" class="panel">
            <div class="panel-heading"><div><p class="eyebrow">Finance</p><h2>Revenue, costs and profit</h2></div>${icons.finance}</div>
            <div class="finance-list">${data.finance.map(financeRow).join('')}</div>
          </div>
          <div id="marketing" class="panel">
            <div class="panel-heading"><div><p class="eyebrow">CRM + Marketing</p><h2>Leads, conversion and CPL</h2></div>${icons.users}</div>
            <div class="marketing-bars">${data.marketing.map(marketingRow).join('')}</div>
          </div>
        </section>

        <section id="compliance" class="panel">
          <div class="panel-heading">
            <div><p class="eyebrow">Compliance</p><h2>Manager task completion</h2></div>
            ${icons.compliance}
          </div>
          <div class="compliance-summary">
            <div>
              <strong>${data.compliance.overallCompletionRate}%</strong>
              <span>completed across managers</span>
            </div>
            <div>
              <strong>${data.compliance.managers.reduce((sum, manager) => sum + manager.overdue, 0)}</strong>
              <span>overdue tasks</span>
            </div>
          </div>
          <div class="compliance-list">${data.compliance.managers.map(complianceRow).join('')}</div>
        </section>

        <section id="automations" class="panel">
          <div class="panel-heading">
            <div><p class="eyebrow">Automations</p><h2>Live data connections</h2></div>
            ${icons.automation}
          </div>
          <div class="automation-summary">
            <div><strong>${integrations.summary.connected}/${integrations.summary.total}</strong><span>feeds connected</span></div>
            <div><strong>${integrations.summary.waiting}</strong><span>waiting for credentials</span></div>
            <div><strong>${integrations.summary.autoSyncEnabled ? `${integrations.summary.autoSyncMinutes}m` : 'Off'}</strong><span>auto-check cadence</span></div>
            <div><strong>${formatDateTime(integrations.summary.checkedAt)}</strong><span>last checked</span></div>
          </div>
          <div class="automation-actions">
            ${demo.readOnly ? '<span class="demo-note">Read-only demo</span>' : `<button type="button" data-sync-source="all">${icons.automation} Check all feeds</button>`}
          </div>
          <div class="automation-list">${integrations.connectors.map((connector) => automationRow(connector, demo.readOnly)).join('')}</div>
        </section>
      </section>
    </main>
  `;

  attachAutomationActions();
  attachNavState();
}

function statCard(icon, label, value, delta, tone) {
  const direction = delta.startsWith('+') ? 'positive' : 'negative';
  return `<section class="stat-card"><div class="icon ${tone}">${icon}</div><div><p>${label}</p><strong>${value}</strong></div><span class="delta ${direction}">${delta}</span></section>`;
}

function businessCard(business) {
  const margin = business.dailyRevenue ? Math.round((business.dailyProfit / business.dailyRevenue) * 1000) / 10 : 0;
  const kpis = business.kpis || defaultKpis(business.id);
  return `
    <article class="business-card">
      <div class="business-card-header"><div class="icon neutral">${icons.finance}</div><span class="pill ${safeStatus(business.status)}">${business.status}</span></div>
      <h3>${business.name}</h3>
      <p>${business.type || 'Business unit'}</p>
      <div class="money-row"><span>Revenue <strong>${money(business.dailyRevenue)}</strong></span><span>Profit <strong class="${business.dailyProfit < 0 ? 'loss' : ''}">${money(business.dailyProfit)}</strong></span></div>
      <div class="progress-track"><span style="width:${Math.max(8, Math.min(100, margin + 40))}%"></span></div>
      <div class="kpi-list">${kpis.map((kpi) => `<span>${kpi}</span>`).join('')}</div>
    </article>
  `;
}

function dentalRow(site) {
  return `<div class="table-row"><span>${site.clinic}</span><span class="${site.appointments < site.appointmentTarget ? 'warn' : ''}">${site.appointments}/${site.appointmentTarget}</span><span>${site.patientsPerSession}</span><span class="${site.udaPercent < 90 ? 'warn' : 'good'}">${site.udaPercent}%</span></div>`;
}

function financeRow(row) {
  const label = row.period === 'month' ? 'This month' : row.period === 'today' ? 'Today' : row.period;
  return `<div class="finance-row"><strong>${label}</strong><span>Revenue ${money(row.revenue)}</span><span>Costs ${money(row.costs)}</span><span class="good">Profit ${money(row.profit)}</span></div>`;
}

function marketingRow(row) {
  return `<div class="marketing-row"><div><strong>${row.channel}</strong><span>${row.leads} leads · ${row.conversionRate}% conversion · £${row.costPerLead} CPL</span></div><div class="bar"><span style="width:${row.conversionRate * 3}%"></span></div></div>`;
}

function complianceRow(row) {
  const status = row.completionRate >= 90 ? 'good' : row.completionRate >= 80 ? 'watch' : 'warn';
  return `
    <div class="compliance-row">
      <div>
        <strong>${row.manager}</strong>
        <span>${row.site} · ${row.completed}/${row.total} tasks · ${row.overdue} overdue</span>
      </div>
      <div class="compliance-meter">
        <span class="${status}">${row.completionRate}%</span>
        <div class="bar"><span class="${status}" style="width:${row.completionRate}%"></span></div>
      </div>
    </div>
  `;
}

function automationRow(connector, readOnlyDemo = false) {
  const statusClass = connector.credentialsReady ? 'ready' : 'waiting';
  const statusText = connector.credentialsReady ? 'Ready' : 'Waiting for keys';
  const pulls = connector.pulls.slice(0, 4).join(' · ');
  const missing = connector.missingKeys?.length ? connector.missingKeys.join(', ') : 'Credentials present';
  const result = connector.lastResult?.message || missing;

  return `
    <div class="automation-row">
      <div class="automation-source">
        <span class="priority ${connector.priority.toLowerCase()}">${connector.priority}</span>
        <strong>${connector.name}</strong>
        <span>${connector.category} · ${connector.cadence}</span>
      </div>
      <div class="automation-detail">
        <span>${pulls}</span>
        <small>${result}</small>
      </div>
      <div class="automation-control">
        <span class="status-chip ${statusClass}">${statusText}</span>
        <button type="button" ${readOnlyDemo ? 'disabled' : `data-sync-source="${connector.id}"`}>${readOnlyDemo ? 'Demo only' : connector.credentialsReady ? 'Sync now' : 'Check keys'}</button>
      </div>
    </div>
  `;
}

function attachAutomationActions() {
  document.querySelectorAll('[data-sync-source]').forEach((button) => {
    button.addEventListener('click', async () => {
      const source = button.dataset.syncSource;
      button.disabled = true;
      button.textContent = 'Checking...';

      try {
        await fetch(`/api/integrations/sync?source=${encodeURIComponent(source)}`, { method: 'POST' });
        const freshData = await loadData();
        renderDashboard(freshData);
        window.location.hash = 'automations';
      } catch {
        button.textContent = 'Try again';
        button.disabled = false;
      }
    });
  });
}

let navStateAttached = false;

function updateActiveNav() {
  const hash = window.location.hash || '#overview';
  document.querySelectorAll('nav a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === hash);
  });
}

function attachNavState() {
  updateActiveNav();

  if (navStateAttached) {
    return;
  }

  window.addEventListener('hashchange', updateActiveNav);
  navStateAttached = true;
}

function defaultKpis(id) {
  const map = {
    dental: ['UDA 91%', 'Private conversion 22%', 'Hygiene fill 87%'],
    medical: ['Utilisation 84%', 'DNA 4.8%', 'Avg value £186'],
    'sofina-ai': ['MRR £76k', 'Churn 2.1%', 'CAC payback 4.3m'],
    'vr-product': ['Pipeline £44k', 'Demo close 14%', 'Returns 3.4%'],
    'property-investments': ['Occupancy 96%', 'Yield 7.4%', 'Cash reserve £180k']
  };
  return map[id] || ['Revenue tracked', 'Costs tracked', 'Profit tracked'];
}

loadData().then(renderDashboard);
