import { useState } from 'react';
import { Upload, Info } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Honest patient scan-intake page. No diagnosis model, no TFLite inference, no
 * heatmaps, and no confidence scores exist in this repository — the previous
 * version generated a RANDOM disease label with a random confidence value.
 * This page now only uploads the image for clinician review and states that
 * plainly. Patients see storage status, never a software diagnosis.
 */
export default function AIScanResults() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [stored, setStored] = useState(null);

  const pick = (f) => {
    setError(''); setStored(null);
    if (!f) return;
    if (!['image/jpeg', 'image/png'].includes(f.type)) { setError('Only JPEG or PNG images are accepted.'); return; }
    if (f.size > 10 * 1024 * 1024) { setError('File is larger than 10 MB.'); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async () => {
    if (!file) return;
    setBusy(true); setError('');
    try {
      const token = localStorage.getItem('medicore_token');
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_BASE}/api/v1/ai/analyze-image`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: fd,
      });
      if (!res.ok) throw new Error(await res.text());
      setStored(await res.json());
    } catch (e) {
      setError(typeof e?.message === 'string' ? e.message : 'Upload failed. Check that the API is running.');
    } finally { setBusy(false); }
  };

  return (
    <div className="animate-fadeIn">
      <div className="clinical-header">
        <div>
          <p className="eyebrow eyebrow--pine">Scans · Clinician review required</p>
          <h1 style={{ marginTop: 8 }}>Submit a scan image</h1>
          <p className="page-subtitle">Stored for doctor review — this software does not diagnose</p>
        </div>
        <span className="ai-flag">No diagnosis model configured</span>
      </div>

      <div className="card" style={{ marginBottom: 16, display: 'flex', gap: 10, alignItems: 'flex-start', maxWidth: 720 }}>
        <Info size={16} style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Uploaded images are stored and queued for your doctor. <strong>No automated finding,
          confidence score, or heatmap is produced.</strong> Your doctor&rsquo;s written note in
          your medical record is the only clinical interpretation.
        </p>
      </div>

      <div className="card" style={{ maxWidth: 720 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>JPEG or PNG · max 10 MB</div>
        {!preview ? (
          <label style={{ border: '1px dashed var(--border-strong)', borderRadius: 8, padding: 40, textAlign: 'center', cursor: 'pointer', display: 'block', background: 'var(--bg-wash)' }}>
            <Upload size={28} style={{ margin: '0 auto 10px' }} />
            <p style={{ fontWeight: 600 }}>Choose an image to submit</p>
            <input type="file" accept="image/jpeg,image/png" hidden onChange={(e) => pick(e.target.files?.[0])} />
          </label>
        ) : (
          <div>
            <img src={preview} alt="Scan preview" style={{ width: '100%', borderRadius: 8, border: '1px solid var(--border-color)', maxHeight: 320, objectFit: 'cover' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => { setFile(null); setPreview(''); setStored(null); }}>Remove</button>
              <button className="btn btn-primary btn-sm" disabled={busy} onClick={submit}>{busy ? 'Submitting…' : 'Submit for doctor review'}</button>
            </div>
          </div>
        )}
        {error && <p style={{ color: 'var(--color-error)', fontSize: '0.85rem', marginTop: 12 }}>{error}</p>}
        {stored && (
          <div style={{ marginTop: 14 }}>
            <span className="badge badge-yellow">Received · queued for clinician review</span>
            <div className="kv" style={{ marginTop: 10 }}><span>Stored at</span><span style={{ fontSize: '0.76rem' }}>{stored.url}</span></div>
            <div className="kv"><span>Software diagnosis</span><span>None — not configured</span></div>
          </div>
        )}
      </div>
    </div>
  );
}
