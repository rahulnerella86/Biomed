import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { LoginSelector, PatientLogin, DoctorLogin, AdminLogin, NurseLogin, ReceptionistLogin, PharmacistLogin, LabTechLogin } from './pages/auth/LoginPages';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import MyReports from './pages/patient/MyReports';
import AIScanResults from './pages/patient/AIScanResults';
import Teleconsultation from './pages/patient/Teleconsultation';
import MedicalHistory from './pages/patient/MedicalHistory';
import Notifications from './pages/patient/Notifications';
import PatientProfile from './pages/patient/PatientProfile';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientManagement from './pages/doctor/PatientManagement';
import LiveEndoscopeViewer from './pages/doctor/LiveEndoscopeViewer';
import DoctorAnalytics from './pages/doctor/DoctorAnalytics';
import DoctorPrescription from './pages/doctor/DoctorPrescription';
import HardwareStatus from './pages/doctor/HardwareStatus';

// HMS Shared Pages
import Departments from './pages/hms/Departments';
import Beds from './pages/hms/Beds';
import Lab from './pages/hms/Lab';
import Pharmacy from './pages/hms/Pharmacy';
import Billing from './pages/hms/Billing';
import Staff from './pages/hms/Staff';

// AI Pages
import AITriage from './pages/ai/AITriage';
import AIChat from './pages/ai/AIChat';
import AIInsights from './pages/ai/AIInsights';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={`/${user.role === 'receptionist' || user.role === 'pharmacist' || user.role === 'labtech' ? 'nurse' : user.role}/dashboard`} replace />;
  return children;
}

function StaffDashboard() {
  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Floor operations</p>
          <h1 style={{ marginTop: 8 }}>Staff overview</h1>
          <p className="page-subtitle">Nursing · Reception · Pharmacy · Lab — shift state at a glance</p>
        </div>
        <dl className="clinical-meta">
          <div><dt>Assigned beds</dt><dd>08</dd></div>
          <div><dt>Pending tasks</dt><dd>05</dd></div>
          <div><dt>Shift</dt><dd style={{ fontSize: '1.05rem', paddingTop: 6 }}>08:00 – 16:00</dd></div>
        </dl>
      </div>
      <div className="grid-3">
        <div className="stat-card"><div className="stat-label">Assigned beds</div><div className="stat-value">08</div><div className="stat-change">Ward A · Ward B</div></div>
        <div className="stat-card"><div className="stat-label">Pending tasks</div><div className="stat-value">05</div><div className="stat-change">2 admissions · 3 discharges</div></div>
        <div className="stat-card"><div className="stat-label">Handover note</div><div className="stat-value" style={{ fontSize: '1.3rem', lineHeight: 1.4, fontFamily: 'var(--font-sans)', fontWeight: 500 }}>Night team: 2 post-op reviews due by 10:00.</div></div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Landing + Auth */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/portals" element={<LoginSelector />} />
      <Route path="/login/patient" element={<PatientLogin />} />
      <Route path="/login/doctor" element={<DoctorLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />
      <Route path="/login/nurse" element={<NurseLogin />} />
      <Route path="/login/receptionist" element={<ReceptionistLogin />} />
      <Route path="/login/pharmacist" element={<PharmacistLogin />} />
      <Route path="/login/labtech" element={<LabTechLogin />} />

      {/* Patient Portal — MediCore HMS */}
      <Route path="/patient" element={<ProtectedRoute allowedRoles={['patient']}><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="departments" element={<Departments />} />
        <Route path="book" element={<BookAppointment />} />
        <Route path="reports" element={<MyReports />} />
        <Route path="labs" element={<Lab />} />
        <Route path="pharmacy" element={<Pharmacy />} />
        <Route path="billing" element={<Billing />} />
        <Route path="ai-triage" element={<AITriage />} />
        <Route path="ai-scan" element={<AIScanResults />} />
        <Route path="ai-chat" element={<AIChat />} />
        <Route path="teleconsult" element={<Teleconsultation />} />
        <Route path="history" element={<MedicalHistory />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Doctor Portal — MediCore HMS */}
      <Route path="/doctor" element={<ProtectedRoute allowedRoles={['doctor']}><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="departments" element={<Departments />} />
        <Route path="patients" element={<PatientManagement />} />
        <Route path="appointments" element={<div className="animate-fadeIn card"><p className="eyebrow" style={{ marginBottom: 8 }}>Schedule</p><h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.4rem' }}>Appointments live under Book + the API</h3><p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 8 }}>Use the booking flow backed by <code>/api/appointments</code>. Double-booking is prevented server-side.</p></div>} />
        <Route path="beds" element={<Beds />} />
        <Route path="labs" element={<Lab />} />
        <Route path="pharmacy" element={<Pharmacy />} />
        <Route path="billing" element={<Billing />} />
        <Route path="ai-diagnosis" element={<LiveEndoscopeViewer />} />
        <Route path="ai-chat" element={<AIChat />} />
        <Route path="endoscope" element={<LiveEndoscopeViewer />} />
        <Route path="telemedicine" element={<Teleconsultation />} />
        <Route path="prescription" element={<DoctorPrescription />} />
        <Route path="analytics" element={<DoctorAnalytics />} />
        <Route path="hardware" element={<HardwareStatus />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Nurse / Reception / Pharmacy / LabTech — shared staff portal */}
      <Route path="/nurse" element={<ProtectedRoute allowedRoles={['nurse','receptionist','pharmacist','labtech']}><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<StaffDashboard />} />
        <Route path="beds" element={<Beds />} />
        <Route path="patients" element={<PatientManagement />} />
        <Route path="labs" element={<Lab />} />
        <Route path="ai-chat" element={<AIChat />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Admin Portal — Full HMS Control */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="departments" element={<Departments />} />
        <Route path="doctors" element={<Staff />} />
        <Route path="patients" element={<PatientManagement />} />
        <Route path="beds" element={<Beds />} />
        <Route path="labs" element={<Lab />} />
        <Route path="pharmacy" element={<Pharmacy />} />
        <Route path="billing" element={<Billing />} />
        <Route path="staff" element={<Staff />} />
        <Route path="ai-insights" element={<AIInsights />} />
        <Route path="analytics" element={<DoctorAnalytics />} />
        <Route path="settings" element={<div className="animate-fadeIn card" style={{ padding: 24 }}><p className="eyebrow" style={{ marginBottom: 8 }}>System</p><h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.4rem' }}>System settings</h3><p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: 8 }}>Cloud: AWS / Azure · Env: production · v2.0.0-hms · Health: /health</p></div>} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
