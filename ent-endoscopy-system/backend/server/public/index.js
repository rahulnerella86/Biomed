// Javascript Simulator Logic for ENT Endoscopy Dashboard

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const btnWifiStream = document.getElementById('btnWifiStream');
  const btnBleStream = document.getElementById('btnBleStream');
  const btnCapture = document.getElementById('btnCapture');
  const btnRunInference = document.getElementById('btnRunInference');
  const btnTeleconsult = document.getElementById('btnTeleconsult');
  const btnClearLogs = document.getElementById('btnClearLogs');
  
  const ledToggle = document.getElementById('ledToggle');
  const ledBrightness = document.getElementById('ledBrightness');
  const brightnessVal = document.getElementById('brightnessVal');
  
  const cameraCanvas = document.getElementById('cameraCanvas');
  const ctx = cameraCanvas.getContext('2d');
  const viewportOverlay = document.getElementById('viewportOverlay');
  const streamingBadge = document.getElementById('streamingBadge');
  
  const webrtcOverlay = document.getElementById('webrtcOverlay');
  const callTimer = document.getElementById('callTimer');
  
  const resultDisplay = document.getElementById('resultDisplay');
  const inferenceResult = document.getElementById('inferenceResult');
  const diagnosisLabel = document.getElementById('diagnosisLabel');
  const confidenceLabel = document.getElementById('confidenceLabel');
  const confidenceBar = document.getElementById('confidenceBar');
  
  const logsContainer = document.getElementById('logsContainer');

  // Simulation variables
  let isWifiStreaming = false;
  let isBleStreaming = false;
  let isTeleconsultActive = false;
  let isLedOn = false;
  let brightnessValue = 50;
  let streamAnimationId = null;
  let simulationFrame = 0;
  let callTimerInterval = null;
  let callSeconds = 0;
  let capturedImageData = null;

  // Sync state with server on load
  fetchState();

  // API Methods
  async function fetchState() {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      updateUIWithState(data);
      addLog('system', 'Synced state with Express backend server.');
    } catch (e) {
      addLog('system', 'Error syncing state with backend. Running in offline fallback mode.');
    }
  }

  function updateUIWithState(state) {
    // LED UI
    isLedOn = state.ledOn;
    brightnessValue = state.ledBrightness;
    ledToggle.checked = isLedOn;
    ledBrightness.value = brightnessValue;
    ledBrightness.disabled = !isLedOn;
    brightnessVal.textContent = `${brightnessValue}%`;

    // Wifi/BLE Streaming UI
    isWifiStreaming = state.wifiStreaming;
    isBleStreaming = state.bleStreaming;
    updateStreamingUI();

    // Teleconsult UI
    isTeleconsultActive = state.teleconsultActive;
    updateTeleconsultUI();
  }

  async function updateLedState(on, brightness) {
    try {
      const res = await fetch('/api/led', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ on, brightness })
      });
      const data = await res.json();
      addLog('hardware', data.message);
      updateUIWithState(data.state);
    } catch (e) {
      // Local fallback
      isLedOn = on;
      if (brightness !== undefined) brightnessValue = brightness;
      ledBrightness.disabled = !isLedOn;
      brightnessVal.textContent = `${brightnessValue}%`;
      addLog('hardware', `[Offline] LED ${isLedOn ? 'ON at ' + brightnessValue + '%' : 'OFF'}`);
    }
  }

  async function updateStreamState(type, active) {
    try {
      const res = await fetch('/api/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, active })
      });
      const data = await res.json();
      addLog('hardware', data.message);
      updateUIWithState(data.state);
    } catch (e) {
      // Local fallback
      if (type === 'wifi') isWifiStreaming = active;
      if (type === 'ble') isBleStreaming = active;
      updateStreamingUI();
      addLog('hardware', `[Offline] ${type.toUpperCase()} stream ${active ? 'started' : 'stopped'}`);
    }
  }

  async function updateTeleconsultState(active) {
    try {
      const res = await fetch('/api/teleconsult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active })
      });
      const data = await res.json();
      addLog('api', data.message);
      updateUIWithState(data.state);
    } catch (e) {
      isTeleconsultActive = active;
      updateTeleconsultUI();
      addLog('api', `[Offline] Teleconsultation session ${active ? 'connected' : 'disconnected'}`);
    }
  }

  // Streaming UI & Canvas Render
  function updateStreamingUI() {
    if (isWifiStreaming || isBleStreaming) {
      viewportOverlay.classList.add('hidden');
      btnCapture.disabled = false;
      
      if (isWifiStreaming) {
        streamingBadge.textContent = 'Wi-Fi Live';
        streamingBadge.className = 'badge streaming-badge wifi-active';
        btnWifiStream.textContent = 'Stop Wi-Fi Stream';
        btnBleStream.disabled = true;
      } else {
        streamingBadge.textContent = 'BLE Syncing';
        streamingBadge.className = 'badge streaming-badge ble-active';
        btnBleStream.textContent = 'Stop BLE Sync';
        btnWifiStream.disabled = true;
      }

      if (!streamAnimationId) {
        renderSimulatorLoop();
      }
    } else {
      viewportOverlay.classList.remove('hidden');
      btnCapture.disabled = true;
      streamingBadge.textContent = 'Idle';
      streamingBadge.className = 'badge streaming-badge';
      btnWifiStream.textContent = 'Start Wi-Fi Stream';
      btnBleStream.textContent = 'Start BLE Sync';
      btnWifiStream.disabled = false;
      btnBleStream.disabled = false;

      if (streamAnimationId) {
        cancelAnimationFrame(streamAnimationId);
        streamAnimationId = null;
      }
      clearCanvas();
    }
  }

  function clearCanvas() {
    ctx.fillStyle = '#050608';
    ctx.fillRect(0, 0, cameraCanvas.width, cameraCanvas.height);
  }

  // Draw simulated medical image inside ear canal
  function renderSimulatorLoop() {
    simulationFrame++;
    const width = cameraCanvas.width;
    const height = cameraCanvas.height;
    
    // Clear
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    // Canvas styling modifications based on LED brightness
    const baseBrightness = isLedOn ? brightnessValue / 100 : 0.02;

    if (baseBrightness > 0.05) {
      // 1. Draw Ear Canal Pink/Peach Ambient Background
      const ambientGrad = ctx.createRadialGradient(
        width/2, height/2, 10,
        width/2, height/2, width/2
      );
      ambientGrad.addColorStop(0, `rgba(220, 130, 120, ${baseBrightness})`);
      ambientGrad.addColorStop(0.5, `rgba(180, 80, 80, ${baseBrightness * 0.7})`);
      ambientGrad.addColorStop(1, `rgba(40, 10, 15, ${baseBrightness * 0.5})`);
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Ear Canal structures (ridges/wrinkles) with subtle drift
      const driftX = Math.sin(simulationFrame * 0.02) * 5;
      const driftY = Math.cos(simulationFrame * 0.015) * 5;
      const centerX = width/2 + driftX;
      const centerY = height/2 + driftY;

      // Draw Tympanic Membrane (Eardrum) - bluish-grey translucent disc
      ctx.save();
      ctx.beginPath();
      // Draw tilted oval
      ctx.ellipse(centerX - 10, centerY - 5, 80, 100, Math.PI / 6, 0, 2 * Math.PI);
      
      const membraneGrad = ctx.createRadialGradient(
        centerX - 20, centerY - 10, 5,
        centerX - 10, centerY - 5, 90
      );
      // Pearly gray, slightly transparent
      membraneGrad.addColorStop(0, `rgba(210, 215, 230, ${baseBrightness * 0.8})`);
      membraneGrad.addColorStop(0.3, `rgba(165, 175, 195, ${baseBrightness * 0.7})`);
      membraneGrad.addColorStop(0.8, `rgba(120, 100, 100, ${baseBrightness * 0.4})`);
      membraneGrad.addColorStop(1, `rgba(80, 30, 30, ${baseBrightness * 0.2})`);
      
      ctx.fillStyle = membraneGrad;
      ctx.fill();

      // Draw Malleus bone shadow (Umbo and Manubrium of malleus)
      ctx.beginPath();
      ctx.moveTo(centerX - 35, centerY - 45);
      ctx.lineTo(centerX - 10, centerY - 5);
      ctx.strokeStyle = `rgba(255, 245, 235, ${baseBrightness * 0.95})`;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Draw Light Reflex Cone (normal eardrum feature: bright reflection down-right)
      ctx.beginPath();
      ctx.moveTo(centerX - 10, centerY - 5);
      ctx.lineTo(centerX + 35, centerY + 55);
      ctx.lineTo(centerX + 5, centerY + 65);
      ctx.closePath();
      
      const reflexGrad = ctx.createRadialGradient(
        centerX - 10, centerY - 5, 2,
        centerX + 20, centerY + 30, 40
      );
      reflexGrad.addColorStop(0, `rgba(255, 255, 255, ${baseBrightness * 0.95})`);
      reflexGrad.addColorStop(1, `rgba(255, 255, 255, 0)`);
      ctx.fillStyle = reflexGrad;
      ctx.fill();

      ctx.restore();

      // 3. Draw Camera Viewport Circular Vignette (Scope tube)
      ctx.save();
      ctx.beginPath();
      ctx.arc(width/2, height/2, Math.min(width, height)/2 - 5, 0, 2*Math.PI);
      ctx.rect(width, 0, -width, height); // Inverse path to cut out outside
      ctx.fillStyle = '#050608';
      ctx.fill();
      ctx.restore();

      // Draw circular glare highlights on outer lens
      ctx.beginPath();
      ctx.arc(width/2, height/2, Math.min(width, height)/2 - 15, 0.2, 1.2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${baseBrightness * 0.15})`;
      ctx.lineWidth = 3;
      ctx.stroke();

      // 4. Overlay noise/grain for analog ESP32 camera simulation
      if (Math.random() > 0.3) {
        ctx.fillStyle = `rgba(255, 255, 255, 0.015)`;
        for (let i = 0; i < 400; i++) {
          const rx = Math.random() * width;
          const ry = Math.random() * height;
          ctx.fillRect(rx, ry, 1, 1);
        }
      }
    } else {
      // LED is OFF - draw absolute darkness except extremely minimal noise
      ctx.fillStyle = '#050608';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.006)';
      for (let i = 0; i < 200; i++) {
        ctx.fillRect(Math.random()*width, Math.random()*height, 1, 1);
      }
    }

    // Loop
    streamAnimationId = requestAnimationFrame(renderSimulatorLoop);
  }

  // Teleconsultation logic (WebRTC Call Simulator)
  function updateTeleconsultUI() {
    if (isTeleconsultActive) {
      webrtcOverlay.style.display = 'block';
      btnTeleconsult.textContent = 'Disconnect Call';
      btnTeleconsult.className = 'btn btn-block btn-secondary';
      
      // Start call timer
      callSeconds = 0;
      callTimer.textContent = '00:00';
      clearInterval(callTimerInterval);
      callTimerInterval = setInterval(() => {
        callSeconds++;
        const mins = Math.floor(callSeconds / 60).toString().padStart(2, '0');
        const secs = (callSeconds % 60).toString().padStart(2, '0');
        callTimer.textContent = `${mins}:${secs}`;
      }, 1000);
    } else {
      webrtcOverlay.style.display = 'none';
      btnTeleconsult.textContent = 'Start Teleconsult Session';
      btnTeleconsult.className = 'btn btn-block btn-primary';
      
      clearInterval(callTimerInterval);
      callTimerInterval = null;
    }
  }

  // Event Listeners
  btnWifiStream.addEventListener('click', () => {
    updateStreamState('wifi', !isWifiStreaming);
  });

  btnBleStream.addEventListener('click', () => {
    updateStreamState('ble', !isBleStreaming);
  });

  ledToggle.addEventListener('change', (e) => {
    updateLedState(e.target.checked, brightnessValue);
  });

  ledBrightness.addEventListener('input', (e) => {
    brightnessValue = parseInt(e.target.value);
    brightnessVal.textContent = `${brightnessValue}%`;
  });

  ledBrightness.addEventListener('change', () => {
    updateLedState(isLedOn, brightnessValue);
  });

  btnCapture.addEventListener('click', () => {
    // Save image state in memory for ML input display
    capturedImageData = ctx.getImageData(0, 0, cameraCanvas.width, cameraCanvas.height);
    addLog('hardware', 'Captured frame snapshot stored in local memory.');
    
    // Enable run inference
    btnRunInference.disabled = false;
    
    // Flash effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(0, 0, cameraCanvas.width, cameraCanvas.height);
    
    // Reset status display
    resultDisplay.innerHTML = `
      <div class="empty-state">
        <p>Snapshot captured. Ready to run diagnosis.</p>
      </div>
    `;
  });

  btnRunInference.addEventListener('click', async () => {
    if (!capturedImageData) return;
    
    btnRunInference.disabled = true;
    resultDisplay.innerHTML = `
      <div class="empty-state">
        <p class="pulse">Processing frame with TFLite model...</p>
      </div>
    `;
    addLog('ml', 'Initiating TFLite classification on captured frame...');

    try {
      // Call mock inference endpoint
      const res = await fetch('/api/inference', { method: 'POST' });
      const data = await res.json();
      
      // Delay response slightly to simulate computing time
      setTimeout(() => {
        resultDisplay.innerHTML = `
          <div class="inference-result" id="inferenceResult">
            <div class="result-row">
              <span class="result-label">Classification:</span>
              <span class="result-value" id="diagnosisLabel">${data.finding}</span>
            </div>
            <div class="result-row">
              <span class="result-label">Confidence:</span>
              <span class="result-value" id="confidenceLabel">${(data.confidence * 100).toFixed(1)}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar" id="confidenceBar" style="width: ${data.confidence * 100}%"></div>
            </div>
          </div>
        `;
        
        addLog('ml', `TFLite Inference complete: ${data.finding} (${(data.confidence * 100).toFixed(1)}% confidence)`);
        btnRunInference.disabled = false;
      }, 1000);
      
    } catch (e) {
      resultDisplay.innerHTML = `
        <div class="empty-state">
          <p style="color: var(--accent-red)">Inference failed. Backend disconnected.</p>
        </div>
      `;
      btnRunInference.disabled = false;
      addLog('ml', 'Error running ML inference. Backend server unreachable.');
    }
  });

  btnTeleconsult.addEventListener('click', () => {
    updateTeleconsultState(!isTeleconsultActive);
  });

  btnClearLogs.addEventListener('click', () => {
    logsContainer.innerHTML = '';
  });

  // Logging Helper
  function addLog(type, message) {
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    
    let tag = '[SYSTEM]';
    if (type === 'hardware') tag = '[HARDWARE]';
    if (type === 'ml') tag = '[ML-MODEL]';
    if (type === 'api') tag = '[WEBRTC]';

    entry.textContent = `[${time}] ${tag} ${message}`;
    logsContainer.appendChild(entry);
    logsContainer.scrollTop = logsContainer.scrollHeight;
  }
});
