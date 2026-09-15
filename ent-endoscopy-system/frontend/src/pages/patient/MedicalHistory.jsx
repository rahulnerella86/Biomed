import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

function RecordList({ records }) {
  return records.map((r) => (
    <div key={r.id} className="card" style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontWeight: 600 }}>{r.diagnosis || r.chief_complaint || 'Clinical note'}</div>
        {r.is_ai_generated === 'draft'
          ? <span className="ai-flag">AI draft · review required</span>
          : <span className="badge badge-green">Doctor-recorded</span>}
      </div>
      {r.symptoms && <p style={{ fontSize: '0.86rem', marginTop: 6 }}>Symptoms: {r.symptoms}</p>}
      {r.treatment && <p style={{ fontSize: '0.86rem', marginTop: 4 }}>Treatment: {r.treatment}</p>}
      {r.notes && <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: 4 }}>{r.notes}</p>}
      <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 8 }}>{r.created_at ? new Date(r.created_at).toLocaleString() : ''}</p>
    </div>
  ));
}

export function useMyRecords() {
  const rec = useApi('/api/v1/medical-records?limit=50');
  const labs = useApi('/api/v1/labs/reports?limit=50');
  return { rec, labs };
}

export default function MedicalHistory() {
  const { data, loading, error, reload } = useApi('/api/v1/medical-records?limit=50');
  const list = data?.data || [];

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Longitudinal record · live from database</p>
          <h1 style={{ marginTop: 8 }}>Medical history</h1>
          <p className="page-subtitle">Doctor-recorded notes are confirmed · AI drafts are always labelled</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>
      {loading && <Loading label="Loading history…" />}
      {error && <ErrorState error={error} onRetry={reload} />}
      {!loading && !error && list.length === 0 && <EmptyState title="No records yet" hint="Records added by your doctor appear here." />}
      <RecordList records={list} />
    </div>
  );
}
