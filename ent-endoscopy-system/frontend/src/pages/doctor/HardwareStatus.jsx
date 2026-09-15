import { useNavigate } from 'react-router-dom';
import { Unplug } from 'lucide-react';

/**
 * Honest device page. No ESP32/ESP32-CAM, battery, temperature, WiFi, BLE, or
 * LED hardware exists in this repository, so no telemetry or device controls
 * are shown. Previously this page displayed simulated values and a fake log.
 */
export default function HardwareStatus() {
  const navigate = useNavigate();
  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Device integration</p>
          <h1 style={{ marginTop: 8 }}>Hardware status</h1>
          <p className="page-subtitle">External endoscope hardware is not connected to this deployment</p>
        </div>
        <span className="ai-flag"><Unplug size={12} /> Requires external device</span>
      </div>

      <div className="card" style={{ maxWidth: 640 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Integration state</div>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
          No endoscope camera, ESP32 controller, battery, temperature sensor, or BLE link is
          integrated with this software. There is nothing to display here yet — and this page
          will not show simulated telemetry. When a device integration is built, its live
          connection state, firmware version, and last-seen timestamp will appear here.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/doctor/endoscope')}>Go to image review workflow</button>
          <button className="btn" onClick={() => navigate('/doctor/patients')}>Back to patients</button>
        </div>
      </div>
    </div>
  );
}
