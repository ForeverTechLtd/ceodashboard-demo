import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dashboardData } from './services/dashboardData.js';
import { getIntegrationStatus, startAutomationScheduler, syncIntegrations } from './services/integrationAutomation.js';

const port = process.env.PORT || 4000;
const host = process.env.HOST || (process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1');
const demoMode = process.env.DEMO_MODE !== 'false';
const rootDir = fileURLToPath(new URL('../../', import.meta.url));
const frontendDir = join(rootDir, 'frontend');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml'
};

function json(res, body, status = 200) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify(body));
}

function noContent(res) {
  res.writeHead(204, {
    'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end();
}

function demoMetadata() {
  return {
    enabled: demoMode,
    label: 'Demo prototype',
    message: 'Sample data only. No patient, client, staff, or real financial records are included.',
    readOnly: demoMode
  };
}

async function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const requestPath = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = normalize(join(frontendDir, requestPath));

  if (!filePath.startsWith(frontendDir)) {
    json(res, { error: 'Invalid path' }, 400);
    return;
  }

  try {
    const file = await readFile(filePath);
    res.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath)] || 'application/octet-stream',
      'Cache-Control': requestPath === '/index.html' ? 'no-store' : 'public, max-age=3600'
    });
    res.end(file);
  } catch {
    const fallback = await readFile(join(frontendDir, 'index.html'));
    res.writeHead(200, {
      'Content-Type': contentTypes['.html'],
      'Cache-Control': 'no-store'
    });
    res.end(fallback);
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    noContent(res);
    return;
  }

  if (url.pathname === '/health') {
    json(res, { ok: true, service: 'ceo-dashboard-api' });
    return;
  }

  if (url.pathname === '/api/dashboard') {
    json(res, {
      ...dashboardData,
      demo: demoMetadata(),
      integrations: getIntegrationStatus()
    });
    return;
  }

  if (url.pathname === '/api/businesses') {
    json(res, dashboardData.businesses);
    return;
  }

  if (url.pathname === '/api/dental') {
    json(res, dashboardData.dental);
    return;
  }

  if (url.pathname === '/api/finance') {
    json(res, {
      filters: {
        business: url.searchParams.get('business') || 'all',
        view: url.searchParams.get('view') || 'daily'
      },
      rows: dashboardData.finance
    });
    return;
  }

  if (url.pathname === '/api/marketing') {
    json(res, dashboardData.marketing);
    return;
  }

  if (url.pathname === '/api/compliance') {
    json(res, dashboardData.compliance);
    return;
  }

  if (url.pathname === '/api/alerts') {
    json(res, dashboardData.alerts);
    return;
  }

  if (url.pathname === '/api/integrations') {
    json(res, getIntegrationStatus());
    return;
  }

  if (url.pathname === '/api/integrations/sync') {
    if (req.method !== 'POST') {
      json(res, { error: 'Use POST to run an integration sync.' }, 405);
      return;
    }

    const source = url.searchParams.get('source') || 'all';
    const result = await syncIntegrations(source, 'manual');
    json(res, result, result.ok ? 200 : 202);
    return;
  }

  await serveStatic(req, res);
});

startAutomationScheduler();

server.listen(port, host, () => {
  const displayHost = host === '0.0.0.0' ? 'localhost' : host;
  console.log(`CEO dashboard running on http://${displayHost}:${port}`);
});
