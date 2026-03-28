const express = require('express');
const app = express();

app.use(express.json());

let pairingCode = null;
let isConnected = false;

// Serve simple UI
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>WhatsApp Pairing</title>
            <style>
                body { font-family: Arial; text-align: center; padding: 50px; }
                .box { max-width: 400px; margin: 0 auto; border: 1px solid #ddd; padding: 30px; border-radius: 10px; }
                input { padding: 10px; width: 100%; margin: 10px 0; }
                button { padding: 10px 20px; background: #25D366; color: white; border: none; cursor: pointer; width: 100%; }
                #code { font-size: 40px; font-weight: bold; color: #25D366; margin: 20px 0; letter-spacing: 5px; }
                #status { padding: 10px; margin: 10px 0; border-radius: 5px; }
                .connected { background: #90EE90; }
                .disconnected { background: #FFB6C6; }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>WhatsApp Pairing</h1>
                <input type="text" id="phone" placeholder="Phone number">
                <button onclick="getPairingCode()">Get Pairing Code</button>
                <div id="code"></div>
                <div id="status" class="disconnected">Disconnected</div>
            </div>
            
            <script>
                async function getPairingCode() {
                    const phone = document.getElementById('phone').value;
                    const res = await fetch('/api/pairing-code?phone=' + phone);
                    const data = await res.json();
                    
                    if (data.code) {
                        document.getElementById('code').textContent = data.code;
                    } else {
                        document.getElementById('code').textContent = 'Waiting for code...';
                    }
                    
                    checkStatus();
                }
                
                async function checkStatus() {
                    const res = await fetch('/api/status');
                    const data = await res.json();
                    const statusDiv = document.getElementById('status');
                    
                    if (data.connected) {
                        statusDiv.textContent = '✓ Connected';
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

// API: Get pairing code
app.get('/api/pairing-code', (req, res) => {
    res.json({ code: pairingCode || 'Generating...' });
});

// API: Get status
app.get('/api/status', (req, res) => {
    res.json({ connected: isConnected });
});

// Export functions to update from index.js
module.exports = {
    app,
    setPairingCode: (code) => { pairingCode = code; },
    setConnected: (status) => { isConnected = status; }
};

// Start server
app.listen(8080, () => console.log('Pairing UI on port 8080'));
