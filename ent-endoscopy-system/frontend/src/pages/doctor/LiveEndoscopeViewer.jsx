import { useState, useEffect, useRef } from 'react';
import { Camera, Square, Sun, Zap, ZoomIn, ZoomOut, Contrast, Maximize, Save, Trash2, Loader } from 'lucide-react';

function EndoscopeCanvas({ streaming, led, brightness, zoom, contrast }) {
  const ref = useRef(null);
  const animRef = useRef(null);
  let frame = 0;

  useEffect(() => {
    if (!streaming || !ref.current) return;
    const c = ref.current;
    const ctx = c.getContext('2d');
    const W = c.width, H = c.height;

    const draw = () => {
      frame++;
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

      const b = led ? brightness / 100 : 0.03;
      const cx = W / 2 + Math.sin(frame * 0.015) * 4;
      const cy = H / 2 + Math.cos(frame * 0.012) * 3;
      const r = Math.min(W, H) / 2 * (zoom / 100 + 0.5);

      if (b > 0.05) {
        // Ear canal ambient
        const amb = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
        amb.addColorStop(0, `rgba(230,140,120,${b})`);
        amb.addColorStop(0.5, `rgba(190,90,80,${b * 0.7})`);
        amb.addColorStop(1, `rgba(50,10,15,${b * 0.3})`);
        ctx.fillStyle = amb; ctx.fillRect(0, 0, W, H);

        // Tympanic membrane
        const tg = ctx.createRadialGradient(cx - 20, cy - 10, 5, cx - 10, cy - 5, 95);
        tg.addColorStop(0, `rgba(215,220,235,${b * 0.8})`);
        tg.addColorStop(0.4, `rgba(170,180,200,${b * 0.65})`);
        tg.addColorStop(1, `rgba(90,40,40,${b * 0.2})`);
        ctx.fillStyle = tg; ctx.save();
        ctx.beginPath(); ctx.ellipse(cx - 10, cy, 85, 100, Math.PI / 6, 0, 2 * Math.PI);
        ctx.fill(); ctx.restore();

        // Malleus
        ctx.beginPath(); ctx.moveTo(cx - 38, cy - 48); ctx.lineTo(cx - 8, cy - 2);
        ctx.strokeStyle = `rgba(255,245,235,${b * 0.9})`; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.stroke();

        // Light reflex
        const rg = ctx.createRadialGradient(cx - 10, cy, 2, cx + 18, cy + 28, 38);
        rg.addColorStop(0, `rgba(255,255,255,${b * 0.9})`); rg.addColorStop(1, 'transparent');
        ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);

        // Contrast adjustment
        if (contrast > 50) {
          ctx.fillStyle = `rgba(255,255,255,${(contrast - 50) / 100 * 0.15})`; ctx.fillRect(0, 0, W, H);
        }

        // Noise
        ctx.fillStyle = `rgba(255,255,255,0.02)`;
        for (let i = 0; i < 300; i++) ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }

      // Circular vignette
      ctx.save();
      const vr = r - 10;
      ctx.beginPath(); ctx.arc(cx, cy, vr, 0, 2 * Math.PI); ctx.rect(W, 0, -W, H);
      ctx.fillStyle = '#000'; ctx.fill(); ctx.restore();

      // HUD
      ctx.fillStyle = 'rgba(0,162,255,0.85)'; ctx.font = '11px Inter,monospace';
      ctx.fillText(`LED: ${led ? `ON ${brightness}%` : 'OFF'} | ZOOM: ${zoom}% | FPS: 30`, 12, 22);

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [streaming, led, brightness, zoom, contrast]);

  return <canvas ref={ref} width={640} height={480} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
}

export default function LiveEndoscopeViewer() {
  const [streaming, setStreaming] = useState(false);
  const [led, setLed] = useState(true);
  const [brightness, setBrightness] = useState(70);
  const [zoom, setZoom] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [snapshots, setSnapshots] = useState([]);
  const canvasRef = useRef(null);

  const capture = () => {
    const c = document.querySelector('canvas');
    if (!c) return;
    setSnapshots(s => [...s.slice(-5), c.toDataURL()]);
  };

  const Control = ({ icon: Icon, label, value, onChange, min = 0, max = 100 }) => (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon size={14} color="var(--text-muted)" /><span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
        </div>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}%</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={e => onChange(+e.target.value)}
        style={{ width: '100%', accentColor: '#0d9488', cursor: 'pointer' }} />
    </div>
  );

  return (
    <div className="animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, alignItems: 'flex-start' }}>
      {/* Viewer */}
      <div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ position: 'relative', background: '#000', aspectRatio: '4/3' }}>
            {streaming ? <EndoscopeCanvas streaming led={led} brightness={brightness} zoom={zoom} contrast={contrast} /> : (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', gap: 12, minHeight: 320 }}>
                <Camera size={48} /><p style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 600 }}>Start streaming to view</p>
              </div>
            )}
            {/* Overlay badges */}
            {streaming && (
              <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                <span style={{ background: 'rgba(239,68,68,0.9)', color: '#fff', borderRadius: 6, padding: '3px 8px', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 1s infinite' }}></span> LIVE
                </span>
                <span style={{ background: 'rgba(0,0,0,0.6)', color: '#0d9488', borderRadius: 6, padding: '3px 8px', fontSize: '0.7rem', fontWeight: 700 }}>ESP32-CAM</span>
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div style={{ display: 'flex', gap: 8, padding: '12px 16px', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap', alignItems: 'center' }}>
            <button className={`btn btn-sm ${streaming ? 'btn-danger' : 'btn-secondary'}`} onClick={() => setStreaming(s => !s)}>
              {streaming ? <><Square size={13} /> Stop</> : <><Camera size={13} /> Start Stream</>}
            </button>
            {streaming && <>
              <button className="btn btn-sm btn-primary" onClick={capture}><Camera size={13} /> Capture</button>
              <button className="btn btn-sm btn-ghost" onClick={() => setLed(l => !l)}>
                <Zap size={13} color={led ? '#f59e0b' : undefined} /> LED {led ? 'ON' : 'OFF'}
              </button>
            </>}
            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--text-muted)' }}>OV2640 · 1280×720 · 30fps</span>
          </div>
        </div>

        {/* Snapshot Gallery */}
        {snapshots.length > 0 && (
          <div className="card" style={{ marginTop: 16 }}>
            <div className="section-header">
              <span className="section-title">Captured Frames ({snapshots.length})</span>
              <button className="btn btn-sm btn-ghost btn-danger" onClick={() => setSnapshots([])}>Clear All</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 10 }}>
              {snapshots.map((s, i) => (
                <div key={i} style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                  <img src={s} alt={`Snapshot ${i + 1}`} style={{ width: '100%', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 4, left: 4, right: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: 4, padding: '2px 6px', fontSize: '0.6rem' }}>#{i + 1}</span>
                    <button onClick={() => setSnapshots(ss => ss.filter((_, j) => j !== i))} style={{ background: 'rgba(239,68,68,0.8)', border: 'none', borderRadius: 4, padding: '2px 4px', cursor: 'pointer', color: '#fff' }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls Panel */}
      <div>
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="section-title" style={{ marginBottom: 16 }}>Image Controls</div>
          <Control icon={Sun}      label="LED Brightness" value={brightness} onChange={setBrightness} />
          <Control icon={ZoomIn}   label="Zoom"          value={zoom}       onChange={setZoom} />
          <Control icon={Contrast} label="Contrast"       value={contrast}   onChange={setContrast} />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn btn-sm btn-ghost w-full" onClick={() => { setBrightness(70); setZoom(50); setContrast(50); }}>Reset</button>
          </div>
        </div>

        <div className="card">
          <div className="section-title" style={{ marginBottom: 14 }}>Device Info</div>
          {[['Camera', 'OV2640'], ['Resolution', '1280×720'], ['FPS', '30'], ['Interface', 'ESP32-CAM'], ['Status', streaming ? 'Streaming' : 'Idle']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>{k}</span>
              <span style={{ fontWeight: 600, color: streaming && k === 'Status' ? '#10b981' : 'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
