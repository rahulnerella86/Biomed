import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { LoginSelector, PatientLogin, DoctorLogin, AdminLogin } from './pages/auth/LoginPages';
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

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/" replace />;
  if (role && user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<LoginSelector />} />
      <Route path="/login/patient" element={<PatientLogin />} />
      <Route path="/login/doctor" element={<DoctorLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />

      {/* Patient Portal */}
      <Route path="/patient" element={<ProtectedRoute role="patient"><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="book" element={<BookAppointment />} />
        <Route path="reports" element={<MyReports />} />
        <Route path="ai-scan" element={<AIScanResults />} />
        <Route path="teleconsult" element={<Teleconsultation />} />
        <Route path="history" element={<MedicalHistory />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Doctor Portal */}
      <Route path="/doctor" element={<ProtectedRoute role="doctor"><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="patients" element={<PatientManagement />} />
        <Route path="endoscope" element={<LiveEndoscopeViewer />} />
        <Route path="ai-diagnosis" element={<AIScanResults />} /> {/* Reuse patient component for demo */}
        <Route path="telemedicine" element={<Teleconsultation />} /> {/* Reuse patient component for demo */}
        <Route path="prescription" element={<DoctorPrescription />} />
        <Route path="appointments" element={<div className="animate-fadeIn p-4">Appointments Schedule Component (WIP)</div>} />
        <Route path="analytics" element={<DoctorAnalytics />} />
        <Route path="hardware" element={<HardwareStatus />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Admin Portal */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="doctors" element={<div className="animate-fadeIn p-4">Manage Doctors Component (WIP)</div>} />
        <Route path="patients" element={<div className="animate-fadeIn p-4">Manage Patients Component (WIP)</div>} />
        <Route path="settings" element={<div className="animate-fadeIn p-4">System Settings Component (WIP)</div>} />
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
