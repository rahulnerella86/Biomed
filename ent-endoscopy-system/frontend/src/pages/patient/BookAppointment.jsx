import { useState } from 'react';
import { mockDoctors, specialties, timeSlots } from '../../data/mockData';
import { Search, MapPin, Star, Calendar, Clock, CheckCircle } from 'lucide-react';

const STEPS = ['Choose Specialty', 'Select Doctor', 'Pick Date & Time', 'Confirm'];

export default function BookAppointment() {
  const [step, setStep] = useState(0);
  const [specialty, setSpecialty] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [type, setType] = useState('Teleconsult');
  const [reason, setReason] = useState('');
  const [booked, setBooked] = useState(false);

  const doctors = mockDoctors.filter(d => !specialty || d.specialty === specialty);
  const selectedDoctor = mockDoctors.find(d => d.id === doctorId);

  const handleBook = () => setBooked(true);

  if (booked) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
        <div className="card" style={{ maxWidth: 440, textAlign: 'center', padding: 48 }} >
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#f0fdf4', border: '3px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle size={36} color="#10b981" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontFamily: 'Outfit,sans-serif', fontWeight: 800, marginBottom: 8 }}>Appointment Confirmed!</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>Your appointment with <strong>{selectedDoctor?.name}</strong> has been booked for <strong>{date}</strong> at <strong>{time}</strong>.</p>
          <div style={{ background: 'var(--bg-hover)', borderRadius: 12, padding: 16, marginBottom: 20, textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[['Doctor', selectedDoctor?.name], ['Date', date], ['Time', time], ['Type', type]].map(([k, v]) => (
                <div key={k}><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>{k}</div><div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{v}</div></div>
              ))}
            </div>
          </div>
          <button className="btn btn-primary w-full" onClick={() => { setBooked(false); setStep(0); setSpecialty(''); setDoctorId(''); setDate(''); setTime(''); }}>Book Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div onClick={() => i < step && setStep(i)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: i < step ? 'pointer' : 'default' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: i <= step ? '#2563eb' : 'var(--bg-hover)', color: i <= step ? '#fff' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', border: `2px solid ${i <= step ? '#2563eb' : 'var(--border-color)'}`, transition: 'all 0.2s', flexShrink: 0 }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: i === step ? 700 : 500, color: i === step ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s}</span>
            </div>
            {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? '#2563eb' : 'var(--border-color)', margin: '0 12px', transition: 'background 0.3s' }} />}
          </div>
        ))}
      </div>

      <div className="card" style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Step 0: Specialty */}
        {step === 0 && (
          <div className="animate-slideUp">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Choose a Specialty</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
              {specialties.map(s => (
                <button key={s} onClick={() => { setSpecialty(s); setStep(1); }} style={{ padding: 16, border: `2px solid ${specialty === s ? '#2563eb' : 'var(--border-color)'}`, borderRadius: 12, background: specialty === s ? '#eff6ff' : 'var(--bg-input)', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem', color: specialty === s ? '#2563eb' : 'var(--text-primary)', transition: 'all 0.2s', textAlign: 'left' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🏥</div>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Doctor */}
        {step === 1 && (
          <div className="animate-slideUp">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>Select a Doctor</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>Showing {doctors.length} specialists for <strong>{specialty || 'all specialties'}</strong></p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {doctors.map(d => (
                <div key={d.id} onClick={() => { setDoctorId(d.id); setStep(2); }} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, border: `2px solid ${doctorId === d.id ? '#2563eb' : 'var(--border-color)'}`, borderRadius: 14, cursor: 'pointer', background: doctorId === d.id ? '#eff6ff' : 'var(--bg-card)', transition: 'all 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = doctorId === d.id ? '#2563eb' : 'var(--border-color)'}>
                  <div className="avatar avatar-lg" style={{ background: 'linear-gradient(135deg,#eff6ff,#f0fdfa)', color: '#2563eb', border: '2px solid #2563eb20', fontSize: '1.1rem' }}>{d.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{d.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 4 }}>{d.specialty} · {d.hospital}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}><Star size={13} fill="#f59e0b" />{d.rating}</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.consultations.toLocaleString()} consultations</span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.experience} yrs experience</span>
                    </div>
                  </div>
                  <span className={`badge ${d.status === 'approved' ? 'badge-green' : 'badge-yellow'}`}>{d.status}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="animate-slideUp">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Pick Date & Time</h3>
            <div className="grid-2" style={{ gap: 16, marginBottom: 20 }}>
              <div className="form-group">
                <label className="form-label">Select Date</label>
                <input className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
              </div>
              <div className="form-group">
                <label className="form-label">Consultation Type</label>
                <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                  <option>Teleconsult</option>
                  <option>In-Person</option>
                </select>
              </div>
            </div>
            {date && (
              <>
                <label className="form-label" style={{ marginBottom: 10, display: 'block' }}>Available Time Slots</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8, marginBottom: 20 }}>
                  {timeSlots.map(t => (
                    <button key={t} onClick={() => setTime(t)} style={{ padding: '10px 8px', border: `1.5px solid ${time === t ? '#2563eb' : 'var(--border-color)'}`, borderRadius: 10, background: time === t ? '#2563eb' : 'var(--bg-input)', color: time === t ? '#fff' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.15s' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label">Reason for Visit</label>
              <textarea className="form-textarea" value={reason} onChange={e => setReason(e.target.value)} placeholder="Describe your symptoms or reason for consultation…" rows={3} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
              <button className="btn btn-primary" onClick={() => date && time && setStep(3)} disabled={!date || !time}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && selectedDoctor && (
          <div className="animate-slideUp">
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Confirm Appointment</h3>
            <div style={{ background: 'var(--bg-hover)', borderRadius: 14, padding: 20, marginBottom: 20 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[['Doctor', selectedDoctor.name], ['Specialty', selectedDoctor.specialty], ['Hospital', selectedDoctor.hospital], ['Date', date], ['Time', time], ['Type', type]].map(([k, v]) => (
                  <div key={k}><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{k}</div><div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{v}</div></div>
                ))}
              </div>
              {reason && <div style={{ marginTop: 16 }}><div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Reason</div><div style={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{reason}</div></div>}
            </div>
            <div className="alert alert-blue" style={{ marginBottom: 20 }}>
              <Calendar size={16} />
              <span>You'll receive a confirmation notification and reminder before your appointment.</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
              <button className="btn btn-primary" onClick={handleBook}>✓ Confirm Booking</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
