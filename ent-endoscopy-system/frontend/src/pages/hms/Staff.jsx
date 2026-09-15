import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function Staff() {
  const { data: doctors, loading: dl, error: de, reload: reloadDocs } = useApi('/api/v1/doctors?limit=100');
  const { data: users, loading: ul, error: ue, reload: reloadUsers } = useApi('/api/v1/users?limit=100');
  const docList = doctors?.data || (Array.isArray(doctors) ? doctors : []);
  const userList = users?.data || [];
  const reload = () => { reloadDocs(); reloadUsers(); };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">People · live from database</p>
          <h1 style={{ marginTop: 8 }}>Doctors &amp; staff</h1>
          <p className="page-subtitle">{docList.length} doctors · user directory below (admin only)</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
        <div className="section-header" style={{ padding: '16px 18px 12px', margin: 0 }}>
          <span className="section-title" style={{ margin: 0 }}>Doctors</span>
        </div>
        {dl && <div style={{ padding: 18 }}><Loading label="Loading doctors…" /></div>}
        {de && <div style={{ padding: 18 }}><ErrorState error={de} onRetry={reloadDocs} /></div>}
        {!dl && !de && docList.length === 0 && <div style={{ padding: 18 }}><EmptyState title="No doctors found" /></div>}
        {docList.map((d) => (
          <div key={d.id} className="list-row" style={{ gridTemplateColumns: '1fr auto' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{d.name || d.full_name} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.8rem' }}>· {d.specialty || d.specialization || 'General'}</span></div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.department || d.department_id || ''} {d.status ? `· ${d.status}` : ''}</div>
            </div>
            {d.status ? <span className="badge">{d.status}</span> : null}
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="section-header" style={{ padding: '16px 18px 12px', margin: 0 }}>
          <span className="section-title" style={{ margin: 0 }}>User accounts</span>
          <span className="eyebrow">Admin only</span>
        </div>
        {ul && <div style={{ padding: 18 }}><Loading label="Loading users…" /></div>}
        {ue && <div style={{ padding: 18 }}><ErrorState error="User directory requires an admin account." onRetry={reloadUsers} /></div>}
        {!ul && !ue && userList.map((u) => (
          <div key={u.id} className="list-row" style={{ gridTemplateColumns: '1fr auto' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{u.full_name || u.name || u.email}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{u.email}</div>
            </div>
            <span className="badge">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
