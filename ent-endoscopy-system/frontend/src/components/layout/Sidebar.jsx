import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  LayoutDashboard, Calendar, FileText, Video, Brain, History,
  Bell, User, Settings, LogOut, Stethoscope, Users, Activity,
  Cpu, BarChart2, Pill, Heart, Shield, X, Sun, Moon
} from 'lucide-react';

const patientNav = [
  { label: 'Dashboard',        icon: LayoutDashboard, to: '/patient/dashboard' },
  { label: 'Book Appointment', icon: Calendar,         to: '/patient/book' },
  { label: 'My Reports',       icon: FileText,         to: '/patient/reports' },
  { label: 'AI Scan Results',  icon: Brain,            to: '/patient/ai-scan' },
  { label: 'Teleconsultation', icon: Video,            to: '/patient/teleconsult' },
  { label: 'Medical History',  icon: History,          to: '/patient/history' },
  { label: 'Notifications',    icon: Bell,             to: '/patient/notifications', badge: 2 },
  { label: 'My Profile',       icon: User,             to: '/patient/profile' },
];

const doctorNav = [
  { label: 'Dashboard',          icon: LayoutDashboard, to: '/doctor/dashboard' },
  { label: 'Patient Management', icon: Users,           to: '/doctor/patients' },
  { label: 'Live Endoscope',     icon: Cpu,             to: '/doctor/endoscope' },
  { label: 'AI Diagnosis',       icon: Brain,           to: '/doctor/ai-diagnosis' },
  { label: 'Telemedicine',       icon: Video,           to: '/doctor/telemedicine' },
  { label: 'Prescription',       icon: Pill,            to: '/doctor/prescription' },
  { label: 'Appointments',       icon: Calendar,        to: '/doctor/appointments' },
  { label: 'Analytics',          icon: BarChart2,       to: '/doctor/analytics' },
  { label: 'Hardware Status',    icon: Activity,        to: '/doctor/hardware' },
];

const adminNav = [
  { label: 'Dashboard',      icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Manage Doctors', icon: Stethoscope,     to: '/admin/doctors' },
  { label: 'Manage Patients',icon: Users,           to: '/admin/patients' },
  { label: 'System Settings',icon: Settings,        to: '/admin/settings' },
];

const roleInfo = {
  patient: { label: 'Patient', accentBg: '#e64833', icon: Heart },
  doctor:  { label: 'Doctor',  accentBg: '#0a0a0a', icon: Stethoscope },
  admin:   { label: 'Admin',   accentBg: '#0a0a0a', icon: Shield },
};

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const nav = user?.role === 'patient' ? patientNav : user?.role === 'doctor' ? doctorNav : adminNav;
  const info = roleInfo[user?.role] || roleInfo.patient;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      {open && <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }} />}

      <aside className={`app-sidebar${open ? ' open' : ''}`}>
        {/* Logo / Brand */}
        <div className="sidebar-logo">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', lineHeight: 1 }}>ENT</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--brand-red)', letterSpacing: '0.1em' }}>Scope Pro</div>
            </div>
            <button className="btn-icon" onClick={onClose}><X size={18} /></button>
          </div>
          {/* Role badge */}
          <div style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8, background: info.accentBg, color: '#fff', padding: '6px 12px', border: '2px solid var(--border-color)' }}>
            <info.icon size={14} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{info.label} Portal</span>
          </div>
        </div>

        {/* User info strip */}
        <div style={{ padding: '16px 24px', borderBottom: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, background: 'var(--brand-red)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.9rem', color: '#fff' }}>
            {user?.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>{user?.name}</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{user?.specialty || user?.department || user?.bloodGroup}</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
                onClick={onClose}
              >
                <Icon size={16} strokeWidth={2.5} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && <span className="badge badge-red" style={{ padding: '2px 6px', fontSize: '0.6rem' }}>{item.badge}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <button
            className="sidebar-item w-full"
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', marginBottom: 4 }}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            className="sidebar-item w-full"
            style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', color: 'var(--brand-red)' }}
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
