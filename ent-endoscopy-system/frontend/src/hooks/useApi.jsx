import { useCallback, useEffect, useState } from 'react';
import { api } from '../services/api';

/** GETs a backend endpoint with loading / error / empty semantics. */
export function useApi(path, { auto = true } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(auto);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!path) return;
    setLoading(true); setError('');
    try {
      const res = await api.get(path);
      setData(res);
    } catch (e) {
      setError(e?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => { if (auto) load(); }, [load, auto]);
  return { data, loading, error, reload: load };
}

export function Loading({ label = 'Loading…' }) {
  return <div className="card" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{label}</div>;
}

export function ErrorState({ error, onRetry }) {
  return (
    <div className="card" style={{ borderColor: '#E3B7A9' }}>
      <p className="eyebrow" style={{ color: 'var(--color-error)', marginBottom: 8 }}>Couldn&rsquo;t load this data</p>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{error || 'The API request failed. Check that the backend is running.'}</p>
      {onRetry && <button className="btn btn-sm" style={{ marginTop: 12 }} onClick={onRetry}>Retry</button>}
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', hint }) {
  return (
    <div className="card" style={{ background: 'var(--bg-wash)' }}>
      <div style={{ fontWeight: 600 }}>{title}</div>
      {hint && <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginTop: 4 }}>{hint}</div>}
    </div>
  );
}
