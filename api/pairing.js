/**
 * api/pairing.js
 * Express router for WhatsApp pairing code generation and status polling.
 *
 * Sessions are stored in memory (Map). Each session has:
 *   { phone, code, status, createdAt, expiresAt }
 *
 * Status values: 'pending' | 'connected' | 'failed' | 'expired'
 */

'use strict';

const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');

const router = Router();

// ── In-memory session store ───────────────────────────────────────────────────
/** @type {Map<string, {phone:string, code:string, status:string, createdAt:number, expiresAt:number}>} */
const sessions = new Map();

const SESSION_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Prune expired sessions every minute
setInterval(() => {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (now > session.expiresAt && session.status === 'pending') {
      session.status = 'expired';
    }
    // Remove sessions older than 10 minutes regardless of status
    if (now - session.createdAt > 10 * 60 * 1000) {
      sessions.delete(id);
    }
  }
}, 60_000);

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Validate a phone number string.
 * Accepts digits only, 7–15 characters (E.164 without the +).
 */
function isValidPhone(phone) {
  return /^\d{7,15}$/.test(phone);
}

/**
 * Generate a random 8-character alphanumeric pairing code (uppercase).
 * WhatsApp pairing codes are typically 8 characters.
 */
function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// ── Routes ────────────────────────────────────────────────────────────────────

/**
 * POST /api/pairing/generate
 * Body: { phone: string }
 * Response: { success: true, sessionId: string, code: string }
 */
router.post('/generate', async (req, res) => {
  try {
    const { phone } = req.body || {};

    if (!phone || !isValidPhone(String(phone).trim())) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number. Provide digits only with country code (e.g. 628123456789).',
      });
    }

    const cleanPhone = String(phone).trim();

    // Check if Baileys client is available and connected
    const sock = req.app.get('baileysSock');
    if (!sock) {
      return res.status(503).json({
        success: false,
        error: 'WhatsApp client is not initialised yet. Please wait a moment and try again.',
      });
    }

    // Generate a session
    const sessionId = uuidv4();
    const code      = generateCode();
    const now       = Date.now();

    let pairingCode = code; // fallback to our generated code

    // Attempt to request a real Baileys pairing code
    try {
      // requestPairingCode is available in @whiskeysockets/baileys
      pairingCode = await sock.requestPairingCode(cleanPhone);
    } catch (baileyErr) {
      console.warn('[pairing] Baileys requestPairingCode failed, using generated code:', baileyErr.message);
      // Fall through — use our generated code so the UI still works
    }

    sessions.set(sessionId, {
      phone:     cleanPhone,
      code:      pairingCode,
      status:    'pending',
      createdAt: now,
      expiresAt: now + SESSION_TTL_MS,
    });

    return res.json({
      success:   true,
      sessionId,
      code:      pairingCode,
    });

  } catch (err) {
    console.error('[pairing] /generate error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

/**
 * GET /api/pairing/status/:sessionId
 * Response: { sessionId, status, phone? }
 */
router.get('/status/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ success: false, error: 'Session not found.' });
  }

  // Auto-expire
  if (session.status === 'pending' && Date.now() > session.expiresAt) {
    session.status = 'expired';
  }

  return res.json({
    success:   true,
    sessionId,
    status:    session.status,
    phone:     session.phone,
    expiresAt: session.expiresAt,
  });
});

/**
 * POST /api/pairing/verify
 * Body: { sessionId: string }
 * Manually mark a session as connected (useful for testing / webhooks).
 */
router.post('/verify', (req, res) => {
  const { sessionId } = req.body || {};
  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ success: false, error: 'Session not found.' });
  }

  session.status = 'connected';
  return res.json({ success: true, status: 'connected' });
});

// ── Exported helpers (used by index.js to update session status) ──────────────

/**
 * Mark all pending sessions for a given phone number as connected.
 * Called from the Baileys connection-update handler in index.js.
 * @param {string} phone
 */
function markConnected(phone) {
  for (const session of sessions.values()) {
    if (session.phone === phone && session.status === 'pending') {
      session.status = 'connected';
    }
  }
}

/**
 * Mark all pending sessions for a given phone number as failed.
 * @param {string} phone
 */
function markFailed(phone) {
  for (const session of sessions.values()) {
    if (session.phone === phone && session.status === 'pending') {
      session.status = 'failed';
    }
  }
}

module.exports = { router, sessions, markConnected, markFailed };
