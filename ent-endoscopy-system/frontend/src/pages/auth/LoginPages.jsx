import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Heart, Stethoscope, Shield, ArrowRight, Loader, FlaskConical, Pill, UserCog, BedDouble } from 'lucide-react';

export function LoginSelector() {
  const navigate = useNavigate();
  const main = [
    { role: 'Patient', desc: 'Appointments, records, triage and teleconsults.', to: '/login/patient', icon: Heart },
    { role: 'Doctor', desc: 'Clinic day, endoscopy, prescriptions and labs.', to: '/login/doctor', icon: Stethoscope },
    { role: 'Admin', desc: 'Capacity, staff, billing and cloud operations.', to: '/login/admin', icon: Shield },
  ];
  const staff = [
    { title: 'Nurse', meta: 'nurse@medicore.demo', to: '/login/nurse', icon: BedDouble },
    { title: 'Reception', meta: 'reception@medicore.demo', to: '/login/receptionist', icon: UserCog },
    { title: 'Pharmacy', meta: 'pharmacy@medicore.demo', to: '/login/pharmacist', icon: Pill },
    { title: 'Lab Tech', meta: 'lab@medicore.demo', to: '/login/labtech', icon: FlaskConical },
  ];

  return (
    <div className="ed-page" style={{ padding: '48px 40px', maxWidth: 1180, margin: '0 auto' }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.82rem', fontWeight: 600 }}>← Back to site</Link>
      <p className="eyebrow eyebrow--pine" style={{ marginTop: 28 }}>MediCore HMS · Role portals</p>
      <h1 style={{ fontSize: 'clamp(2.2rem,4.5vw,3.6rem)', marginTop: 10 }}>Choose your portal.</h1>
      <p style={{ color: 'var(--text-secondary)', marginTop: 12, maxWidth: 620 }}>
        10 departments · OPD/IPD · Pharmacy · Lab · Billing · Beds · Triage · Telehealth. Same backend, permissions enforced per role.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16, marginTop: 32 }}>
        {main.map((c) => (
          <button key={c.role} onClick={() => navigate(c.to)} className="card" style={{ textAlign: 'left', cursor: 'pointer', padding: 26 }}>
            <c.icon size={20} strokeWidth={1.75} color="var(--pine)" />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginTop: 18 }}>{c.role}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: 6 }}>{c.desc}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18, fontWeight: 600, fontSize: '0.85rem' }}>Enter <ArrowRight size={15} /></div>
          </button>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Staff portals · demo access</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 10 }}>
          {staff.map((c) => (
            <button key={c.title} onClick={() => navigate(c.to)} className="btn" style={{ justifyContent: 'flex-start', padding: '12px 14px' }}>
              <c.icon size={15} /> <span>{c.title}</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 500 }}>{c.meta}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span className="badge">AWS ready</span>
        <span className="badge">Azure ready</span>
        <span className="badge">Dockerized</span>
        <span className="badge">Demo password · demo123</span>
      </div>
    </div>
  );
}

function LoginForm({ role, title, blurb, credentials, accent = 'General portal' }) {
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
      const u = await login(email, password);
      const portalMap = { patient: 'patient', doctor: 'doctor', admin: 'admin', nurse: 'nurse', receptionist: 'nurse', pharmacist: 'nurse', labtech: 'nurse' };
      const portal = portalMap[u.role] || 'patient';
      if (portal === 'nurse') navigate('/nurse/dashboard');
      else navigate(`/${portal}/dashboard`);
    } catch (err) {
      setError(err?.message || 'Sign-in failed. Check the demo account and that the API is running.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <p className="eyebrow" style={{ color: '#9DBEA9' }}>MediCore HMS · {accent}</p>
        <h2 style={{ marginTop: 12 }}>{title}</h2>
        <p style={{ marginTop: 12, color: '#B9C4BC', lineHeight: 1.65, maxWidth: 420 }}>{blurb}</p>
        <p style={{ marginTop: 28, fontSize: '0.75rem', color: '#8B948C' }}>JWT · RBAC · Audit-logged · AWS / Azure deployable</p>
      </div>
      <div className="auth-panel">
        <Link to="/portals" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}>← All portals</Link>
        <h1 style={{ fontSize: '2.2rem', marginTop: 18 }}>Sign in</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 6, fontSize: '0.92rem' }}>Use your hospital credentials to continue.</p>
        {error && <div className="badge badge-red" style={{ marginTop: 16, padding: '10px 12px', textTransform: 'none', letterSpacing: 0 }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? <><Loader size={17} /> Authenticating…</> : 'Sign in →'}
          </button>
        </form>
        <div className="card" style={{ marginTop: 24, background: 'var(--bg-wash)' }}>
          <p className="eyebrow" style={{ marginBottom: 6 }}>Demo credentials</p>
          <p style={{ fontSize: '0.88rem', fontWeight: 600 }}>{credentials.email} · {credentials.password}</p>
        </div>
      </div>
    </div>
  );
}

export function PatientLogin() { return <LoginForm role="patient" title="Care that remembers you." blurb="Appointments, records, reports, bills and teleconsults — in one calm place." credentials={{ email: 'patient@medicore.demo', password: 'demo123' }} accent="Patient portal" />; }
export function DoctorLogin() { return <LoginForm role="doctor" title="The clinic day, clarified." blurb="Schedule, patients, endoscopy, prescriptions and labs — with AI drafts kept visibly separate." credentials={{ email: 'doctor@medicore.demo', password: 'demo123' }} accent="Doctor portal" />; }
export function AdminLogin() { return <LoginForm role="admin" title="Run the whole hospital." blurb="Capacity, staff, departments, billing and analytics with full audit coverage." credentials={{ email: 'admin@medicore.demo', password: 'demo123' }} accent="Admin portal" />; }
export function NurseLogin() { return <LoginForm role="nurse" title="The ward, in order." blurb="Beds, patients and lab coordination for nursing teams." credentials={{ email: 'nurse@medicore.demo', password: 'demo123' }} accent="Nursing portal" />; }
export function ReceptionistLogin() { return <LoginForm role="receptionist" title="Front desk, unrushed." blurb="Admissions, appointments and patient intake." credentials={{ email: 'reception@medicore.demo', password: 'demo123' }} accent="Reception portal" />; }
export function PharmacistLogin() { return <LoginForm role="pharmacist" title="Dispense with confidence." blurb="Prescription queue and medicine inventory." credentials={{ email: 'pharmacy@medicore.demo', password: 'demo123' }} accent="Pharmacy portal" />; }
export function LabTechLogin() { return <LoginForm role="labtech" title="Results, on time." blurb="Test orders, status tracking and report uploads." credentials={{ email: 'lab@medicore.demo', password: 'demo123' }} accent="Laboratory portal" />; }
