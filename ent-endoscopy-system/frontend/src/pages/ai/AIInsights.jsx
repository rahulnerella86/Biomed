import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useApi, Loading, ErrorState, EmptyState } from '../../hooks/useApi';

/**
 * Descriptive operational overview. The previous version presented fabricated
 * forecasts (bed occupancy predictions, per-patient no-show risk scores, disease
 * trends, and a "94.2% accuracy" model badge) with no model behind them. This
 * page now shows only live database aggregates and labels them as such.
 */
export default function AIInsights() {
  const { data, loading, error, reload } = useApi('/api/v1/analytics/summary');
  const { data: trend } = useApi('/api/v1/analytics/appointments-by-day?limit=14');
  const chartData = (trend?.data || []).map((d) => ({ date: (d.date || '').slice(5), count: d.count }));

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Operations · descriptive counts, not predictions</p>
          <h1 style={{ marginTop: 8 }}>Operational overview</h1>
          <p className="page-subtitle">Computed live from the database · no forecasting model is configured</p>
        </div>
        <button className="btn btn-sm" onClick={reload}>Refresh</button>
      </div>

      {loading && <Loading label="Loading summary…" />}
      {error && <ErrorState error={error} onRetry={reload} />}
      {data && (
        <>
          <div className="grid-4" style={{ marginBottom: 20 }}>
            <div className="stat-card"><div className="stat-label">Appointments</div><div className="stat-value">{data.appointments.total}</div><div className="stat-change">{Object.entries(data.appointments.byStatus).map(([k, v]) => `${k}: ${v}`).join(' · ') || 'No breakdown'}</div></div>
            <div className="stat-card"><div className="stat-label">Bed occupancy</div><div className="stat-value">{data.beds.occupancyPct}%</div><div className="stat-change">{data.beds.occupied}/{data.beds.total} occupied</div></div>
            <div className="stat-card"><div className="stat-label">Collected</div><div className="stat-value" style={{ fontSize: '1.6rem' }}>₹{data.billing.collected.toLocaleString()}</div><div className="stat-change">Manual records</div></div>
            <div className="stat-card"><div className="stat-label">Lab reports</div><div className="stat-value">{data.labReports}</div><div className="stat-change">Stored reports</div></div>
          </div>
          <div className="card">
            <div className="section-title">Appointments by day (history)</div>
            {chartData.length === 0 ? <EmptyState title="No appointment history yet" /> : (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chartData}>
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={{ stroke: 'var(--border-color)' }} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#101614', color: '#EDE8DB', border: '1px solid #2A342E', borderRadius: 8 }} />
                  <Area type="monotone" dataKey="count" stroke="#174434" strokeWidth={2} fill="#174434" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            )}
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 10 }}>{data.note}</p>
          </div>
        </>
      )}
    </div>
  );
}
