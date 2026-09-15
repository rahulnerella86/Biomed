import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const pageTitles = {
  '/patient/dashboard':     { title: 'Good morning — your health at a glance', subtitle: 'Appointments, reports and next steps' },
  '/patient/book':          { title: 'Book an appointment', subtitle: 'Live availability across 10 departments' },
  '/patient/reports':       { title: 'Reports', subtitle: 'ENT scans, lab results and downloads' },
  '/patient/ai-scan':       { title: 'Submit a scan image', subtitle: 'Stored for doctor review — no software diagnosis' },
  '/patient/teleconsult':   { title: 'Teleconsultation', subtitle: 'Scheduled remote visits (no in-browser video)' },
  '/patient/history':       { title: 'Medical history', subtitle: 'Your longitudinal record' },
  '/patient/notifications': { title: 'Notifications', subtitle: 'Reminders and messages' },
  '/patient/profile':       { title: 'Profile', subtitle: 'Personal and contact details' },
  '/doctor/dashboard':      { title: 'Today in clinic', subtitle: 'Schedule, waiting list and priorities' },
  '/doctor/patients':       { title: 'Patients', subtitle: 'Search and review records' },
  '/doctor/endoscope':      { title: 'Endoscopy images', subtitle: 'Upload → queue for review → save to record' },
  '/doctor/ai-diagnosis':   { title: 'Endoscopy images', subtitle: 'Upload → queue for review → save to record' },
  '/doctor/telemedicine':   { title: 'Telemedicine', subtitle: 'Scheduled remote visits (no in-browser video)' },
  '/doctor/prescription':   { title: 'Prescriptions', subtitle: 'Create and dispatch' },
  '/doctor/appointments':   { title: 'Appointments', subtitle: 'Schedule and availability' },
  '/doctor/analytics':      { title: 'Analytics', subtitle: 'Volume and performance' },
  '/doctor/hardware':       { title: 'Device status', subtitle: 'External hardware not connected' },
  '/admin/dashboard':       { title: 'Hospital overview', subtitle: 'Capacity, load and approvals' },
  '/admin/ai-insights':       { title: 'Operational overview', subtitle: 'Descriptive counts — no forecasting model' },
  '/admin/doctors':         { title: 'Doctors', subtitle: 'Accounts and departments' },
  '/admin/patients':        { title: 'Patients', subtitle: 'Records and audit trail' },
  '/admin/settings':        { title: 'System settings', subtitle: 'Configuration and deployment' },
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { title, subtitle } = pageTitles[location.pathname] || { title: 'MediCore', subtitle: 'Hospital platform' };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-main">
        <Topbar onMenuToggle={() => setSidebarOpen((o) => !o)} title={title} subtitle={subtitle} />
        <main className="app-content animate-fadeIn">
          <div className="app-content-inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
