import { useNavigate } from 'react-router-dom';

const OPERATIONS = [
  { t: 'Appointments', d: 'Search doctors, check live availability, book, reschedule or cancel. Double-booking is prevented at the database level.' },
  { t: 'Records & prescriptions', d: 'Vitals, diagnosis, treatment timelines, digital prescriptions and lab orders — all tied to the patient, all auditable.' },
  { t: 'Labs, pharmacy, billing, beds', d: 'Test tracking with S3/Blob report storage, medicine inventory, itemised billing and ward management.' },
];

export default function LandingPage() {
  const nav = useNavigate();
  return (
    <div className="ed-page">
      <nav className="ed-nav">
        <div className="ed-brand">
          <div className="ed-mark">M</div>
          <div className="ed-wordmark">MediCore<small>Hospital System</small></div>
        </div>
        <div className="ed-links">
          <a href="#care">Platform</a>
          <a href="#intelligence">Clinical intelligence</a>
          <a href="#endoscopy">Endoscopy</a>
          <a href="#operations">Operations</a>
          <a href="#cloud">Cloud</a>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-sm" onClick={() => nav('/login/patient')}>Sign in</button>
          <button className="btn btn-primary btn-sm" onClick={() => nav('/portals')}>Choose portal</button>
        </div>
      </nav>

      {/* Hero — asymmetric editorial composition */}
      <header className="ed-hero">
        <div>
          <p className="eyebrow eyebrow--pine">MediCore HMS &middot; Cloud &middot; ENT Endoscopy</p>
          <h1 style={{ marginTop: 16 }}>Healthcare,<br />without <em>the friction.</em></h1>
          <p className="ed-standfirst">
            One calm platform for appointments, medical records, labs, pharmacy,
            billing and beds — with endoscopy image review and a provider-based
            hospital assistant alongside the workflow, both clearly labelled for
            what they are.
          </p>
          <div className="ed-actions">
            <button className="btn btn-primary" onClick={() => nav('/portals')}>Enter the hospital portal</button>
            <button className="btn" onClick={() => document.getElementById('care')?.scrollIntoView({ behavior: 'smooth' })}>See how it works</button>
          </div>
          <p style={{ marginTop: 22, fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: 460, lineHeight: 1.6 }}>
            AI-generated information is for educational and administrative assistance only
            and is not a medical diagnosis. Always consult a qualified professional.
          </p>
        </div>
        <figure className="ed-figure">
          <img
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1400&auto=format&fit=crop"
            alt="Clinician reviewing imaging in a quiet hospital corridor"
            loading="eager"
          />
          <figcaption className="ed-figcaption">
            <span>St. Aurelia General &middot; ENT Suite 04</span>
            <span>08:12 &middot; Morning list</span>
          </figcaption>
        </figure>
      </header>

      <dl className="ed-meta-row">
        <div><dt>Departments</dt><dd>10</dd></div>
        <div><dt>Live beds tracked</dt><dd>83</dd></div>
        <div><dt>Roles supported</dt><dd>07</dd></div>
        <div><dt>Deployment</dt><dd style={{ fontSize: '1.15rem', paddingTop: 6 }}>AWS &middot; Azure &middot; Docker</dd></div>
      </dl>

      {/* 01 Connected care */}
      <section className="ed-section" id="care">
        <div><span className="ed-index">01 — Connected care</span></div>
        <div>
          <h2>The hospital, on one page.</h2>
          <p className="ed-lede">
            Patients book in seconds. Doctors open the day and see exactly what matters.
            Reception, nursing, pharmacy and lab work from the same record — JWT-secured,
            role-checked, and audit-logged on every sensitive action.
          </p>
          <div className="ed-split">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
              alt="Doctor consulting with patient over records"
              loading="lazy"
            />
            <ul className="ed-list">
              <li><span className="ed-num">a.</span><div><strong>Patient journey</strong><p>Register, find a doctor, check availability, book, reschedule, review prescriptions, reports and bills.</p></div></li>
              <li><span className="ed-num">b.</span><div><strong>Doctor day</strong><p>Today&rsquo;s list, patient history, notes, prescriptions, lab requests — in that order.</p></div></li>
              <li><span className="ed-num">c.</span><div><strong>Staff floor</strong><p>Beds, admissions, dispensing, results and billing, with permissions enforced server-side.</p></div></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 02 Clinical intelligence */}
      <section className="ed-section" id="intelligence">
        <div><span className="ed-index">02 — Clinical intelligence</span></div>
        <div>
          <h2>AI that stays in its lane.</h2>
          <p className="ed-lede">
            Triage guidance, visit summaries and draft impressions appear inline where
            clinicians already work. Every suggestion is labelled as a draft, requires
            approval, and never replaces judgement. Providers are swappable: mock,
            Azure OpenAI or AWS Bedrock.
          </p>
          <div className="ed-split">
            <ul className="ed-list">
              <li><span className="ed-num">i.</span><div><strong>Symptom guidance, with guardrails</strong><p>Structured questions, safety disclaimers, emergency escalation — no definitive diagnosis.</p></div></li>
              <li><span className="ed-num">ii.</span><div><strong>Summaries that need a signature</strong><p>AI drafts are visually distinct from confirmed notes until a doctor approves them.</p></div></li>
              <li><span className="ed-num">iii.</span><div><strong>Ops insights</strong><p>Load, no-shows and turnaround patterns for administrators, without patient data leakage.</p></div></li>
            </ul>
            <img
              src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop"
              alt="Clinical imaging review on hospital display"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 03 Endoscopy */}
      <section className="ed-section" id="endoscopy">
        <div><span className="ed-index">03 — ENT Endoscopy</span></div>
        <div>
          <h2>A real review workflow for scope images.</h2>
          <p className="ed-lede">
            Upload an endoscopy image, preview it, queue it for clinician review, and save
            written findings to the medical record. No endoscope hardware, device stream,
            or automated diagnosis is included — and the interface does not pretend otherwise.
          </p>
          <div className="ed-split">
            <img
              src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=1200&auto=format&fit=crop"
              alt="ENT examination equipment in clinical use"
              loading="lazy"
            />
            <div>
              <ul className="ed-list">
                <li><span className="ed-num">1.</span><div><strong>Upload</strong><p>JPEG/PNG intake with validation, stored on the API server.</p></div></li>
                <li><span className="ed-num">2.</span><div><strong>Queue</strong><p>Images wait for a clinician — the software returns no diagnosis.</p></div></li>
                <li><span className="ed-num">3.</span><div><strong>Review</strong><p>The doctor&rsquo;s written note is saved to the EMR as the only interpretation.</p></div></li>
              </ul>
              <div style={{ marginTop: 20 }}>
                <button className="btn btn-secondary" onClick={() => nav('/login/doctor')}>Open the doctor portal</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Operations */}
      <section className="ed-section" id="operations">
        <div><span className="ed-index">04 — Operations</span></div>
        <div>
          <h2>Everything the hospital bills, stocks and sleeps in.</h2>
          <p className="ed-lede">Core operations backed by a real API and database — with honest limits: manual payment records (no gateway), local file storage (no S3), and no video-calling or device integrations.</p>
          <div className="ed-ops">
            {OPERATIONS.map((o) => (
              <div key={o.t}>
                <p className="eyebrow" style={{ marginBottom: 10 }}>Module</p>
                <h3>{o.t}</h3>
                <p>{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 Cloud */}
      <div className="ed-cloud" id="cloud">
        <div className="ed-cloud-inner">
          <div>
            <p className="eyebrow" style={{ color: '#9DBEA9' }}>05 — Cloud infrastructure</p>
            <h2 style={{ marginTop: 12 }}>Boring in the best way: managed, monitored, reproducible.</h2>
            <p style={{ marginTop: 14, lineHeight: 1.65 }}>
              Containerised FastAPI behind a load balancer, managed PostgreSQL,
              object storage for reports, secrets in a vault, structured logs and
              a health endpoint. Same compose file runs locally and informs
              production on ECS / Container Apps.
            </p>
            <div style={{ marginTop: 22, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="badge" style={{ background: 'transparent', color: '#C9D1CB', borderColor: '#2A342E' }}>PostgreSQL · RDS / Azure PG</span>
              <span className="badge" style={{ background: 'transparent', color: '#C9D1CB', borderColor: '#2A342E' }}>ECS Fargate · Container Apps</span>
              <span className="badge" style={{ background: 'transparent', color: '#C9D1CB', borderColor: '#2A342E' }}>S3 · Blob · Bedrock · OpenAI</span>
            </div>
          </div>
          <pre className="ed-pipe">{`User → CDN / Static Web Apps
  → React (S3 + CloudFront / SWA)
  → ALB → FastAPI (ECS / App Runner)
  → PostgreSQL (RDS / Azure PG)
  → AI (Bedrock / Azure OpenAI)
  → S3 / Blob (lab reports)
  → CloudWatch / App Insights`}</pre>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '1.8rem' }}>Start with the portal that matches your role.</h2>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn" onClick={() => nav('/login/patient')}>Patient sign in</button>
          <button className="btn btn-primary" onClick={() => nav('/portals')}>All portals</button>
        </div>
      </div>

      <footer className="ed-footer">
        <span>MediCore HMS · Cloud Computing Project · v2.0-hms</span>
        <span>Demo: admin / doctor / patient @ medicore.demo · demo123</span>
        <span>Not a diagnostic device. Educational use.</span>
      </footer>
    </div>
  );
}
