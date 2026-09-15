import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

export default function MyReports() {
  const { data: labs, loading: ll, error: le, reload: reloadLabs } = useApi('/api/v1/labs/reports?limit=50');
  const { data: recs, loading: rl, error: re, reload: reloadRecs } = useApi('/api/v1/medical-records?limit=50');
  const labList = labs?.data || [];
  const recList = recs?.data || [];
  const reload = () => { reloadLabs(); reloadRecs(); };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Results · live from database</p>
          <h1 style={{ marginTop: 8 }}>My reports</h1>
          <p className="page-subtitle">Lab results and clinical notes</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      <div className="section-title">Lab reports</div>
      {ll && <Loading label="Loading lab reports…" />}
      {le && <ErrorState error={le} onRetry={reloadLabs} />}
      {!ll && !le && labList.length === 0 && <EmptyState title="No lab reports yet" />}
      {labList.map((r) => (
        <div key={r.id} className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{r.test_id}</div>
            <span className={`badge ${r.status === 'COMPLETED' ? 'badge-green' : 'badge-yellow'}`}>{r.status}</span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
            {r.priority ? `${r.priority} · ` : ''}{r.result_file_url ? `File stored: ${r.result_file_url}` : 'Result file not yet uploaded'}
          </div>
        </div>
      ))}

      <div className="section-title" style={{ marginTop: 24 }}>Clinical notes</div>
      {rl && <Loading label="Loading notes…" />}
      {re && <ErrorState error={re} onRetry={reloadRecs} />}
      {!rl && !re && recList.length === 0 && <EmptyState title="No clinical notes yet" />}
      {recList.map((r) => (
        <div key={r.id} className="card" style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 600 }}>{r.diagnosis || 'Note'}{r.is_ai_generated === 'draft' && <span className="ai-flag" style={{ marginLeft: 8 }}>AI draft · review required</span>}</div>
          {r.notes && <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: 4 }}>{r.notes}</p>}
        </div>
      ))}
    </div>
  );
}
