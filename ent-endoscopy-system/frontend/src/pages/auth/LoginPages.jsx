import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, Stethoscope, Shield, ArrowRight, Activity, Loader } from 'lucide-react';

/* ─── Landing: choose role ─── */
export function LoginSelector() {
  const navigate = useNavigate();
  const cards = [
    { role: 'patient', icon: Heart,       title: '01 / Patient',   desc: 'Appointments, scans & teleconsult.', color: '#0a0a0a', bg: '#ffffff', to: '/login/patient' },
    { role: 'doctor',  icon: Stethoscope, title: '02 / Doctor',    desc: 'Live endoscope, AI diagnosis, Rx.', color: '#ffffff', bg: '#e64833', to: '/login/doctor' },
    { role: 'admin',   icon: Shield,      title: '03 / Admin',      desc: 'System health, doctor approvals.', color: '#ffffff', bg: '#0a0a0a', to: '/login/admin' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', padding: 48, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ marginBottom: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, background: '#e64833', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #0a0a0a' }}>
              <Activity size={32} color="#fff" />
            </div>
            <div>
              <h1 style={{ fontSize: '3rem', fontWeight: 900, lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-0.05em' }}>ENT Scope</h1>
              <p style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', color: '#666' }}>Smart Portable Endoscopy</p>
            </div>
          </div>
          <h2 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', maxWidth: 800, textTransform: 'uppercase' }}>
            Choose Your <br/><span style={{ color: '#e64833' }}>Platform Portal.</span>
          </h2>
        </div>
      </div>

      {/* Role cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 0, border: '2px solid #0a0a0a', flex: 1 }}>
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={c.role}
              onClick={() => navigate(c.to)}
              style={{ background: c.bg, padding: 40, cursor: 'pointer', display: 'flex', flexDirection: 'column', borderRight: i < cards.length - 1 ? '2px solid #0a0a0a' : 'none', transition: 'all 0.2s', position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-4px, -4px)'; e.currentTarget.style.boxShadow = '8px 8px 0px #0a0a0a'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Icon size={48} color={c.color} style={{ marginBottom: 'auto' }} />
              <div style={{ marginTop: 64 }}>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: c.color, textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, color: c.color, opacity: 0.8, marginBottom: 32 }}>{c.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: c.color, fontWeight: 800, textTransform: 'uppercase', fontSize: '1.2rem' }}>
                  Enter <ArrowRight size={24} strokeWidth={3} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Shared Login Form ─── */
function LoginForm({ role, title, bgLeft, colorLeft, credentials }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(credentials.email);
  const [password, setPassword] = useState(credentials.password);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password, role);
      navigate(`/${role}/dashboard`);
    } catch (err) {
      setError('Invalid credentials.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-page)' }}>
      {/* Left panel */}
      <div style={{ width: '50%', background: bgLeft, color: colorLeft, borderRight: '2px solid #0a0a0a', padding: '64px 48px', display: 'flex', flexDirection: 'column' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: colorLeft, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: 'auto' }}>
          ← Back to Selection
        </Link>
        <div>
          <h2 style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.05em', textTransform: 'uppercase', marginBottom: 24 }}>{title}</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 600, maxWidth: 400, opacity: 0.9 }}>
            Secure access to the ENT Endoscopy diagnostic and teleconsultation platform.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 400 }} className="animate-slideUp">
          <h3 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.03em', marginBottom: 8 }}>Sign In.</h3>
          <p style={{ fontWeight: 600, color: '#666', marginBottom: 32 }}>Enter your credentials to continue.</p>

          {error && <div className="badge badge-red" style={{ marginBottom: 20, padding: 12, fontSize: '0.85rem' }}>{error}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ border: '2px solid #0a0a0a', borderRadius: 0, padding: 16 }} />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Password</label>
              <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ border: '2px solid #0a0a0a', borderRadius: 0, padding: 16 }} />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading} style={{ background: '#0a0a0a', marginTop: 12, fontSize: '1.1rem', padding: 18 }}>
              {loading ? <><Loader size={20} className="animate-spin" /> Authenticating...</> : 'Authenticate →'}
            </button>
          </form>

          <div style={{ marginTop: 32, padding: 20, border: '2px solid #0a0a0a', background: '#f5f5f5' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: 8 }}>Demo Credentials</p>
            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{credentials.email} / {credentials.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PatientLogin() {
  return <LoginForm role="patient" title="Patient Login." bgLeft="#e64833" colorLeft="#ffffff" credentials={{ email: 'patient@ent.demo', password: 'demo123' }} />;
}
export function DoctorLogin() {
  return <LoginForm role="doctor" title="Doctor Login." bgLeft="#0a0a0a" colorLeft="#ffffff" credentials={{ email: 'doctor@ent.demo', password: 'demo123' }} />;
}
export function AdminLogin() {
  return <LoginForm role="admin" title="System Admin." bgLeft="#ffffff" colorLeft="#0a0a0a" credentials={{ email: 'admin@ent.demo', password: 'demo123' }} />;
}
