import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing (CORS) for external frontend environments (e.g. Netlify)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Lazy-loaded Supabase Client for backend sync
let supabaseClient: any = null;
function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL || '';
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';
    if (url && key) {
      supabaseClient = createClient(url, key);
    }
  }
  return supabaseClient;
}

// Lazy-loaded Nodemailer SMTP Transporter
let mailTransporter: any = null;
function getMailTransporter() {
  if (!mailTransporter) {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER || 'naraartficalintel@gmail.com';
    const pass = process.env.SMTP_PASS || '';

    // Create transporter (even with empty pass to allow fallback logging instead of crash)
    mailTransporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });
  }
  return mailTransporter;
}

// Lazy-loaded Gemini API Client (per guidelines)
let geminiClient: any = null;
function getGeminiClient() {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not defined.');
    }
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

// Ensure local storage folder or bookings file exists
const BOOKINGS_FILE = path.join(process.cwd(), 'bookings.json');
if (!fs.existsSync(BOOKINGS_FILE)) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify([], null, 2));
}

// --- API ENDPOINTS ---

// 1. API Health Check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    supabaseActive: Boolean(getSupabase()),
    smtpActive: Boolean(process.env.SMTP_PASS),
    geminiActive: Boolean(process.env.GEMINI_API_KEY),
  });
});

// 2. Booking Consultations & Scheduling System
app.post('/api/book', async (req, res) => {
  const { name, email, booking_date, booking_time, session_type, nara_name } = req.body;

  // Basic Validation
  if (!name || !email || !booking_date || !booking_time || !session_type) {
    return res.status(400).json({ error: 'Missing required booking trait fields.' });
  }

  const bookingId = `bk-${Date.now()}`;
  const bookingData = {
    id: bookingId,
    name,
    email,
    booking_date,
    booking_time,
    session_type,
    nara_name: nara_name || 'Nara',
    created_at: new Date().toISOString(),
  };

  try {
    // A. Local persistence fallback (robust local storage in container)
    let bookingsList = [];
    try {
      const fileData = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
      bookingsList = JSON.parse(fileData);
    } catch (e) {
      bookingsList = [];
    }
    bookingsList.unshift(bookingData);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookingsList, null, 2));

    // B. Supabase database sync if available
    const db = getSupabase();
    if (db) {
      try {
        const { error } = await db.from('bookings').insert({
          name,
          email,
          booking_date,
          booking_time,
          session_type,
          nara_name: nara_name || 'Nara',
        });
        if (error) {
          console.warn('Database booking insert warning:', error.message);
        }
      } catch (dbErr: any) {
        console.warn('Database connection warning:', dbErr.message);
      }
    }

    // C. Email Routing via Nodemailer
    const adminEmail = process.env.SMTP_USER || 'naraartficalintel@gmail.com';
    const smtpPass = process.env.SMTP_PASS;

    if (smtpPass) {
      const transporter = getMailTransporter();

      // Custom conference room / calendar link
      const zoomLink = `https://zoom.us/j/9082341253?pwd=NARA-STUDIO-${bookingId}`;

      // 1. Send confirmation email to the Client
      const clientMailOptions = {
        from: `"Nara Configuration Studio" <${adminEmail}>`,
        to: email,
        subject: `Your Briefing Consultation with ${nara_name || 'Nara'} is Confirmed`,
        html: `
          <div style="font-family: sans-serif; color: #1c1c1c; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e3dfd5; border-radius: 8px;">
            <h2 style="font-family: serif; color: #5a5a40;">Scheduling Confirmation</h2>
            <p>Hello ${name},</p>
            <p>Your AI Companion briefing and review consultation has been successfully scheduled. Here are the session details:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">Session Focus:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;">${session_type}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">Scheduled For:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;">${booking_date} at ${booking_time} (UTC)</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">AI Companion Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;">${nara_name || 'Nara'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">Zoom Video Room:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;"><a href="${zoomLink}" style="color: #5a5a40; font-weight: bold;">Join Video Call</a></td>
              </tr>
            </table>
            <p>We look forward to optimizing your system's neural configuration.</p>
            <p style="font-size: 11px; color: #75736D; margin-top: 30px;">This email is auto-routed via Nara Secure Booking Relay.</p>
          </div>
        `,
      };

      // 2. Send notification email to the Admin
      const adminMailOptions = {
        from: `"Nara Booking Relay" <${adminEmail}>`,
        to: adminEmail,
        subject: `New Scheduled Briefing: ${name} (${session_type})`,
        html: `
          <div style="font-family: sans-serif; color: #1c1c1c; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e3dfd5; border-radius: 8px;">
            <h2 style="font-family: serif; color: #5a5a40;">New Configuration Consultation Scheduled</h2>
            <p>An operator has scheduled a live session on the platform:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">Client Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">Client Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">Session Focus:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;">${session_type}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">Schedule Slot:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;">${booking_date} at ${booking_time} (UTC)</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5; font-weight: bold;">Active Companion Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #FAF9F5;">${nara_name || 'Nara'}</td>
              </tr>
            </table>
            <p>Please update your Google Calendar and prepare the cognitive review report.</p>
          </div>
        `,
      };

      // Dispatch both emails in background
      transporter.sendMail(clientMailOptions).catch((e: any) => console.error('Client Email Error:', e.message));
      transporter.sendMail(adminMailOptions).catch((e: any) => console.error('Admin Email Error:', e.message));
    } else {
      console.warn('SMTP pass is not defined. Email dispatch bypassed; booking completed locally.');
    }

    res.json({ success: true, booking: bookingData });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error processing the consultation request.' });
  }
});

// 3. Update Custom Name endpoint
app.post('/api/update-booking-name', async (req, res) => {
  const { booking_id, nara_name } = req.body;
  if (!booking_id || !nara_name) {
    return res.status(400).json({ error: 'Missing booking_id or nara_name parameters.' });
  }

  try {
    // Update locally
    let bookingsList = [];
    if (fs.existsSync(BOOKINGS_FILE)) {
      bookingsList = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf-8'));
      bookingsList = bookingsList.map((b: any) => {
        if (b.id === booking_id) {
          b.nara_name = nara_name;
        }
        return b;
      });
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookingsList, null, 2));
    }

    // Update in Supabase
    const db = getSupabase();
    if (db) {
      const { error } = await db
        .from('bookings')
        .update({ nara_name })
        .eq('id', booking_id);
      if (error) console.warn('Supabase update warning:', error.message);
    }

    res.json({ success: true, booking_id, nara_name });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error updating companion name.' });
  }
});

// 3.5. Environment Settings Management API
app.get('/api/settings', (_req, res) => {
  try {
    const envPath = path.join(process.cwd(), '.env');
    let envContent = '';
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf-8');
    }

    const parseEnv = (content: string) => {
      const vars: Record<string, string> = {};
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const firstEqual = trimmed.indexOf('=');
          if (firstEqual > 0) {
            const key = trimmed.slice(0, firstEqual).trim();
            let value = trimmed.slice(firstEqual + 1).trim();
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            vars[key] = value;
          }
        }
      }
      return vars;
    };

    const envVars = parseEnv(envContent);

    const config = {
      SUPABASE_URL: envVars.SUPABASE_URL || process.env.SUPABASE_URL || '',
      SUPABASE_ANON_KEY: envVars.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '',
      SUPABASE_SERVICE_ROLE_KEY: envVars.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '',
      SMTP_HOST: envVars.SMTP_HOST || process.env.SMTP_HOST || '',
      SMTP_PORT: envVars.SMTP_PORT || process.env.SMTP_PORT || '587',
      SMTP_USER: envVars.SMTP_USER || process.env.SMTP_USER || '',
      SMTP_PASS: envVars.SMTP_PASS || process.env.SMTP_PASS || '',
      GEMINI_API_KEY: envVars.GEMINI_API_KEY || process.env.GEMINI_API_KEY || ''
    };

    res.json(config);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error fetching environment settings.' });
  }
});

app.post('/api/settings', async (req, res) => {
  const settings = req.body;
  
  try {
    const envPath = path.join(process.cwd(), '.env');
    let envLines: string[] = [];
    if (fs.existsSync(envPath)) {
      envLines = fs.readFileSync(envPath, 'utf-8').split('\n');
    }

    const updatedKeys = new Set(Object.keys(settings));
    const newLines: string[] = [];

    for (const line of envLines) {
      const trimmed = line.trim();
      let matched = false;
      if (trimmed && !trimmed.startsWith('#')) {
        const firstEqual = trimmed.indexOf('=');
        if (firstEqual > 0) {
          const key = trimmed.slice(0, firstEqual).trim();
          if (updatedKeys.has(key)) {
            const val = settings[key];
            newLines.push(`${key}="${val}"`);
            matched = true;
            updatedKeys.delete(key);
          }
        }
      }
      if (!matched) {
        newLines.push(line);
      }
    }

    if (updatedKeys.size > 0) {
      newLines.push('\n# Dynamically added settings via UI');
      for (const key of updatedKeys) {
        const val = settings[key];
        newLines.push(`${key}="${val}"`);
      }
    }

    fs.writeFileSync(envPath, newLines.join('\n'));

    for (const key of Object.keys(settings)) {
      process.env[key] = settings[key];
      if (key === 'SUPABASE_URL') {
        process.env.VITE_SUPABASE_URL = settings[key];
      }
      if (key === 'SUPABASE_ANON_KEY') {
        process.env.VITE_SUPABASE_ANON_KEY = settings[key];
      }
    }

    supabaseClient = null;
    mailTransporter = null;
    geminiClient = null;

    res.json({ success: true, message: 'Settings saved successfully and runtime engine reloaded.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error saving environment settings.' });
  }
});

// 4. Gemini API Smart Cognitive Blueprint Generation (Gemini 3.5 Flash)
app.post('/api/gemini/generate', async (req, res) => {
  const { configuration } = req.body;
  if (!configuration) {
    return res.status(400).json({ error: 'Missing traits configuration payload.' });
  }

  try {
    const ai = getGeminiClient();
    const prompt = `
      You are Nara's system auditor and cognitive neural architect.
      Analyze the following active companion configuration parameters and generate a highly custom, professional, and detailed "AI Companion Cognitive Audit & Development Blueprint".
      Keep the tone professional, insightful, and visionary, reflecting the high craftsmanship of Nara.

      Configuration Trait Parameters:
      - Custom Name: "${configuration.nara_name}"
      - Cognitive Role: "${configuration.companion_type}"
      - Evolution Level: Stage ${configuration.avatar_level}
      - Subscription Plan: "${configuration.plan_tier}"
      - Optimization Goals: ${JSON.stringify(configuration.goals)}
      - Personality Profile: "${configuration.personality}"
      - Conversation Tone: "${configuration.conversation_style}"
      - Bridged Workspaces: ${JSON.stringify(configuration.connected_services)}

      Generate the blueprint in well-structured plain text with clear labeled sections. Discuss:
      1. COGNITIVE SYNTHESIS SUMMARY: A holistic analysis of the personality and role combination.
      2. OPTIMIZATION STRATEGY: How the selected goals are achieved at Stage ${configuration.avatar_level} evolution.
      3. WORKSPACE INTEGRATION WORKFLOW: How the selected bridged services (${JSON.stringify(configuration.connected_services)}) can be leveraged.
      4. RECOMMENDATIONS: 2 tailored evolutionary steps to prepare the companion for its next level.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to process request through the Gemini Smart Engine.' });
  }
});

// --- VITE DEV / PRODUCTION STATIC ROUTING ---

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development environment -> use Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production environment -> serve static frontend files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NARA BACKEND] Server active on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

startServer();
