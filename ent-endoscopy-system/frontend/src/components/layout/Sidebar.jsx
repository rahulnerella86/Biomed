import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  LayoutDashboard, Calendar, FileText, Video, History,
  Bell, User, LogOut, Stethoscope, Users, Activity,
  BarChart2, Pill, Heart, Shield, X, Sun, Moon,
  Building2, BedDouble, FlaskConical, Receipt, Package, Bot, ScanLine, Settings, UserCog
} from 'lucide-react';

const GROUPS = {
  patient: [
    { label: 'Overview', items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/patient/dashboard' },
      { label: 'Notifications', icon: Bell, to: '/patient/notifications' },
      { label: 'My Profile', icon: User, to: '/patient/profile' },
    ]},
    { label: 'Care', items: [
      { label: 'Book Appointment', icon: Calendar, to: '/patient/book' },
      { label: 'Medical History', icon: History, to: '/patient/history' },
      { label: 'My Reports', icon: FileText, to: '/patient/reports' },
      { label: 'Teleconsultation', icon: Video, to: '/patient/teleconsult' },
    ]},
    { label: 'Clinical', items: [
      { label: 'Lab Results', icon: FlaskConical, to: '/patient/labs' },
      { label: 'Pharmacy', icon: Pill, to: '/patient/pharmacy' },
      { label: 'Symptom Guidance', icon: ScanLine, to: '/patient/ai-triage' },
      { label: 'Submit Scan', icon: ScanLine, to: '/patient/ai-scan' },
      { label: 'Hospital Assistant', icon: Bot, to: '/patient/ai-chat' },
    ]},
    { label: 'Operations', items: [
      { label: 'Departments', icon: Building2, to: '/patient/departments' },
      { label: 'Billing', icon: Receipt, to: '/patient/billing' },
    ]},
  ],
  doctor: [
    { label: 'Overview', items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/doctor/dashboard' },
      { label: 'Analytics', icon: BarChart2, to: '/doctor/analytics' },
    ]},
    { label: 'Care', items: [
      { label: 'Patients', icon: Users, to: '/doctor/patients' },
      { label: 'Appointments', icon: Calendar, to: '/doctor/appointments' },
      { label: 'Telemedicine', icon: Video, to: '/doctor/telemedicine' },
      { label: 'Prescriptions', icon: Pill, to: '/doctor/prescription' },
    ]},
    { label: 'Clinical', items: [
      { label: 'Endoscopy Images', icon: Activity, to: '/doctor/endoscope' },
      { label: 'Hospital Assistant', icon: Bot, to: '/doctor/ai-chat' },
      { label: 'Lab Orders', icon: FlaskConical, to: '/doctor/labs' },
    ]},
    { label: 'Operations', items: [
      { label: 'Departments', icon: Building2, to: '/doctor/departments' },
      { label: 'Beds & Wards', icon: BedDouble, to: '/doctor/beds' },
      { label: 'Pharmacy', icon: Package, to: '/doctor/pharmacy' },
      { label: 'Billing', icon: Receipt, to: '/doctor/billing' },
      { label: 'Device Status', icon: Stethoscope, to: '/doctor/hardware' },
    ]},
  ],
  staff: [
    { label: 'Overview', items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/nurse/dashboard' },
    ]},
    { label: 'Care', items: [
      { label: 'Patients', icon: Users, to: '/nurse/patients' },
      { label: 'Beds & Wards', icon: BedDouble, to: '/nurse/beds' },
      { label: 'Lab Orders', icon: FlaskConical, to: '/nurse/labs' },
      { label: 'Hospital Assistant', icon: Bot, to: '/nurse/ai-chat' },
    ]},
  ],
  admin: [
    { label: 'Overview', items: [
      { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
      { label: 'Analytics', icon: BarChart2, to: '/admin/analytics' },
      { label: 'Ops Overview', icon: ScanLine, to: '/admin/ai-insights' },
    ]},
    { label: 'Care', items: [
      { label: 'Doctors', icon: Stethoscope, to: '/admin/doctors' },
      { label: 'Patients', icon: Users, to: '/admin/patients' },
      { label: 'Departments', icon: Building2, to: '/admin/departments' },
    ]},
    { label: 'Operations', items: [
      { label: 'Beds & Wards', icon: BedDouble, to: '/admin/beds' },
      { label: 'Lab Management', icon: FlaskConical, to: '/admin/labs' },
      { label: 'Pharmacy', icon: Package, to: '/admin/pharmacy' },
      { label: 'Billing', icon: Receipt, to: '/admin/billing' },
      { label: 'Staff', icon: UserCog, to: '/admin/staff' },
    ]},
    { label: 'System', items: [
      { label: 'Settings', icon: Settings, to: '/admin/settings' },
    ]},
  ],
};

const roleMeta = {
  patient: { label: 'Patient' }, doctor: { label: 'Doctor' },
  nurse: { label: 'Nurse' }, receptionist: { label: 'Reception' },
  pharmacist: { label: 'Pharmacist' }, labtech: { label: 'Lab Tech' },
  admin: { label: 'Admin' },
};

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const groups =
    user?.role === 'patient' ? GROUPS.patient :
    user?.role === 'doctor' ? GROUPS.doctor :
    user?.role === 'admin' ? GROUPS.admin : GROUPS.staff;

  const meta = roleMeta[user?.role] || roleMeta.patient;
  const initials = (user?.name || 'M').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(16,22,20,0.4)', zIndex: 99 }} />}
      <aside className={`app-sidebar${open ? ' open' : ''}`}>
        <div className="sidebar-logo">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="ed-mark" style={{ width: 30, height: 30, fontSize: '1rem' }}>M</div>
              <div>
                <div style={{ fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>MediCore</div>
                <div style={{ fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--text-muted)' }}>{meta.label} portal</div>
              </div>
            </div>
            <button className="btn-icon" onClick={onClose} aria-label="Close menu"><X size={16} /></button>
          </div>
        </div>

        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="avatar avatar-md">{user?.avatar || initials}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '0.86rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user?.specialty || user?.department || user?.role}</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {groups.map((g) => (
            <div key={g.label}>
              <div className="sidebar-section-label">{g.label}</div>
              {g.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to}
                    className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
                    onClick={onClose}>
                    <Icon size={15} strokeWidth={2} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-item w-full" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }} onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <button className="sidebar-item w-full" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%' }} onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 10px 2px', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            <Heart size={11} /> MediCore HMS · v2.0
          </div>
        </div>
      </aside>
    </>
  );
}
