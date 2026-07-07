import { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, Send, Upload, FileText, MessageSquare } from 'lucide-react';

function SimulatedVideoFeed({ active }) {
  const ref = useRef(null);
  const animRef = useRef(null);
  let frame = 0;

  useEffect(() => {
    if (!active || !ref.current) { return; }
    const c = ref.current;
    const ctx = c.getContext('2d');
    const draw = () => {
      frame++;
      ctx.fillStyle = '#0a0e1a'; ctx.fillRect(0, 0, 640, 360);
      // Simulated doctor silhouette
      const g = ctx.createRadialGradient(320, 180, 20, 320, 200, 160);
      g.addColorStop(0, '#4a5568'); g.addColorStop(1, '#1a202c');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.ellipse(320, 280, 120, 90, 0, 0, 2*Math.PI); ctx.fill();
      ctx.beginPath(); ctx.arc(320, 145, 60, 0, 2*Math.PI); ctx.fill();
      // Animated subtle scan-line
      const y = (frame * 2) % 360;
      ctx.fillStyle = 'rgba(0,162,255,0.05)';
      ctx.fillRect(0, y, 640, 2);
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '14px Inter,sans-serif';
      ctx.fillText('Dr. Sarah Jenkins', 16, 30);
      ctx.fillStyle = 'rgba(16,185,129,0.8)'; ctx.beginPath(); ctx.arc(12, 24, 5, 0, 2*Math.PI); ctx.fill();
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [active]);

  return (
    <div className="video-tile">
      {active ? <canvas ref={ref} width={640} height={360} style={{ width: '100%', height: '100%' }} /> :
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
          <Video size={48} style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: '0.9rem' }}>Session not started</p>
        </div>}
    </div>
  );
}

export default function Teleconsultation() {
  const [inCall, setInCall] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState([
    { from: 'doctor', text: 'Hello! I can see your previous reports. How are you feeling today?', time: '10:01 AM' },
    { from: 'patient', text: 'The ear pain has reduced a bit after starting the antibiotics.', time: '10:02 AM' },
    { from: 'doctor', text: 'Good progress! Continue the full course. Let me review your latest scan.', time: '10:03 AM' },
  ]);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (inCall) {
      setDuration(0);
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } else { clearInterval(timerRef.current); }
    return () => clearInterval(timerRef.current);
  }, [inCall]);

  const fmtTime = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const sendMsg = () => {
    if (!msg.trim()) return;
    setMessages(m => [...m, { from: 'patient', text: msg.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setMsg('');
    setTimeout(() => {
      setMessages(m => [...m, { from: 'doctor', text: 'Understood. I\'ve noted that in your record. Please keep monitoring and update me if symptoms worsen.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1500);
  };

  return (
    <div className="animate-fadeIn">
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: 20, alignItems: 'flex-start' }}>
        {/* Video Area */}
        <div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <SimulatedVideoFeed active={inCall} />
            {/* PiP - patient cam */}
            {inCall && (
              <div style={{ position: 'absolute', bottom: 16, right: 16, width: 120, height: 80, background: '#1e293b', borderRadius: 8, border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <div style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}><span style={{ fontSize: '1.5rem' }}>👤</span><div style={{ fontSize: '0.6rem' }}>You</div></div>
              </div>
            )}

            {/* Call Controls */}
            <div style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {inCall && <span style={{ fontSize: '0.82rem', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>{fmtTime(duration)} · In Call</span>}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                {inCall && <>
                  <button onClick={() => setMuted(m => !m)} className={`btn btn-sm ${muted ? 'btn-danger' : 'btn-ghost'}`}>{muted ? <MicOff size={15} /> : <Mic size={15} />} {muted ? 'Unmute' : 'Mute'}</button>
                  <button onClick={() => setVideoOff(v => !v)} className={`btn btn-sm ${videoOff ? 'btn-danger' : 'btn-ghost'}`}>{videoOff ? <VideoOff size={15} /> : <Video size={15} />} {videoOff ? 'Show' : 'Hide'}</button>
                </>}
                <button onClick={() => setInCall(c => !c)} className={`btn btn-sm ${inCall ? 'btn-danger' : 'btn-secondary'}`}>
                  {inCall ? <><Phone size={15} /> End Call</> : <><Video size={15} /> Join Session</>}
                </button>
              </div>
            </div>
          </div>

          {/* Share Reports */}
          <div className="card" style={{ marginTop: 16 }}>
            <div className="section-title" style={{ marginBottom: 12 }}>Share with Doctor</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-sm btn-outline"><Upload size={14} /> Upload Image</button>
              <button className="btn btn-sm btn-ghost"><FileText size={14} /> Share Report</button>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 520 }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f0fdfa', border: '2px solid #0d948830', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', color: '#0d9488' }}>SJ</div>
            <div><div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Dr. Sarah Jenkins</div><div style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>Online</div></div>
            <MessageSquare size={16} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'patient' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', padding: '8px 12px', borderRadius: m.from === 'patient' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', background: m.from === 'patient' ? '#2563eb' : 'var(--bg-hover)', color: m.from === 'patient' ? '#fff' : 'var(--text-primary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                  <p>{m.text}</p>
                  <p style={{ fontSize: '0.65rem', opacity: 0.65, marginTop: 4, textAlign: 'right' }}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '10px 12px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: 8 }}>
            <input className="form-input" style={{ flex: 1, fontSize: '0.82rem', padding: '8px 12px' }} placeholder="Type a message…" value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMsg()} />
            <button className="btn btn-primary" style={{ padding: '8px 14px' }} onClick={sendMsg}><Send size={15} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
