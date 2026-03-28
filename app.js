const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

let connectionStatus = false;
let qrCodeData = null;

// API endpoints
app.get('/api/status', (req, res) => {
    res.json({ connected: connectionStatus });
});

app.post('/api/connect', (req, res) => {
    res.json({ 
        success: true, 
        message: 'Connection initiated'
    });
});

app.get('/api/qr', (req, res) => {
    res.json({ qr: qrCodeData });
});

// Simple HTML response
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>WhatsApp Bot</title>
            <style>
                body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; }
                input { padding: 10px; width: 100%; margin-bottom: 10px; }
                button { padding: 10px; background: #25D366; color: white; border: none; width: 100%; cursor: pointer; }
                #status { padding: 10px; margin: 20px 0; border-radius: 5px; text-align: center; font-weight: bold; }
                .connected { background: #90EE90; }
                .disconnected { background: #FFB6C6; }
            </style>
        </head>
        <body>
            <h1>🔗 WhatsApp Bot Pairing</h1>
            <input type="text" id="phone" placeholder="Enter phone number (e.g., 92)">
            <button onclick="connect()">Generate Code</button>
            <div id="status" class="disconnected">Status: Disconnected</div>
            
            <script>
                async function connect() {
                    const phone = document.getElementById('phone').value;
                    if (!phone) { alert('Enter phone number'); return; }
                    
                    const res = await fetch('/api/connect', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ phone })
                    });
                    
                    const data = await res.json();
                    if (data.success) {
                        checkStatus();
                    }
                }
                
                async function checkStatus() {
                    const res = await fetch('/api/status');
                    const data = await res.json();
                    const statusDiv = document.getElementById('status');
                    
                    if (data.connected) {
                        statusDiv.textContent = '✓ Connected Successfully';
                        statusDiv.className = 'connected';
                    } else {
                        statusDiv.textContent = '✗ Disconnected';
                        statusDiv.className = 'disconnected';
                        setTimeout(checkStatus, 2000);
                    }
                }
                
                setInterval(checkStatus, 2000);
            </script>
        </body>
        </html>
    `);
});

app.listen(8080, () => {
    console.log('Web UI running on port 8080');
});

module.exports = app;
