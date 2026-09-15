import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);
  const { data, loading, error, reload } = useApi('/api/v1/appointments?limit=100');
  const { data: trend } = useApi('/api/v1/analytics/appointments-by-day?limit=14');

  const list = data?.data || [];
  const todayAppts = list.filter((a) => a.date === today);
  const scheduled = list.filter((a) => (a.status || '').toUpperCase() === 'SCHEDULED');
  const chartData = (trend?.data || []).map((d) => ({ month: (d.date || '').slice(5), value: d.count }));

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Doctor portal · live from database</p>
          <h1 style={{ marginTop: 8 }}>Today in clinic</h1>
          <p className="page-subtitle">{user?.name} — {today} · schedule and priorities</p>
        </div>
        <dl className="clinical-meta">
          <div><dt>Today</dt><dd>{loading ? '—' : todayAppts.length}</dd></div>
          <div><dt>Scheduled</dt><dd>{loading ? '—' : scheduled.length}</dd></div>
        </dl>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: 'Appointments (loaded)', value: loading ? '—' : list.length, change: 'From the database' },
          { label: "Today's schedule", value: loading ? '—' : todayAppts.length, change: today },
          { label: 'Scheduled overall', value: loading ? '—' : scheduled.length, change: 'Awaiting visit' },
          { label: 'Video visits', value: 'Not configured', change: 'No WebRTC provider' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value" style={typeof s.value === 'string' && isNaN(Number(s.value)) ? { fontSize: '1.2rem', fontFamily: 'var(--font-sans)', fontWeight: 600 } : {}}>{s.value}</div>
            <div className="stat-change">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden', alignSelf: 'start' }}>
          <div className="section-header" style={{ padding: '18px 18px 12px', margin: 0 }}>
            <span className="section-title" style={{ margin: 0 }}>Today&rsquo;s schedule</span>
            <button className="btn btn-sm btn-ghost" onClick={reload}>Refresh</button>
          </div>
          {loading && <div style={{ padding: 18 }}><Loading label="Loading schedule…" /></div>}
          {error && <div style={{ padding: 18 }}><ErrorState error={error} onRetry={reload} /></div>}
          {!loading && !error && todayAppts.length === 0 && (
            <div style={{ padding: 18 }}><EmptyState title="Nothing scheduled today" hint="All appointments are shown regardless of date below." /></div>
          )}
          {(todayAppts.length ? todayAppts : list.slice(0, 8)).map((a) => (
            <div key={a.id} className="list-row">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{a.time}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{a.patient_id}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{a.date} · {a.type} · {a.reason || 'No reason recorded'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge" style={{ marginBottom: 6 }}>{a.status}</span>
                <div style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem', color: 'var(--pine)' }} onClick={() => navigate('/doctor/patients')}>Open →</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-title">Appointments by day</div>
          <p style={{ fontSize: '0.74rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 18 }}>Historical counts · not a forecast</p>
          {chartData.length === 0 ? (
            <EmptyState title="No appointment history yet" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={chartData}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7C877F' }} axisLine={{ stroke: '#E2DCCD' }} tickLine={false} />
                <Tooltip contentStyle={{ background: '#101614', border: '1px solid #2A342E', borderRadius: 8, color: '#EDE8DB', fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#174434" strokeWidth={2} fill="#174434" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
