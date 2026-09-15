import { api } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { data: docs, loading: dl, error: derr, reload: reloadDocs } = useApi('/api/v1/doctors?limit=100');
  const { data: pats, loading: pl, error: perr } = useApi('/api/v1/patients?limit=5');
  const { data: stats, loading: sl, error: serr, reload: reloadStats } = useApi('/api/v1/analytics/summary');

  const docList = docs?.data || [];
  const pending = docList.filter((d) => (d.status || '').toLowerCase() === 'pending');

  const setStatus = async (id, status) => {
    try {
      await api.put(`/api/v1/doctors/${id}`, { status });
      reloadDocs(); reloadStats();
    } catch { /* error surfaces via reload state */ }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Administration · live from database</p>
          <h1 style={{ marginTop: 8 }}>Hospital overview</h1>
          <p className="page-subtitle">{user?.name} — capacity, load, and approvals</p>
        </div>
        <button className="btn btn-sm" onClick={() => { reloadDocs(); reloadStats(); }}>Refresh</button>
      </div>

      {sl && <Loading label="Loading operational summary…" />}
      {serr && <ErrorState error={serr} onRetry={reloadStats} />}
      {stats && (
        <div className="grid-4" style={{ marginBottom: 20 }}>
          <div className="stat-card"><div className="stat-label">Doctors</div><div className="stat-value">{dl ? '—' : docList.length}</div><div className="stat-change">{pending.length} pending approval</div></div>
          <div className="stat-card"><div className="stat-label">Appointments</div><div className="stat-value">{stats.appointments.total}</div><div className="stat-change">Across all statuses</div></div>
          <div className="stat-card"><div className="stat-label">Bed occupancy</div><div className="stat-value">{stats.beds.occupancyPct}%</div><div className="stat-change">{stats.beds.occupied}/{stats.beds.total} occupied</div></div>
          <div className="stat-card"><div className="stat-label">Collected / outstanding</div><div className="stat-value" style={{ fontSize: '1.4rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>₹{stats.billing.collected.toLocaleString()} / ₹{stats.billing.outstanding.toLocaleString()}</div><div className="stat-change">Manual records, no gateway</div></div>
        </div>
      )}

      <div className="grid-2">
        <div className="card" style={{ padding: 0, overflow: 'hidden', alignSelf: 'start' }}>
          <div className="section-header" style={{ padding: '16px 18px 12px', margin: 0 }}>
            <span className="section-title" style={{ margin: 0 }}>Doctor approvals</span>
            <span className="badge">{pending.length} pending</span>
          </div>
          {dl && <div style={{ padding: 18 }}><Loading label="Loading doctors…" /></div>}
          {derr && <div style={{ padding: 18 }}><ErrorState error={derr} onRetry={reloadDocs} /></div>}
          {!dl && !derr && pending.length === 0 && <div style={{ padding: 18 }}><EmptyState title="No pending approvals" /></div>}
          {pending.map((d) => (
            <div key={d.id} className="list-row" style={{ gridTemplateColumns: '1fr auto' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{d.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.specialty}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-sm" onClick={() => setStatus(d.id, 'rejected')}>Reject</button>
                <button className="btn btn-sm btn-primary" onClick={() => setStatus(d.id, 'approved')}>Approve</button>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ alignSelf: 'start' }}>
          <div className="section-title">What this dashboard does not show</div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            There is no audit-log viewer endpoint, no hardware telemetry, and no AI model
            telemetry in this backend — so this page shows none. The previous version listed
            a fabricated audit trail including an “ESP32 sync” and a “TFLite update”.
            Audit events are still written server-side on register, login, patient view, and
            record creation.
            {!pl && !perr && pats ? ` Patient directory currently holds ${pats.total} records.` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
