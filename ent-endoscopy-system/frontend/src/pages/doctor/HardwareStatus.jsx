import { useState, useEffect } from 'react';
import { Activity, Wifi, Battery, Thermometer, Cpu, RefreshCw, Power } from 'lucide-react';
import { mockDeviceStatus } from '../../data/mockData';

export default function HardwareStatus() {
  const [status, setStatus] = useState(mockDeviceStatus);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setStatus(s => ({ ...s, batteryLevel: Math.max(0, s.batteryLevel - Math.floor(Math.random()*3)), temperature: 38 + Math.floor(Math.random()*8) }));
      setRefreshing(false);
    }, 1500);
  };

  return (
    <div className="animate-fadeIn">
      <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '4px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 8 }}>
              Hardware <span style={{ color: 'var(--brand-red)' }}>Status.</span>
            </h1>
            <p style={{ fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
              {status.deviceName} / FW v{status.firmwareVersion} / Uptime: {status.uptime}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-primary" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw size={14} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
              {refreshing ? 'Polling...' : 'Refresh'}
            </button>
            <button className="btn" style={{ border: '2px solid var(--brand-red)', color: 'var(--brand-red)' }}>
              <Power size={14} /> Restart
            </button>
          </div>
        </div>
      </div>

      {/* Big metric cards */}
      <div className="grid-4" style={{ marginBottom: 48 }}>
        {[
          { icon: Battery,     label: 'Battery',     value: `${status.batteryLevel}%`,  alert: status.batteryLevel < 20 },
          { icon: Thermometer, label: 'Temperature',  value: `${status.temperature}°C`, alert: status.temperature > 45 },
          { icon: Wifi,        label: 'WiFi Signal',  value: `${status.wifiSignal} dBm`, alert: false },
          { icon: Activity,    label: 'Stream FPS',   value: status.streamingStatus === 'active' ? `${status.frameRate} fps` : '0 fps', alert: false },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="stat-card" style={{ background: m.alert ? 'var(--brand-red)' : 'var(--bg-card)', color: m.alert ? '#fff' : 'var(--text-primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${m.alert ? 'rgba(255,255,255,0.4)' : 'var(--border-color)'}`, paddingBottom: 8, marginBottom: 16 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.8 }}>{m.label}</div>
                <Icon size={16} />
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1 }}>{m.value}</div>
              {m.alert && <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', marginTop: 8, opacity: 0.9 }}>⚠ Warning</div>}
            </div>
          );
        })}
      </div>

      <div className="grid-2">
        {/* Diagnostics table */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '24px 24px 16px', borderBottom: '2px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase' }}>Connection Diagnostics</h2>
          </div>
          {[
            { label: 'ESP32 Control Module',       val: status.esp32Status,   ok: status.esp32Status === 'online' },
            { label: 'STM32 Hardware Interface',   val: status.stm32Status,   ok: status.stm32Status === 'online' },
            { label: 'Network SSID',               val: status.wifiSsid,      ok: true },
            { label: 'BLE Gateway',                val: status.bleStatus,     ok: status.bleStatus === 'connected' },
            { label: 'Camera (OV2640)',             val: status.streamingStatus === 'active' ? 'Operational' : 'Standby', ok: true },
          ].map((d, i, arr) => (
            <div key={d.label} style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', padding: '16px 24px', borderBottom: i < arr.length - 1 ? '2px solid var(--border-color)' : 'none' }}>
              <span style={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem' }}>{d.label}</span>
              <span className="badge" style={{ background: d.ok ? '#0a0a0a' : 'var(--brand-red)', color: '#fff', border: 'none', textTransform: 'uppercase' }}>{d.val}</span>
            </div>
          ))}
        </div>

        {/* Serial log */}
        <div className="card" style={{ padding: 0 }}>
          <div style={{ padding: '24px 24px 16px', borderBottom: '2px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase' }}>Serial Log</h2>
          </div>
          <div style={{ background: '#0a0a0a', padding: 24, height: 280, overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.78rem', color: '#38bdf8', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ color: '#666' }}>[00:01:23] I (wifi): connected to AP, IP: 192.168.1.105</div>
            <div style={{ color: '#666' }}>[00:01:24] I (cam): OV2640 PID=0x26, VER=0x42</div>
            <div>[00:01:24] I (cam): Camera initialized successfully</div>
            <div>[00:01:25] I (httpd): Starting web server on port: 80</div>
            <div>[00:02:10] I (stream): Client connected, starting stream</div>
            <div>[00:02:11] I (led): Set brightness to 70%</div>
            <div style={{ color: '#f59e0b' }}>[00:25:40] W (temp): Core temperature reached 42°C</div>
            <div>[00:30:12] I (stream): Client disconnected, stopping stream</div>
            <div style={{ color: 'var(--brand-red)' }}>{'>'} {'>'} {'>'} Waiting for connection...</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
