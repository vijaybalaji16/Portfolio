import express from 'express';
import fs from 'fs';
import path from 'path';
import type { PortfolioData } from './src/types/portfolio.ts';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const PORTFOLIO_FILE = path.join(DATA_DIR, 'portfolio.json');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

interface InquiryPayload {
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
}

app.use(express.json({ limit: '25mb' }));

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

ensureDataDir();
app.use('/uploads', express.static(UPLOADS_DIR));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/upload', (req, res) => {
  try {
    const { filename, base64 } = req.body as {
      filename?: string;
      base64?: string;
    };
    if (!filename || !base64) {
      res.status(400).json({ error: 'Filename and file content are required.' });
      return;
    }

    const ext = path.extname(filename).toLowerCase();
    const allowedExts = ['.pdf', '.doc', '.docx', '.ppt', '.pptx'];
    if (!allowedExts.includes(ext)) {
      res.status(400).json({ error: 'Supported formats: PDF, DOC, DOCX, PPT, PPTX.' });
      return;
    }

    ensureDataDir();
    const base = path
      .basename(filename, ext)
      .replace(/[^a-zA-Z0-9_-]+/g, '_')
      .slice(0, 60);
    const savedName = `${base}_${Date.now()}${ext}`;
    const cleanBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
    fs.writeFileSync(path.join(UPLOADS_DIR, savedName), Buffer.from(cleanBase64, 'base64'));

    res.status(201).json({
      ok: true,
      url: `/uploads/${savedName}`,
      filename,
    });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Failed to store uploaded project document.' });
  }
});

app.get('/api/portfolio', (_req, res) => {
  try {
    if (!fs.existsSync(PORTFOLIO_FILE)) {
      res.json({ portfolio: null });
      return;
    }
    const raw = fs.readFileSync(PORTFOLIO_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as PortfolioData;
    res.json({ portfolio: parsed });
  } catch (err) {
    console.error('Failed to read portfolio.json:', err);
    res.status(500).json({ error: 'Unable to load saved portfolio data.' });
  }
});

app.put('/api/portfolio', (req, res) => {
  try {
    const body = req.body as { portfolio?: PortfolioData };
    if (!body?.portfolio?.profile?.name) {
      res.status(400).json({ error: 'Portfolio profile name is required.' });
      return;
    }
    ensureDataDir();
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(body.portfolio, null, 2), 'utf-8');
    res.json({ ok: true, portfolio: body.portfolio });
  } catch (err) {
    console.error('Failed to save portfolio.json:', err);
    res.status(500).json({ error: 'Unable to save portfolio data.' });
  }
});

app.delete('/api/portfolio', (_req, res) => {
  try {
    if (fs.existsSync(PORTFOLIO_FILE)) {
      fs.unlinkSync(PORTFOLIO_FILE);
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('Failed to reset portfolio.json:', err);
    res.status(500).json({ error: 'Unable to reset portfolio data.' });
  }
});

app.post('/api/inquiries', (req, res) => {
  try {
    const { name, email, company, message } = req.body as Partial<InquiryPayload>;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      res.status(400).json({ error: 'Name, email, and message are required.' });
      return;
    }
    ensureDataDir();
    let existing: InquiryPayload[] = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      existing = JSON.parse(fs.readFileSync(INQUIRIES_FILE, 'utf-8')) as InquiryPayload[];
    }
    const entry: InquiryPayload = {
      name: name.trim(),
      email: email.trim(),
      company: company?.trim() || '',
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    existing.unshift(entry);
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
    res.status(201).json({ ok: true, inquiry: entry });
  } catch (err) {
    console.error('Failed to save inquiry:', err);
    res.status(500).json({ error: 'Unable to record inquiry.' });
  }
});

async function startServer(): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});
