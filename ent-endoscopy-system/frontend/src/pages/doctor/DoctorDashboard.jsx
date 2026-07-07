import { mockAppointments, mockPatients, mockAnalytics } from '../../data/mockData';
import { Users, Calendar, Video, AlertCircle, TrendingUp, Activity } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const todayAppts = mockAppointments.filter(a => a.date === '2026-07-08');
  const waiting = todayAppts.filter(a => a.status === 'waiting');
  const pending = mockAppointments.filter(a => a.status === 'pending');

  return (
    <div className="animate-fadeIn">
      {/* Brutalist Welcome Header */}
      <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '4px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: 12 }}>
          Doctor <span style={{ color: 'var(--brand-red)' }}>Overview.</span>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            {user?.name} / {user?.specialty}
          </p>
          <div style={{ display: 'flex', gap: 24, textTransform: 'uppercase' }}>
            <div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Today</div><div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1 }}>{todayAppts.length}</div></div>
            <div style={{ textAlign: 'right' }}><div style={{ fontSize: '0.8rem', fontWeight: 800 }}>Waiting</div><div style={{ fontSize: '2rem', fontWeight: 900, lineHeight: 1, color: 'var(--brand-red)' }}>{waiting.length}</div></div>
          </div>
        </div>
      </div>

      {/* Brutalist Stat Cards */}
      <div className="grid-4" style={{ marginBottom: 48 }}>
        {[
          { label: 'Total Patients', value: '36k', change: 'Growth +4%', color: '#0a0a0a' },
          { label: "Today's Schedule", value: todayAppts.length, change: `${waiting.length} waiting`, color: '#0a0a0a' },
          { label: 'Live Sessions', value: '01', change: 'Active now', color: 'var(--brand-red)' },
          { label: 'Pending Rx', value: '04', change: 'Needs review', color: '#0a0a0a' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: 8, marginBottom: 16 }}>{s.label}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-change" style={{ fontWeight: 800, textTransform: 'uppercase' }}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 48 }}>
        {/* Today's appointments (Stark List) */}
        <div className="card" style={{ padding: 0 }}>
          <div className="section-header" style={{ padding: '24px 24px 16px', margin: 0 }}>
            <span className="section-title" style={{ margin: 0, textTransform: 'uppercase' }}>Schedule</span>
            <button className="btn btn-sm btn-ghost" onClick={() => navigate('/doctor/appointments')}>Manage</button>
          </div>
          {todayAppts.map((a, i) => (
            <div key={a.id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 16, alignItems: 'center', padding: '16px 24px', borderBottom: i < todayAppts.length - 1 ? '2px solid var(--border-color)' : 'none', background: a.status === 'waiting' ? 'var(--bg-hover)' : 'transparent' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>{a.time.split(' ')[0]}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', textTransform: 'uppercase' }}>{a.patientName}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{a.type} / {a.reason}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge" style={{ background: a.status === 'waiting' ? 'var(--brand-red)' : '#0a0a0a', color: '#fff', marginBottom: 6 }}>{a.status}</span>
                {a.status === 'waiting' && <div style={{ cursor: 'pointer', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--brand-red)' }} onClick={() => navigate('/doctor/telemedicine')}>Join →</div>}
              </div>
            </div>
          ))}
        </div>

        {/* Minimalist Chart */}
        <div className="card">
          <div className="section-title" style={{ textTransform: 'uppercase' }}>Patient Volume</div>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 24, textTransform: 'uppercase' }}>7-Month Trailing Performance</p>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockAnalytics.monthlyConsultations}>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-primary)', fontWeight: 800 }} axisLine={{ stroke: 'var(--border-color)', strokeWidth: 2 }} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0a0a0a', border: 'none', borderRadius: 0, color: '#fff', fontWeight: 800, textTransform: 'uppercase' }} itemStyle={{ color: '#e64833' }} />
              <Area type="step" dataKey="value" stroke="var(--brand-red)" strokeWidth={4} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
