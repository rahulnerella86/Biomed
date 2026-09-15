import { api } from '../../services/api';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function Notifications() {
  const { data, loading, error, reload } = useApi('/api/v1/notifications?limit=50');
  const list = data?.data || [];

  const markRead = async (id) => {
    try { await api.post(`/api/v1/notifications/${id}/read`, {}); reload(); }
    catch { /* reload shows the error state */ }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Inbox · fetched from the API on each visit</p>
          <h1 style={{ marginTop: 8 }}>Notifications</h1>
          <p className="page-subtitle">{data?.unread ? `${data.unread} unread` : 'No push or realtime channel — check here for updates'}</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>
      {loading && <Loading label="Loading notifications…" />}
      {error && <ErrorState error={error} onRetry={reload} />}
      {!loading && !error && list.length === 0 && <EmptyState title="No notifications" hint="Appointment and lab updates from staff appear here." />}
      {list.map((n) => (
        <div key={n.id} className="card" style={{ marginBottom: 10, opacity: n.read ? 0.75 : 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{n.title}</div>
            <span className="badge">{n.type}</span>
          </div>
          {n.message && <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: 6 }}>{n.message}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{n.created_at ? new Date(n.created_at).toLocaleString() : ''}</span>
            {!n.read && <button className="btn btn-sm btn-ghost" onClick={() => markRead(n.id)}>Mark read</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
