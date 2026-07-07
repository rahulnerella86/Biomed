import { useAuth } from '../../contexts/AuthContext';
import { User, Phone, Mail, Droplets, Edit2, Save, Shield, Lock } from 'lucide-react';
import { useState } from 'react';

export default function PatientProfile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', email: user?.email || '', bloodGroup: user?.bloodGroup || '', age: user?.age || '' });

  return (
    <div className="animate-fadeIn" style={{ maxWidth: 700, margin: '0 auto' }}>
      {/* Profile Header */}
      <div className="card" style={{ marginBottom: 20, background: 'linear-gradient(135deg,#eff6ff,#f0fdfa)', border: '1px solid #2563eb20' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div className="avatar avatar-xl" style={{ background: 'linear-gradient(135deg,#2563eb,#0d9488)', color: '#fff', fontSize: '1.8rem', border: 'none' }}>{user?.avatar}</div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: 'Outfit,sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: 4 }}>{user?.name}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 8 }}>Patient · ID: {user?.id}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-teal">Verified Patient</span>
              <span className="badge badge-blue">{user?.bloodGroup}</span>
            </div>
          </div>
          <button className="btn btn-sm btn-outline" onClick={() => setEditing(e => !e)}>
            {editing ? <><Save size={14} /> Save</> : <><Edit2 size={14} /> Edit</>}
          </button>
        </div>
      </div>

      {/* Info Fields */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>Personal Information</div>
        <div className="grid-2" style={{ gap: 16 }}>
          {[
            { icon: User,     label: 'Full Name',    key: 'name',       type: 'text' },
            { icon: Phone,    label: 'Phone',         key: 'phone',      type: 'tel' },
            { icon: Mail,     label: 'Email',         key: 'email',      type: 'email' },
            { icon: Droplets, label: 'Blood Group',   key: 'bloodGroup', type: 'text' },
            { icon: User,     label: 'Age',           key: 'age',        type: 'number' },
          ].map(f => {
            const Icon = f.icon;
            return (
              <div key={f.key} className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Icon size={13} />{f.label}</label>
                {editing ? <input className="form-input" type={f.type} value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))} /> : <div style={{ padding: '10px 14px', background: 'var(--bg-hover)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{form[f.key] || '—'}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Security */}
      <div className="card">
        <div className="section-title" style={{ marginBottom: 16 }}>Security & Privacy</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { icon: Lock,   title: 'Change Password',    desc: 'Update your account password' },
            { icon: Shield, title: 'Two-Factor Auth',     desc: 'Add extra security to your account' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-hover)', borderRadius: 12, border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon size={18} color="var(--text-secondary)" />
                  <div><div style={{ fontWeight: 600, fontSize: '0.875rem' }}>{s.title}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.desc}</div></div>
                </div>
                <button className="btn btn-sm btn-ghost">Update</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
