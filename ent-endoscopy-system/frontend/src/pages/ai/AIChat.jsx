import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { api } from '../../services/api';

const DISCLAIMER = "AI-generated information is for educational assistance only and is not a medical diagnosis. Consult a qualified professional. In emergency, contact emergency services.";

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm the MediCore hospital assistant. Ask about departments, appointments, or reports — or describe symptoms for general guidance.\n\n_" + DISCLAIMER + "_\n\nNote: unless the server is configured with a live model (AI_PROVIDER=azure), replies come from built-in keyword responses, not a language model." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(()=>{ if(listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input; setInput('');
    setMessages(m=>[...m, { role: 'user', text: userMsg }]);
    setLoading(true);
    try {
      const data = await api.post('/api/v1/ai/chat', { message: userMsg });
      setMessages(m=>[...m, { role:'assistant', text: data.reply }]);
    } catch (e) {
      setMessages(m=>[...m, { role:'assistant', text: `I couldn't reach the hospital assistant service (${e?.message || 'request failed'}). Check that the API is running and you are signed in, then try again.\n\n_${DISCLAIMER}_` }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 900 }}>
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Assistance · educational only, never a diagnosis</p>
          <h1 style={{ marginTop: 8 }}>Hospital assistant</h1>
          <p className="page-subtitle">Appointments · departments · reports · symptom guidance</p>
        </div>
        <span className="ai-flag">Provider-driven replies</span>
      </div>
      <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: 520 }}>
        <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m,i)=> (
            <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start', justifyContent: m.role==='user' ? 'flex-end' : 'flex-start' }}>
              {m.role==='assistant' && <div style={{ width:32, height:32, background:'#0a0a0a', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid var(--border-color)', flexShrink:0 }}><Bot size={16}/></div>}
              <div style={{ maxWidth:'75%', padding:'12px 16px', border:'2px solid var(--border-color)', background: m.role==='user'?'var(--brand-red)':'var(--bg-hover)', color: m.role==='user'?'#fff':'var(--text-primary)', fontWeight:600, fontSize:'0.9rem', whiteSpace:'pre-wrap' }}>{m.text}</div>
              {m.role==='user' && <div style={{ width:32, height:32, background:'var(--brand-red)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid var(--border-color)', flexShrink:0 }}><User size={16}/></div>}
            </div>
          ))}
          {loading && <div style={{ fontWeight:800, textTransform:'uppercase', fontSize:'0.8rem', color:'var(--text-muted)' }}>AI is typing...</div>}
        </div>
        <div style={{ padding:16, borderTop:'2px solid var(--border-color)', display:'flex', gap:12 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about appointments, symptoms, reports..." style={{ flex:1, border:'2px solid var(--border-color)', padding:'12px 16px', fontWeight:600 }} />
          <button onClick={send} className="btn btn-primary" style={{ padding:'12px 20px' }}><Send size={18}/></button>
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {["Book appointment","AI triage for chest pain","Explain my lab report","Bed availability"].map(s=>(
          <button key={s} onClick={()=>setInput(s)} className="badge" style={{ cursor:'pointer', background:'var(--bg-hover)', border:'2px solid var(--border-color)', padding:'6px 10px' }}>{s}</button>
        ))}
      </div>
    </div>
  );
}
