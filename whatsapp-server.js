const express = require('express');
const path = require('path');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const logger = pino();

let sock = null;
let qrCode = null;
let connectionStatus = false;
let pairingCode = null;

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get QR Code
app.get('/api/qr', (req, res) => {
    res.json({ qr: qrCode, code: pairingCode });
});

// Get Status
app.get('/api/status', (req, res) => {
    res.json({ connected: connectionStatus, code: pairingCode });
});

// Connect
app.post('/api/connect', async (req, res) => {
    const { phone } = req.body;
    
    try {
        const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
        const { version } = await fetchLatestBaileysVersion();
        
        sock = makeWASocket({
            version,
            logger,
            printQRInTerminal: false,
            auth: state,
            browser: ['Chrome', 'Chrome', '120.0.0.0']
        });

        sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect, qr } = update;
            
            if (qr) {
                qrCode = qr;
                console.log('QR Code generated');
            }
            
            if (update.receivedPendingNotifications) {
                console.log('Received pending notifications');
            }
            
            if (connection === 'connecting') {
                console.log('Connecting...');
            }
            
            if (connection === 'open') {
                connectionStatus = true;
                console.log('✓ Connected to WhatsApp');
            }
            
            if (connection === 'close') {
                connectionStatus = false;
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('Connection closed. Reconnect:', shouldReconnect);
            }
        });

        sock.ev.on('creds.update', saveCreds);

        res.json({ 
            success: true, 
            message: 'Connection initiated. Scan QR code or wait for pairing code.'
        });
    } catch (error) {
        console.error('Connection error:', error);
        res.json({ 
            success: false, 
            error: error.message 
        });
    }
});

app.listen(8080, () => {
    console.log('WhatsApp Web Server running on port 8080');
});
