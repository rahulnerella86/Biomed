import { useState } from 'react';
import { api } from '../../services/api';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';

const MANUAL_METHODS = ['Cash', 'Card-Terminal', 'Bank-Transfer', 'UPI-Manual'];

export default function Billing() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useApi('/api/v1/bills?limit=50');
  const [busy, setBusy] = useState('');
  const [msg, setMsg] = useState('');
  const canCollect = ['admin', 'receptionist'].includes(user?.role);
  const bills = data?.data || [];
  const paid = bills.filter((b) => (b.status || '').toUpperCase() === 'PAID');
  const pending = bills.filter((b) => (b.status || '').toUpperCase() !== 'PAID');

  const recordPayment = async (bill, method) => {
    setBusy(bill.id); setMsg('');
    try {
      await api.post(`/api/v1/bills/${bill.id}/pay`, { method });
      setMsg(`Payment recorded (${method}). No gateway involved.`);
      reload();
    } catch (e) { setMsg(e?.message || 'Could not record payment.'); }
    finally { setBusy(''); }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Invoices · manual collection only</p>
          <h1 style={{ marginTop: 8 }}>Billing</h1>
          <p className="page-subtitle">No payment gateway is configured — staff record offline payments</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="stat-card"><div className="stat-label">Collected</div><div className="stat-value" style={{ fontSize: '1.8rem' }}>₹{paid.reduce((s, b) => s + (b.total || 0), 0).toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-label">Outstanding</div><div className="stat-value" style={{ fontSize: '1.8rem' }}>₹{pending.reduce((s, b) => s + (b.total || 0), 0).toLocaleString()}</div></div>
        <div className="stat-card"><div className="stat-label">Invoices</div><div className="stat-value">{bills.length}</div></div>
      </div>

      {msg && <div className="card" style={{ marginBottom: 12, fontSize: '0.86rem' }}>{msg}</div>}
      {loading && <Loading label="Loading invoices…" />}
      {error && <ErrorState error={error} onRetry={reload} />}
      {!loading && !error && bills.length === 0 && <EmptyState title="No invoices yet" hint="Invoices are created by reception or doctors." />}

      {!loading && !error && bills.map((b) => (
        <div key={b.id} className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>{b.patient_id} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.8rem' }}>· {b.id}</span></div>
              <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', marginTop: 4 }}>₹{(b.total || 0).toLocaleString()}</div>
            </div>
            <span className={`badge ${(b.status || '').toUpperCase() === 'PAID' ? 'badge-green' : 'badge-yellow'}`}>{b.status}{b.payment_method ? ` · ${b.payment_method}` : ''}</span>
          </div>
          {canCollect && (b.status || '').toUpperCase() !== 'PAID' && (
            <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="eyebrow">Record manual payment:</span>
              {MANUAL_METHODS.map((m) => (
                <button key={m} className="btn btn-sm" disabled={busy === b.id} onClick={() => recordPayment(b, m)}>{m}</button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
