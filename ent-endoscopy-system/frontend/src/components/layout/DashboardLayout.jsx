import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/patient/dashboard':     { title: 'Dashboard',        subtitle: 'Welcome back, here\'s your health overview' },
  '/patient/book':          { title: 'Book Appointment', subtitle: 'Schedule a consultation with a specialist' },
  '/patient/reports':       { title: 'My Reports',       subtitle: 'View and download your ENT scan reports' },
  '/patient/ai-scan':       { title: 'AI Scan Results',  subtitle: 'AI-powered endoscopy diagnosis results' },
  '/patient/teleconsult':   { title: 'Teleconsultation', subtitle: 'Connect with your doctor via video call' },
  '/patient/history':       { title: 'Medical History',  subtitle: 'Your complete ENT medical records' },
  '/patient/notifications': { title: 'Notifications',    subtitle: 'Alerts, reminders and messages' },
  '/patient/profile':       { title: 'My Profile',       subtitle: 'Manage your personal information' },
  '/doctor/dashboard':      { title: 'Dashboard',        subtitle: 'Today\'s overview and pending actions' },
  '/doctor/patients':       { title: 'Patient Management', subtitle: 'Search, manage, and review patient records' },
  '/doctor/endoscope':      { title: 'Live Endoscope',   subtitle: 'Real-time ENT camera viewer and controls' },
  '/doctor/ai-diagnosis':   { title: 'AI Diagnosis',     subtitle: 'Run AI analysis on captured endoscopy images' },
  '/doctor/telemedicine':   { title: 'Telemedicine',     subtitle: 'Start and manage video consultations' },
  '/doctor/prescription':   { title: 'Prescription Generator', subtitle: 'Create and send digital prescriptions' },
  '/doctor/appointments':   { title: 'Appointments',     subtitle: 'Manage your schedule and availability' },
  '/doctor/analytics':      { title: 'Analytics',        subtitle: 'Performance metrics and clinical insights' },
  '/doctor/hardware':       { title: 'Hardware Status',  subtitle: 'ESP32 device monitoring and control' },
  '/admin/dashboard':       { title: 'Admin Dashboard',  subtitle: 'System-wide overview and pending approvals' },
  '/admin/doctors':         { title: 'Manage Doctors',   subtitle: 'Approve, review and manage doctor accounts' },
  '/admin/patients':        { title: 'Manage Patients',  subtitle: 'Patient records, search and audit logs' },
  '/admin/settings':        { title: 'System Settings',  subtitle: 'Platform configuration and security settings' },
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { title, subtitle } = pageTitles[location.pathname] || { title: 'ENT Platform', subtitle: '' };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Topbar
          onMenuToggle={() => setSidebarOpen(o => !o)}
          title={title}
          subtitle={subtitle}
        />
        <main className="app-content animate-fadeIn">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
