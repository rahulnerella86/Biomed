import { mockAnalytics } from '../../data/mockData';
import { BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function DoctorAnalytics() {
  return (
    <div className="animate-fadeIn">
      {/* Hero */}
      <div style={{ marginBottom: 48, paddingBottom: 24, borderBottom: '4px solid var(--border-color)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.05em', lineHeight: 1 }}>
          Analytics <span style={{ color: 'var(--brand-red)' }}>Report.</span>
        </h1>
      </div>

      {/* Key stats in editorial big-number style */}
      <div className="grid-4" style={{ marginBottom: 48 }}>
        {[
          { label: 'Consultations',  value: '1,284', change: '+12%' },
          { label: 'AI Accuracy',    value: '94.8%', change: '+1.2%' },
          { label: 'Revenue (MTD)',  value: '₹4.8L',  change: '+8%' },
          { label: 'Avg Visit Time', value: '14m',   change: '-2m' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: 8, marginBottom: 16 }}>{s.label}</div>
            <div className="stat-value" style={{ color: i === 0 ? 'var(--brand-red)' : 'var(--text-primary)', fontSize: '2.8rem' }}>{s.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', marginTop: 12, color: 'var(--color-success)' }}>
              <TrendingUp size={14} />{s.change} vs last month
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginBottom: 32 }}>
        {/* Revenue chart */}
        <div className="card">
          <div style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: 16, marginBottom: 24 }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Revenue Growth</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>7-month trailing</div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={mockAnalytics.revenue}>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--border-light)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-primary)', fontWeight: 800 }} axisLine={{ stroke: 'var(--border-color)', strokeWidth: 2 }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)', fontWeight: 700 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${v/1000}k`} />
              <Tooltip contentStyle={{ background: '#0a0a0a', border: 'none', borderRadius: 0, color: '#fff', fontWeight: 800 }} itemStyle={{ color: '#e64833' }} />
              <Area type="step" dataKey="value" stroke="var(--brand-red)" strokeWidth={3} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Diagnosis distribution */}
        <div className="card">
          <div style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: 16, marginBottom: 24 }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Diagnosis Split</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Conditions treated</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', height: 240 }}>
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie data={mockAnalytics.diseaseDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value" strokeWidth={2} stroke="var(--bg-page)">
                  {mockAnalytics.diseaseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#e64833' : index === 1 ? '#0a0a0a' : '#666'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0a0a0a', border: 'none', borderRadius: 0, color: '#fff', fontWeight: 800 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ width: '50%', paddingLeft: 16 }}>
              {mockAnalytics.diseaseDistribution.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 10, height: 10, background: i === 0 ? '#e64833' : i === 1 ? '#0a0a0a' : '#666', border: '2px solid var(--border-color)', flexShrink: 0 }} />
                  <div style={{ flex: 1, fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                  <div style={{ fontWeight: 900, fontSize: '0.85rem' }}>{d.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Accuracy bar chart */}
      <div className="card">
        <div style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: 16, marginBottom: 24 }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>AI Model Accuracy</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Monthly confidence rate (%)</div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={mockAnalytics.aiAccuracy} barSize={48}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="var(--border-light)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-primary)', fontWeight: 800 }} axisLine={{ stroke: 'var(--border-color)', strokeWidth: 2 }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 700 }} axisLine={false} tickLine={false} domain={[80, 100]} />
            <Tooltip cursor={{ fill: 'var(--bg-hover)' }} contentStyle={{ background: '#0a0a0a', border: 'none', borderRadius: 0, color: '#fff', fontWeight: 800 }} itemStyle={{ color: '#e64833' }} />
            <Bar dataKey="value" fill="var(--brand-red)" radius={0} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
