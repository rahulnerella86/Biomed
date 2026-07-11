const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend static assets from public folder
app.use(express.static(path.join(__dirname, '../public')));

// Simulated system state
let systemState = {
  esp32Connected: true,
  ledOn: false,
  ledBrightness: 50,
  wifiStreaming: false,
  bleStreaming: false,
  teleconsultActive: false,
  latestDiagnosis: null,
  latestConfidence: 0
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ ok: true, status: "healthy", timestamp: new Date() });
});

// Get system state
app.get('/api/status', (req, res) => {
  res.json(systemState);
});

// Control LED
app.post('/api/led', (req, res) => {
  const { on, brightness } = req.body;
  if (on !== undefined) systemState.ledOn = on;
  if (brightness !== undefined) systemState.ledBrightness = Math.max(0, Math.min(100, brightness));
  
  res.json({
    success: true,
    message: `LED ${systemState.ledOn ? 'turned ON with brightness ' + systemState.ledBrightness + '%' : 'turned OFF'}.`,
    state: systemState
  });
});

// Start/Stop Streaming
app.post('/api/stream', (req, res) => {
  const { type, active } = req.body; // type: 'wifi' | 'ble'
  if (type === 'wifi') {
    systemState.wifiStreaming = !!active;
  } else if (type === 'ble') {
    systemState.bleStreaming = !!active;
  }
  
  res.json({
    success: true,
    message: `${type.toUpperCase()} stream ${active ? 'started' : 'stopped'}.`,
    state: systemState
  });
});

// Teleconsultation session toggle
app.post('/api/teleconsult', (req, res) => {
  const { active } = req.body;
  systemState.teleconsultActive = !!active;
  res.json({
    success: true,
    message: `Teleconsultation session ${active ? 'connected' : 'disconnected'}.`,
    state: systemState
  });
});

// Mock ML TFLite Inference
app.post('/api/inference', (req, res) => {
  const findings = [
    { label: "Normal Ear Canal", confidence: 0.96 },
    { label: "Acute Otitis Media", confidence: 0.88 },
    { label: "Tympanic Membrane Perforation", confidence: 0.91 },
    { label: "Cerumen Impaction (Earwax)", confidence: 0.94 },
    { label: "Otitis Externa (Swimmer's Ear)", confidence: 0.85 }
  ];
  
  // Pick a random diagnostic finding
  const selected = findings[Math.floor(Math.random() * findings.length)];
  systemState.latestDiagnosis = selected.label;
  systemState.latestConfidence = selected.confidence;
  
  res.json({
    success: true,
    finding: selected.label,
    confidence: selected.confidence,
    state: systemState
  });
});

module.exports = app;


