/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import dhanushImg from "./Assests/dhanush.png";

/* ── EMAILJS CONFIG ─────────────────────────────────────────────
   service_h1gcxwm | template_wl3kwtg | 6kyfkbopfamqRwb_s
   Make sure your EmailJS template has:
   {{from_name}} {{from_email}} {{event_type}} {{message}}
──────────────────────────────────────────────────────────────── */
const EJS = {
  serviceId:  "service_h1gcxwm",
  templateId: "template_3gk0aun",
  publicKey:  "6kyfkbopfamqRwb_s",
};

async function sendEmail(params) {
  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id:      EJS.serviceId,
      template_id:     EJS.templateId,
      user_id:         EJS.publicKey,
      template_params: params,
    }),
  });
  if (!res.ok) throw new Error("EmailJS send failed");
}

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const PROJECTS = [
  { name: "Anandha Kondattam",     loc: "Singapore",    tag: "International", bg: "linear-gradient(145deg,#1A1208,#3A2010)" },
  { name: "Chennai Sangamam",      loc: "Chennai",       tag: "City Festival",  bg: "linear-gradient(145deg,#120A08,#3A1A0A)" },
  { name: "Indian Dance Festival", loc: "Mamallapuram",  tag: "Cultural",       bg: "linear-gradient(145deg,#0A1208,#1A2A12)" },
  { name: "Made of Chennai",       loc: "YMCA Madras",   tag: "Concert",        bg: "linear-gradient(145deg,#0A0E18,#182030)" },
  { name: "Neithal Kalai Vizha",   loc: "Thoothukudi",   tag: "Folk Festival",  bg: "linear-gradient(145deg,#180A12,#301826)" },
  { name: "Kalai Sangamam",        loc: "Kanchipuram",   tag: "Arts Festival",  bg: "linear-gradient(145deg,#121808,#243014)" },
  { name: "Happy Streets",         loc: "Chennai",       tag: "Community",      bg: "linear-gradient(145deg,#180E08,#3A2010)" },
  { name: "Kalai Kadhambam",       loc: "Tamil Nadu",    tag: "Show Director",  bg: "linear-gradient(145deg,#0E0808,#281818)" },
  { name: "Super Singer",          loc: "Vijay TV",      tag: "Television",     bg: "linear-gradient(145deg,#08121A,#102030)" },
  { name: "Background Score",      loc: "Tamil Cinema",  tag: "Film",           bg: "linear-gradient(145deg,#120A18,#241830)" },
];

const GALLERY_ITEMS = [
  { title: "Anandha Kondattam",             meta: "Singapore",    tag: "International", cat: "international" },
  { title: "Chennai Sangamam",               meta: "Chennai",      tag: "City Festival",  cat: "festival" },
  { title: "Indian Dance Festival",          meta: "Mamallapuram", tag: "Cultural",       cat: "festival" },
  { title: "Made of Chennai Concert",        meta: "YMCA Madras",  tag: "Concert",        cat: "concert" },
  { title: "Neithal Kalai Vizha",            meta: "Thoothukudi",  tag: "Folk Festival",  cat: "festival" },
  { title: "Kalai Sangamam",                 meta: "Kanchipuram",  tag: "Arts Festival",  cat: "festival" },
  { title: "Happy Streets",                  meta: "Chennai",      tag: "Community",      cat: "festival" },
  { title: "Kalai Kadhambam",               meta: "Tamil Nadu",   tag: "Show Director",  cat: "festival" },
  { title: "Super Singer",                   meta: "Vijay TV",     tag: "Television",     cat: "tv" },
  { title: "Background Score — Tamil Films", meta: "Cinema",       tag: "Film",           cat: "tv" },
];

const GALLERY_PALETTES = [
  "linear-gradient(145deg,#8B3A10,#C9A84C,#3a1808)",
  "linear-gradient(145deg,#1a0803,#7A3810,#B63A0E)",
  "linear-gradient(145deg,#2a1005,#A04A18,#C9A84C)",
  "linear-gradient(145deg,#0d0603,#3B2010,#8B4010)",
  "linear-gradient(145deg,#6B2F08,#B63A0E,#1a0803)",
  "linear-gradient(145deg,#3a1a05,#C9A84C,#7a3810)",
  "linear-gradient(145deg,#100803,#8B3A10,#E8C878)",
  "linear-gradient(145deg,#0a0503,#5C3010,#A04A18)",
  "linear-gradient(145deg,#1a0d03,#C9A84C,#B63A0E)",
  "linear-gradient(145deg,#2a1508,#7A3810,#C9A84C)",
];

const CLASSES = [
  { icon: "🥁", name: "Paraiattam",            sub: "High-energy traditional drum performance" },
  { icon: "🏺", name: "Karagattam",            sub: "Balance & dance with decorated pots" },
  { icon: "🗡️", name: "Silambattam",           sub: "Traditional martial art with sticks" },
  { icon: "🐎", name: "Poikaal Kuthiraiattam", sub: "Dummy horse festival dance" },
  { icon: "🦚", name: "Mayilattam",            sub: "Peacock-inspired graceful dance" },
  { icon: "🐂", name: "Maadattam",             sub: "Bull-themed folk village dance" },
  { icon: "🌾", name: "Oyilattam",             sub: "Group rhythmic coordinated dance" },
  { icon: "🎶", name: "Grammiya Paadal",       sub: "Folk singing & cultural storytelling" },
  { icon: "🎵", name: "Thavil",               sub: "Classical temple percussion" },
  { icon: "🎺", name: "Nadaswaram",            sub: "Traditional wind instrument" },
  { icon: "🔥", name: "Devarattam",            sub: "Warrior dance — power & rhythm" },
];

const SHOWS = [
  { icon: "🥁", name: "Paraiattam",            sub: "Grand stage drum ensemble" },
  { icon: "🎶", name: "Nayyandi Melam",        sub: "Vibrant processional music" },
  { icon: "🏺", name: "Karagattam",            sub: "Balance dance spectacle" },
  { icon: "🐎", name: "Poikaal Kuthiraiattam", sub: "Festival horse dance" },
  { icon: "🦚", name: "Mayilattam",            sub: "Graceful peacock performance" },
  { icon: "🐂", name: "Maadattam",             sub: "Traditional bull dance" },
  { icon: "🌾", name: "Oyilattam",             sub: "Rhythmic group dance" },
  { icon: "🎵", name: "Thavil",               sub: "Powerful temple percussion" },
  { icon: "🎺", name: "Nadaswaram",            sub: "Sacred wind instrument" },
  { icon: "🔥", name: "Devarattam",            sub: "Warrior battle dance" },
  { icon: "🥁", name: "Thudumbattam",          sub: "Ancient drum folk art" },
  { icon: "🗡️", name: "Silambattam",           sub: "Martial stick performance" },
  { icon: "🎭", name: "Bommalattam",           sub: "Traditional puppet theatre" },
  { icon: "🥁", name: "Chendamelam",           sub: "Kerala-Tamil fusion drum" },
  { icon: "🌟", name: "Nasik Doll",            sub: "Processional doll dance" },
  { icon: "👑", name: "Rajamelam",             sub: "Royal court music ensemble" },
];

const AWARDS = [
  { icon: "🏆", title: "Best Student Artist",  org: "Education Minister, Tamil Nadu" },
  { icon: "🌟", title: "Best Artist Award",    org: "Nanban Organisation" },
  { icon: "🎖️", title: "Best Musician",        org: "IIT Madras Cultural Fest" },
  { icon: "👑", title: "Fine Musician Honour", org: "Kanimozhi Karunanidhi MP" },
];

const MEDIA = [
  { emoji: "🥁", label: "Chennai Sangamam — Live Performance", bg: "linear-gradient(135deg,#1A1208,#3A2010)" },
  { emoji: "🎭", label: "Anandha Kondattam — Singapore",       bg: "linear-gradient(135deg,#120A08,#3A1808)" },
  { emoji: "🦚", label: "Mayilattam — Stage Performance",      bg: "linear-gradient(135deg,#0A1208,#1A2A12)" },
  { emoji: "🎵", label: "Thavil — Temple Concert",             bg: "linear-gradient(135deg,#0A0E18,#182030)" },
  { emoji: "🗡️", label: "Silambattam — Demo",                  bg: "linear-gradient(135deg,#180A12,#301826)" },
  { emoji: "🎓", label: "Workshop Session",                    bg: "linear-gradient(135deg,#121808,#243014)" },
  { emoji: "📺", label: "Super Singer — Vijay TV",             bg: "linear-gradient(135deg,#180E08,#3A2010)" },
];

const TIMELINE = [
  { year: "2010", icon: "🌱", title: "First Beat",         desc: "Discovered Parai drum at age 8 through cultural gatherings in Chennai — the ancient rhythm spoke to him immediately." },
  { year: "2015", icon: "🥁", title: "Formal Training",    desc: "Began rigorous training under Thanjai David, mastering 12 traditional rhythmic compositions of Parai." },
  { year: "2018", icon: "🎭", title: "First Stage Show",   desc: "Performed at Chennai Sangamam before thousands — earning recognition for his powerful stage presence." },
  { year: "2020", icon: "🏆", title: "State Recognition",  desc: "Received Best Student Artist award from the Tamil Nadu Education Minister for preserving folk traditions." },
  { year: "2022", icon: "✈️", title: "International Stage",desc: "Took Tamil folk arts to Singapore with Anandha Kondattam — representing India on an international platform." },
  { year: "2024", icon: "🌟", title: "Cultural Educator",  desc: "Now actively teaching 17+ art forms, running workshops across schools, colleges and cultural institutions." },
];

const NAV_LINKS = ["gallery", "about", "projects", "services", "media", "contact"];

/* ══════════════════════════════════════════════════
   CANVAS HOOK
══════════════════════════════════════════════════ */
function useCanvas(canvasRef, ready) {
  useEffect(() => {
    if (!ready) return;
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let W, H, pts = [], rings = [], raf;

    const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    class Pt {
      constructor(init) {
        this.x  = Math.random() * W;
        this.y  = init ? Math.random() * H : H + 5;
        this.r  = 0.3 + Math.random() * 1.2;
        this.s  = 0.15 + Math.random() * 0.4;
        this.op = 0.05 + Math.random() * 0.25;
        this.dx = (Math.random() - 0.5) * 0.3;
      }
      step() {
        this.y -= this.s;
        this.x += this.dx;
        if (this.y < -5) { this.y = H + 5; this.x = Math.random() * W; }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${this.op})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 100; i++) pts.push(new Pt(true));

    const spawnRing = () => {
      rings.push({ x: W / 2, y: H * 0.55, r: 0, max: Math.max(W, H) * 0.65, sp: 1.2 });
      setTimeout(spawnRing, 3500 + Math.random() * 2000);
    };
    setTimeout(spawnRing, 2500);

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const g = ctx.createRadialGradient(W / 2, H * 0.5, 0, W / 2, H * 0.5, H * 0.8);
      g.addColorStop(0, "rgba(30,18,5,0.2)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      pts.forEach(p => { p.step(); p.draw(); });
      rings = rings.filter(r => {
        r.r += r.sp;
        const life = 1 - r.r / r.max;
        if (life <= 0) return false;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,168,76,${life * 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        return true;
      });
      raf = requestAnimationFrame(frame);
    };
    frame();

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [ready]);
}

/* ══════════════════════════════════════════════════
   CURSOR HOOK
══════════════════════════════════════════════════ */
function useCursor() {
  const [dot, setDot]   = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [hov, setHov]   = useState(false);
  const cur = useRef({ x: 0, y: 0 });
  const rng = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = e => {
      cur.current = { x: e.clientX, y: e.clientY };
      setDot({ x: e.clientX, y: e.clientY });
    };
    document.addEventListener("mousemove", move);
    const tick = () => {
      rng.current.x += (cur.current.x - rng.current.x) * 0.12;
      rng.current.y += (cur.current.y - rng.current.y) * 0.12;
      setRing({ ...rng.current });
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => document.removeEventListener("mousemove", move);
  }, []);

  return { dot, ring, hov, setHov };
}

/* ══════════════════════════════════════════════════
   REVEAL HOOK  (resets on page change so back-nav works)
══════════════════════════════════════════════════ */
function useReveal(dep) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("vis");
        else e.target.classList.remove("vis");
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .svc-cell, .ap-tl-item, .ap-mentor-card, .ap-award-card"
    ).forEach(el => obs.observe(el));

    return () => obs.disconnect();
  }, [dep]);
}

/* ══════════════════════════════════════════════════
   COUNTER HOOK
══════════════════════════════════════════════════ */
function useCounters(dep) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el     = e.target;
        const target = +el.dataset.count;
        const dur    = 1400;
        let start    = null;
        const step   = ts => {
          if (!start) start = ts;
          const p    = Math.min((ts - start) / dur, 1);
          const ease = 1 - (1 - p) ** 3;
          el.textContent = Math.floor(ease * target) + (p >= 1 ? "+" : "");
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });

    document.querySelectorAll("[data-count]").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [dep]);
}

/* ══════════════════════════════════════════════════
   BOOKING FORM COMPONENT  (used in page + modal)
══════════════════════════════════════════════════ */
function BookingForm({ onSuccess }) {
  const [fd, setFd] = useState({ name: "", email: "", event: "", message: "" });
  const [filled, setFilled] = useState({ name: false, email: false, event: false, message: false });
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  const update = (k, v) => {
    setFd(prev => ({ ...prev, [k]: v }));
    setFilled(prev => ({ ...prev, [k]: v.length > 0 }));
  };

  const handle = async e => {
    e.preventDefault();
    setSending(true);
    setErr("");
    try {

       await sendEmail({
  name:    fd.name,
  email:   fd.email,
  message: fd.event + " — " + fd.message,
});
      
      onSuccess();
    } catch (ex) {
      setErr("Failed to send. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="booking-form" onSubmit={handle}>
      {/* Name */}
      <div className={`form-field ${filled.name ? "filled" : ""}`}>
        <label>Your Name</label>
        <input type="text" value={fd.name} onChange={e => update("name", e.target.value)} required />
        <div className="field-glow" />
      </div>

      {/* Email */}
      <div className={`form-field ${filled.email ? "filled" : ""}`}>
        <label>Email Address</label>
        <input type="email" value={fd.email} onChange={e => update("email", e.target.value)} required />
        <div className="field-glow" />
      </div>

      {/* Event type */}
      <div className={`form-field ${filled.event ? "filled" : ""}`}>
        <label>Event Type</label>
        <select value={fd.event} onChange={e => update("event", e.target.value)} required>
          <option value="" />
          {["Stage Performance", "Cultural Festival", "Workshop", "Wedding",
            "Television / Film", "School / College Event", "Other"].map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <div className="field-glow" />
      </div>

      {/* Message */}
      <div className={`form-field ${filled.message ? "filled" : ""}`}>
        <label>Message / Event Details</label>
        <textarea rows="3" value={fd.message} onChange={e => update("message", e.target.value)} />
        <div className="field-glow" />
      </div>

      {err && <div className="form-error">{err}</div>}

      <button type="submit" className="submit-btn" disabled={sending}>
        {sending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

/* ══════════════════════════════════════════════════
   ABOUT PAGE COMPONENT
══════════════════════════════════════════════════ */
function AboutPage({ onBack, H, L, magMove, magLeave }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  useReveal("about-page");
  useCounters("about-page");

  return (
    <div className="ap-wrap">

      {/* Top nav */}
      <nav className="ap-nav">
        <button className="ap-back-btn" onClick={onBack} onMouseEnter={H} onMouseLeave={L}>
          ← Back
        </button>
        <div className="ap-nav-title">Dhanushkodi <em>Adhitiyan</em></div>
        <div style={{ width: "80px" }} />
      </nav>

      {/* Hero */}
      <div className="ap-hero">
        <div className="ap-hero-img-col reveal-left">
          <div className="ap-hero-img-frame">
            <img src={dhanushImg} alt="Dhanushkodi Adhitiyan" />
            <div className="ap-hero-img-overlay" />
          </div>
          <div className="ap-hero-img-decor">
            <strong>10+</strong>Years of<br />Tradition
          </div>
        </div>

        <div className="reveal-right" style={{ transitionDelay: ".15s" }}>
          <div className="ap-hero-eyebrow">Tamil Folk Arts · Percussionist · Educator</div>
          <h1 className="ap-hero-name">Dhanushkodi<br /><em>Adhitiyan</em></h1>
          <div className="ap-degrees">
            <span className="ap-deg">B.Com CS</span>
            <span className="ap-deg">MA Public Administration</span>
          </div>
          <div className="ap-roles">
            <span className="ap-role">Percussionist & Performer</span>
            <span className="ap-role">Parai Educator</span>
          </div>
          <blockquote className="ap-quote">
            "Rhythm is not music — it is life.<br />
            Every beat carries a thousand years of Tamil heritage."
          </blockquote>
          <div className="ap-hero-chips">
            {["Folk Arts", "Parai", "Karagattam", "Silambattam", "Mayilattam", "Thavil", "Nadaswaram"].map(c => (
              <span key={c} className="ap-chip">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="ap-story">
        <div className="ap-story-watermark">STORY</div>
        <div className="ap-story-inner">
          <div className="sec-label reveal">The Story</div>
          <h2 className="sec-title reveal" style={{ transitionDelay: ".1s", marginBottom: "3rem" }}>
            A Life <em>Lived in Rhythm</em>
          </h2>
          <p className="reveal" style={{ transitionDelay: ".15s" }}>
            Born and raised in the cultural heart of Tamil Nadu,{" "}
            <strong>Dhanushkodi Adhitiyan</strong> discovered the Parai drum at the age of eight —
            not in a classroom, but through the living, breathing tradition of community celebration.
            The ancient instrument spoke to him in a language deeper than words.
          </p>
          <p className="reveal" style={{ transitionDelay: ".2s" }}>
            Over <em>10+ years</em>, he has dedicated himself to mastering not just Parai, but{" "}
            <strong>17 distinct Tamil folk art forms</strong> — from the martial elegance of
            Silambattam to the devotional grace of Mayilattam. Each form is a thread in the vast
            tapestry of Tamil cultural identity.
          </p>
          <p className="reveal" style={{ transitionDelay: ".25s" }}>
            Guided by master musicians <strong>Paul Jacob</strong> (Music Director) and{" "}
            <strong>Thanjai David</strong> (Parai Maestro), Dhanush transformed raw passion into
            refined artistry. His performances have graced stages from <em>Chennai Sangamam</em> to{" "}
            <em>Singapore's Anandha Kondattam</em>.
          </p>
          <p className="reveal" style={{ transitionDelay: ".3s" }}>
            Today, Dhanush is not just a performer — he is a{" "}
            <strong>guardian of living heritage</strong>. Through workshops in schools, colleges,
            and cultural institutions, he ensures that the ancient rhythms of Tamil Nadu echo into
            the future.
          </p>
        </div>
      </div>

      {/* Mentors */}
      <div className="ap-mentors">
        <div className="sec-label reveal">Guided By</div>
        <h2 className="sec-title reveal" style={{ transitionDelay: ".1s" }}>
          Mentors & <em>Masters</em>
        </h2>
        <div className="ap-mentors-grid">
          {[
            {
              name: "Paul Jacob", role: "Music Director", emoji: "🎵",
              desc: "A celebrated Music Director who shaped Dhanush's understanding of classical structure and contemporary folk fusion.",
            },
            {
              name: "Thanjai David", role: "Parai Maestro", emoji: "🥁",
              desc: "A living legend of the Parai tradition from Thanjavur — under whose guidance Dhanush mastered the sacred drum.",
            },
          ].map(m => (
            <div key={m.name} className="ap-mentor-card" onMouseEnter={H} onMouseLeave={L}>
              <div className="ap-mentor-avatar">
                {/* Replace emoji with: <img src="paul.jpg" alt={m.name}/> */}
                {m.emoji}
              </div>
              <div>
                <div className="ap-mentor-name">{m.name}</div>
                <div className="ap-mentor-role">{m.role}</div>
                <div className="ap-mentor-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="ap-timeline">
        <div className="sec-label reveal">The Journey</div>
        <h2 className="sec-title reveal" style={{ transitionDelay: ".1s", marginBottom: "3.5rem" }}>
          Milestones in <em>Rhythm</em>
        </h2>
        <div className="ap-tl-inner">
          {TIMELINE.map((t, i) => (
            <div key={i} className="ap-tl-item reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
              <div className="ap-tl-dot">{t.icon}</div>
              <div className="ap-tl-content">
                <div className="ap-tl-year">{t.year}</div>
                <div className="ap-tl-title">{t.title}</div>
                <div className="ap-tl-desc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="ap-awards">
        <div className="sec-label reveal">Recognition</div>
        <h2 className="sec-title reveal" style={{ transitionDelay: ".1s" }}>
          Awards & <em>Honours</em>
        </h2>
        <div className="ap-awards-grid">
          {AWARDS.map((a, i) => (
            <div key={i} className="ap-award-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="ap-award-icon">{a.icon}</div>
              <div>
                <div className="ap-award-title">{a.title}</div>
                <div className="ap-award-org">{a.org}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Return CTA */}
      <div className="ap-back-cta">
        <button
          className="ap-back-cta-btn"
          onClick={onBack}
          onMouseEnter={H}
          onMouseMove={e => magMove(e, e.currentTarget)}
          onMouseLeave={e => { L(); magLeave(e.currentTarget); }}
        >
          <span>← Return to Portfolio</span>
        </button>
      </div>

    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════ */
export default function App() {

  /* ── State ── */
  const [page, setPage]               = useState("home");
  const [preCount, setPreCount]       = useState(0);
  const [preReady, setPreReady]       = useState(false);
  const [canvasOn, setCanvasOn]       = useState(false);
  const [navStuck, setNavStuck]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [activeTab, setActiveTab]     = useState("classes");
  const [filter, setFilter]           = useState("all");
  const [modalOpen, setModalOpen]     = useState(false);
  const [modalDone, setModalDone]     = useState(false);
  const [contactDone, setContactDone] = useState(false);
  const [previewPos, setPreviewPos]   = useState({ left: 0, top: 0 });
  const [previewOn, setPreviewOn]     = useState(false);
  const [previewBg, setPreviewBg]     = useState("");

  /* ── Refs ── */
  const canvasRef  = useRef(null);
  const projTrack  = useRef(null);
  const drag       = useRef({ on: false, sx: 0, sl: 0 });
  const tStart     = useRef(0);
  const tScroll    = useRef(0);

  /* ── Custom hooks ── */
  const { dot, ring, hov, setHov } = useCursor();
  useCanvas(canvasRef, canvasOn);
  useReveal(activeTab + "|" + page);   // re-runs on tab change OR page change
  useCounters(page);

  /* ── Preloader animation ── */
  useEffect(() => {
    const dur = 2200;
    const t0  = performance.now();
    const step = now => {
      const t    = Math.min((now - t0) / dur, 1);
      const ease = 1 - (1 - t) ** 3;
      setPreCount(Math.round(ease * 100));
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setPreReady(true);
          setTimeout(() => setCanvasOn(true), 300);
        }, 300);
      }
    };
    requestAnimationFrame(step);
  }, []);

  /* ── Sticky nav ── */
  useEffect(() => {
    const fn = () => setNavStuck(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Scroll ripple ── */
  useEffect(() => {
    let lastY = 0;
    const fn = () => {
      if (Math.abs(window.scrollY - lastY) > 100) {
        lastY = window.scrollY;
        const el = document.createElement("div");
        el.className = "scroll-ripple";
        el.style.cssText = `left:${window.innerWidth / 2}px;top:${window.innerHeight / 2}px`;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 900);
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Hero parallax ── */
  useEffect(() => {
    const fn = () => {
      if (window.scrollY < window.innerHeight) {
        const n = document.querySelector(".hero-name");
        const q = document.querySelector(".hero-tagline");
        if (n) n.style.transform = `translateY(${window.scrollY * 0.07}px)`;
        if (q) q.style.transform = `translateY(${window.scrollY * 0.04}px)`;
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── Gallery preview follow ── */
  useEffect(() => {
    const fn = e => {
      const pw = 200, ph = 270;
      let x = e.clientX + 28;
      let y = e.clientY - 70;
      if (x + pw > window.innerWidth  - 12) x = e.clientX - pw - 28;
      if (y + ph > window.innerHeight - 12) y = window.innerHeight - ph - 12;
      if (y < 12) y = 12;
      setPreviewPos({ left: x, top: y });
    };
    document.addEventListener("mousemove", fn);
    return () => document.removeEventListener("mousemove", fn);
  }, []);

  /* ── Project drag ── */
  const onDragStart = useCallback(e => {
    drag.current = {
      on: true,
      sx: e.pageX - projTrack.current.offsetLeft,
      sl: projTrack.current.scrollLeft,
    };
  }, []);
  const onDragMove = useCallback(e => {
    if (!drag.current.on) return;
    e.preventDefault();
    projTrack.current.scrollLeft =
      drag.current.sl - (e.pageX - projTrack.current.offsetLeft - drag.current.sx) * 1.2;
  }, []);
  const onDragEnd = useCallback(() => { drag.current.on = false; }, []);

  /* ── Magnetic buttons ── */
  const magMove = useCallback((e, el) => {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width  / 2) * 0.2}px,${(e.clientY - r.top  - r.height / 2) * 0.2}px)`;
  }, []);
  const magLeave = useCallback(el => { el.style.transform = ""; }, []);

  /* ── Helpers ── */
  const H = () => setHov(true);
  const L = () => setHov(false);

  const openModal  = () => { setModalOpen(true);  setModalDone(false); };
  const closeModal = () => setModalOpen(false);

  const goAbout = () => { setPage("about"); window.scrollTo(0, 0); };
  const goHome  = () => { setPage("home");  setTimeout(() => window.scrollTo(0, 0), 50); };

  const filtered   = filter === "all" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === filter);
  const renumbered = filtered.map((g, i) => ({ ...g, num: String(i + 1).padStart(2, "0") }));
  const currentList = activeTab === "classes" ? CLASSES : SHOWS;

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <>
      {/* Persistent elements */}
      <div className="grain" />
      <canvas ref={canvasRef} className={`bg-canvas${canvasOn ? " visible" : ""}`} />

      {/* Cursor */}
      <div className={`cursor-dot${hov ? " hov" : ""}`} style={{ transform: `translate(${dot.x}px,${dot.y}px)` }}>
        <div className="cursor-dot-inner" />
      </div>
      <div className={`cursor-ring${hov ? " hov" : ""}`} style={{ transform: `translate(${ring.x}px,${ring.y}px)` }}>
        <div className="cursor-ring-inner" />
      </div>

      {/* Preloader */}
      <div className={`preloader${preReady ? " out" : ""}`}>
        <div className="pre-top">
          <div className="pre-logo">Dhanushkodi <em>Adhitiyan</em></div>
          <div className="pre-status">Loading Experience</div>
        </div>
        <div className="pre-mid">
          <div className="pre-count">{preCount}</div>
          <div className="pre-track">
            <div className="pre-fill" style={{ width: `${preCount}%` }} />
          </div>
        </div>
        <div className="pre-bot">
          <div className="pre-tagline">Echoes of Tamil Rhythm</div>
          <div className="pre-pct">%</div>
        </div>
      </div>

      {/* ── ABOUT PAGE ── */}
      {page === "about" && (
        <AboutPage onBack={goHome} H={H} L={L} magMove={magMove} magLeave={magLeave} />
      )}

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <>

          {/* ─ NAV ─ */}
          <nav className={`nav${navStuck ? " stuck" : ""}`}>
            <a href="#hero" className="nav-logo" onMouseEnter={H} onMouseLeave={L}>
              Dhanushkodi <em>A</em>
              <small>Percussionist & Performer</small>
            </a>

            <ul className="nav-links">
              {NAV_LINKS.map(s => (
                <li key={s}>
                  <a href={`#${s}`} onMouseEnter={H} onMouseLeave={L}>{s}</a>
                </li>
              ))}
            </ul>

            {/* Hamburger */}
            <button className="nav-ham" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <span /><span /><span />
            </button>

            <button
              className="nav-cta"
              onClick={openModal}
              onMouseEnter={H}
              onMouseMove={e => magMove(e, e.currentTarget)}
              onMouseLeave={e => { L(); magLeave(e.currentTarget); }}
            >
              Book Now
            </button>
          </nav>

          {/* Mobile Menu */}
          <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
            <button className="nav-mobile-close" onClick={() => setMenuOpen(false)}>✕</button>
            {NAV_LINKS.map(s => (
              <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)}>
                {s}
              </a>
            ))}
            <button
              className="nav-mobile-cta"
              onClick={() => { setMenuOpen(false); openModal(); }}
            >
              Book Now
            </button>
          </div>

          {/* ─ HERO ─ */}
          <section id="hero" className="hero">
            <div className="hero-bg" />
            <div className="particles-wrap">
              {Array.from({ length: 14 }, (_, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${5 + i * 6.5}%`,
                    "--dx": `${(i % 2 === 0 ? 1 : -1) * (20 + i * 4)}px`,
                    animationDuration:  `${10 + i * 0.9}s`,
                    animationDelay:     `${i * 0.5}s`,
                    width:  `${1 + i % 3 * 0.5}px`,
                    height: `${1 + i % 3 * 0.5}px`,
                  }}
                />
              ))}
            </div>

            <div className="hero-img-wrap">
              <div className="hero-img-frame">
                <div className="hero-img-inner">
                  <img src={dhanushImg} alt="Dhanushkodi Adhitiyan" />
                  <div className="hero-img-glow" />
                </div>
                <div className="hero-img-border" />
              </div>
            </div>

            <div className="hero-content">
              <div className="hero-eyebrow">
                <div className="hero-eyebrow-line" />
                <span className="hero-eyebrow-text">Tamil Folk Arts</span>
              </div>
              <h1 className="hero-name">
                Dhanushkodi<br /><em>Adhitiyan</em>
              </h1>
              <div className="hero-degrees">
                <span className="hero-deg">B.Com CS</span>
                <span className="hero-deg-sep">·</span>
                <span className="hero-deg">MA Public Administration</span>
              </div>
              <div className="hero-roles">
                <span className="hero-role-tag">Percussionist & Performer</span>
                <span className="hero-role-tag">Parai Educator</span>
              </div>
              <blockquote className="hero-tagline">
                "Rhythm is not music —<br />it is <em>life</em>"
              </blockquote>
              <div className="hero-btns">
                <button
                  className="btn btn-gold"
                  onClick={() => document.getElementById("media").scrollIntoView({ behavior: "smooth" })}
                  onMouseEnter={H}
                  onMouseMove={e => magMove(e, e.currentTarget)}
                  onMouseLeave={e => { L(); magLeave(e.currentTarget); }}
                >
                  <span>▶ Watch Performance</span>
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={openModal}
                  onMouseEnter={H}
                  onMouseMove={e => magMove(e, e.currentTarget)}
                  onMouseLeave={e => { L(); magLeave(e.currentTarget); }}
                >
                  Book a Show
                </button>
              </div>
            </div>

            <div className="hero-scroll">
              <span className="hero-scroll-text">Scroll</span>
              <div className="hero-scroll-bar" />
            </div>
          </section>

          {/* ─ MARQUEE ─ */}
          <div className="marquee-band" aria-hidden="true">
            <div className="marquee-inner">
              {[...SHOWS, ...SHOWS].map((s, i) => <span key={i}>{s.name}</span>)}
            </div>
          </div>

          {/* ─ GALLERY ─ */}
          <section id="gallery" className="gallery-sec">
            <div className="gallery-header reveal">
              <div>
                <div className="sec-label">Gallery</div>
                <h2 className="sec-title">Selected<br /><em>Performances</em></h2>
              </div>
              <div className="gallery-count">{renumbered.length} works</div>
            </div>

            <div className="filter-row reveal" style={{ transitionDelay: "0.1s" }}>
              {[["all", "All"], ["international", "International"], ["festival", "Festival"],
                ["tv", "TV / Film"], ["concert", "Concert"]].map(([k, l]) => (
                <button
                  key={k}
                  className={`filter-btn${filter === k ? " active" : ""}`}
                  onClick={() => setFilter(k)}
                  onMouseEnter={H}
                  onMouseLeave={L}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="gallery-list">
              {renumbered.map((g, i) => (
                <div
                  key={g.title}
                  className="gallery-item reveal"
                  style={{ transitionDelay: `${i * 0.04}s` }}
                  onMouseEnter={() => { H(); setPreviewBg(GALLERY_PALETTES[i % GALLERY_PALETTES.length]); setPreviewOn(true); }}
                  onMouseLeave={() => { L(); setPreviewOn(false); }}
                >
                  <div className="gi-num">{g.num}</div>
                  <div className="gi-title">{g.title}</div>
                  <div className="gi-meta">{g.meta}</div>
                  <div className="gi-tag">{g.tag}</div>
                </div>
              ))}
            </div>

            <div
              className={`gallery-preview${previewOn ? " active" : ""}`}
              style={{ left: previewPos.left, top: previewPos.top, background: previewBg }}
            />
          </section>

          {/* ─ ABOUT ─ */}
          <section id="about" className="about-sec">
            <div className="about-watermark">DHANUSH</div>
            <div className="about-grid">
              <div>
                <div className="sec-label reveal">The Artist</div>
                <h2 className="sec-title reveal" style={{ transitionDelay: ".1s" }}>
                  Rhythm is not<br />music — <em>it is life</em>
                </h2>
                <p className="about-body reveal" style={{ transitionDelay: ".2s" }}>
                  10+ years of experience in traditional and contemporary folk performance.{" "}
                  <strong>Dhanushkodi Adhitiyan</strong> brings the ancient heartbeat of Tamil
                  culture to stages across the world, preserving art forms that speak beyond language.
                </p>

                <div className="mentor-block reveal" style={{ transitionDelay: ".3s" }}>
                  <div className="mentor-label">Mentored & Guided By</div>
                  {[
                    { name: "Paul Jacob",    role: "Music Director", emoji: "🎵" },
                    { name: "Thanjai David", role: "Parai Maestro",  emoji: "🥁" },
                  ].map(m => (
                    <div key={m.name} className="mentor-card" onMouseEnter={H} onMouseLeave={L}>
                      <div className="mentor-photo">{m.emoji}</div>
                      <div>
                        <div className="mentor-name-text">{m.name}</div>
                        <div className="mentor-role-text">{m.role}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  className="about-page-cta reveal"
                  style={{ transitionDelay: ".4s" }}
                  onClick={goAbout}
                  onMouseEnter={H}
                  onMouseLeave={L}
                >
                  <span>Read Full Story</span>
                  <span className="arrow">→</span>
                </button>
              </div>

              <div className="about-right">
                <div className="reveal" style={{ transitionDelay: ".1s" }}>
                  <div className="about-sub-label">Recognised By</div>
                  <div className="badge-row">
                    {["IIT Madras", "Education Minister", "Kanimozhi Karunanidhi MP", "Nanban Organisation"].map(b => (
                      <span key={b} className="badge" onMouseEnter={H} onMouseLeave={L}>{b}</span>
                    ))}
                  </div>
                </div>
                <div style={{ width: "100%", height: "1px", background: "var(--line)" }} className="reveal" />
                <div className="reveal" style={{ transitionDelay: ".3s" }}>
                  <div className="about-sub-label">By the Numbers</div>
                  {[
                    { count: 10, desc: <> Years of active<br />performance & teaching</> },
                    { count: 17, desc: <> Art forms performed<br />& taught</> },
                    { count: 10, desc: <> Major events across<br />India & internationally</> },
                  ].map(({ count, desc }, i) => (
                    <div key={i} className="stat-row">
                      <div className="stat-num" data-count={count}>0</div>
                      <div className="stat-desc">{desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─ PROJECTS ─ */}
          <section id="projects" className="projects-sec">
            <div className="sec-label reveal">Stage Presence</div>
            <h2 className="sec-title reveal" style={{ transitionDelay: ".1s" }}>
              Featured <em>Performances</em>
            </h2>
            <p className="proj-hint reveal" style={{ transitionDelay: ".2s" }}>← Drag to explore →</p>

            <div className="proj-scroll-wrap">
              <div
                className="proj-track"
                ref={projTrack}
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
                onTouchStart={e => { tStart.current = e.touches[0].pageX; tScroll.current = projTrack.current.scrollLeft; }}
                onTouchMove={e => { projTrack.current.scrollLeft = tScroll.current - (e.touches[0].pageX - tStart.current) * 1.1; }}
              >
                {PROJECTS.map((p, i) => (
                  <div key={p.name} className="proj-card" onMouseEnter={H} onMouseLeave={L}>
                    <div className="proj-card-bg" style={{ background: p.bg }} />
                    <div className="proj-overlay">
                      <div className="proj-bg-num">0{i + 1}</div>
                      <div className="proj-tag-label">{p.tag}</div>
                      <div className="proj-name">{p.name}</div>
                      <div className="proj-loc">📍 {p.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─ EXPERIENCE & AWARDS ─ */}
          <section id="exp-awards" className="exp-awards-sec">
            <div className="ea-grid">
              <div className="reveal-left">
                <div className="sec-label">Experience</div>
                <div className="big-stat-num">10+</div>
                <div className="big-stat-label">Years of Craft</div>
                <p className="exp-description" style={{ marginTop: "1.5rem" }}>
                  Performing and teaching Tamil folk arts across stages, schools, temples,
                  television, and international festivals.
                </p>
              </div>
              <div className="reveal-right" style={{ transitionDelay: ".15s" }}>
                <div className="sec-label">Recognition</div>
                <div className="awards-list">
                  {AWARDS.map((a, i) => (
                    <div key={i} className="award-item" onMouseEnter={H} onMouseLeave={L}>
                      <div className="award-icon-box">{a.icon}</div>
                      <div>
                        <div className="award-title-text">{a.title}</div>
                        <div className="award-org-text">{a.org}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─ SERVICES ─ */}
          <section id="services" className="services-sec">
            <div className="sec-label reveal">Repertoire</div>
            <h2 className="sec-title reveal" style={{ transitionDelay: ".1s" }}>
              Classes & <em>Shows</em>
            </h2>
            <div className="toggle-wrap reveal" style={{ transitionDelay: ".2s" }}>
              <div
                className="toggle-slider"
                style={{ width: "50%", transform: `translateX(${activeTab === "classes" ? "0%" : "100%"})` }}
              />
              {["classes", "shows"].map(t => (
                <button
                  key={t}
                  className={`toggle-btn${activeTab === t ? " active" : ""}`}
                  onClick={() => setActiveTab(t)}
                  onMouseEnter={H}
                  onMouseLeave={L}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="svc-grid">
              {currentList.map((s, i) => (
                <div
                  key={`${activeTab}-${i}`}
                  className="svc-cell"
                  style={{ transitionDelay: `${(i % 4) * 0.07}s` }}
                  onMouseEnter={H}
                  onMouseLeave={L}
                >
                  <div className="svc-cell-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="svc-icon">{s.icon}</div>
                  <div className="svc-name">{s.name}</div>
                  <div className="svc-sub">{s.sub}</div>
                  <div className="svc-line" />
                </div>
              ))}
            </div>
          </section>

          {/* ─ MEDIA ─ */}
          <section id="media" className="media-sec">
            <div className="sec-label reveal">Visual Archive</div>
            <h2 className="sec-title reveal" style={{ transitionDelay: ".1s" }}>
              Watch & <em>Feel</em>
            </h2>
            <div className="media-grid reveal" style={{ transitionDelay: ".2s" }}>
              {MEDIA.map((m, i) => (
                <div key={i} className="media-item" onMouseEnter={H} onMouseLeave={L}>
                  <div className="media-inner">
                    {/* Replace placeholder with real image/video:
                        <img src="show.jpg" style={{width:"100%",height:"100%",objectFit:"cover"}}/> */}
                    <div className="media-placeholder" style={{ background: m.bg }}>
                      <span>{m.emoji}</span>
                      <span className="media-placeholder-label">{m.label}</span>
                    </div>
                    <div className="media-hover-overlay">
                      <div className="media-play">▶</div>
                    </div>
                  </div>
                  <div className="media-caption">{m.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ─ BOOKING / CONTACT ─ */}
          <section id="contact" className="booking-sec">
            <div className="booking-grid">
              <div className="reveal-left">
                <div className="sec-label">Get in Touch</div>
                <div className="booking-num">Book<br /><em>Now</em></div>
                <p className="booking-desc">
                  Available for performances, workshops, cultural shows, television, film,
                  and collaborations. Based in Chennai — performing globally.
                </p>
                <div className="contact-list">
                  <div className="contact-row"><span className="contact-icon">📍</span> Chennai, Tamil Nadu, India</div>
                  <div className="contact-row"><span className="contact-icon">✉️</span> aadhikalaikoodam@gmail.com</div>
                  <div className="contact-row"><span className="contact-icon">📞</span> +91 63811 45510</div>
                  <div className="contact-row"><span className="contact-icon">📸</span> @dhanushkodi_adhityan</div>
                </div>
              </div>

              <div className="reveal-right" style={{ transitionDelay: ".15s" }}>
                {!contactDone ? (
                  <BookingForm onSuccess={() => setContactDone(true)} />
                ) : (
                  <div className="success-state">
                    <div className="success-icon">🥁</div>
                    <div className="success-title">Message Sent!</div>
                    <p className="success-desc" style={{ marginTop: "0.6rem" }}>
                      Thank you — Dhanush's team will reach you within 24 hours.
                    </p>
                    <div className="success-tamil" style={{ marginTop: "1.5rem" }}>
                      பறை – கலையும் · கல்வியும்
                    </div>
                    <button
                      className="btn btn-ghost"
                      style={{ marginTop: "1.5rem", cursor: "pointer" }}
                      onClick={() => setContactDone(false)}
                    >
                      Send Another
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ─ FOOTER ─ */}
          <footer className="footer">
            <div className="footer-top">
              <div>
                <div className="footer-logo">Dhanushkodi <em>Adhitiyan</em></div>
                <div className="footer-logo-sub">Percussionist · Performer · Parai Educator</div>
              </div>
              <div className="footer-links-grid">
                {[
                  { title: "Explore",   links: [["gallery","Gallery"],["about","About"],["projects","Projects"],["services","Services"],["media","Media"],["contact","Contact"]] },
                  { title: "Offerings", links: [["#","Live Performances"],["#","Workshops"],["#","Cultural Shows"],["#","School Programs"],["#","Film BGM"]] },
                  { title: "Connect",   links: [["#","Instagram"],["#","YouTube"],["#","Facebook"],["#","LinkedIn"]] },
                ].map(g => (
                  <div key={g.title} className="footer-link-group">
                    <div className="footer-link-group-title">{g.title}</div>
                    {g.links.map(([href, label]) => (
                      <a
                        key={label}
                        href={`#${href.replace("#", "")}`}
                        className="footer-link"
                        onMouseEnter={H}
                        onMouseLeave={L}
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="footer-bottom">
              <span className="footer-copy">© 2026 Gopika.krishnaa — All rights reserved.</span>
              <div className="footer-wave">
                {Array.from({ length: 10 }, (_, i) => (
                  <div
                    key={i}
                    className="footer-wave-bar"
                    style={{ animationDelay: `${i * 0.1}s`, height: `${4 + Math.abs(Math.sin(i)) * 6}px` }}
                  />
                ))}
              </div>
              <span className="footer-tamil">கலையும் ★ கல்வியும்</span>
            </div>
          </footer>

          {/* ─ MODAL ─ */}
          {modalOpen && (
            <div
              className="modal-bg"
              onClick={e => { if (e.target.classList.contains("modal-bg")) closeModal(); }}
            >
              <div className="modal-box">
                <button className="modal-close-btn" onClick={closeModal} onMouseEnter={H} onMouseLeave={L}>✕</button>

                {!modalDone ? (
                  <>
                    <div className="modal-title">Book a Show</div>
                    <div className="modal-sub">We'll reach you within 24 hours.</div>
                    <BookingForm onSuccess={() => setModalDone(true)} />
                  </>
                ) : (
                  <div className="success-state">
                    <div className="success-icon">🥁</div>
                    <div className="success-title">Booking Received!</div>
                    <p className="success-desc" style={{ marginTop: "0.8rem" }}>
                      Thank you — Dhanush's team will contact you within 24 hours.
                    </p>
                    <div className="success-tamil">பறை – கலையும் · கல்வியும்</div>
                    <button
                      className="btn btn-ghost"
                      style={{ marginTop: "1.5rem", cursor: "pointer" }}
                      onClick={closeModal}
                      onMouseEnter={H}
                      onMouseLeave={L}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </>
      )}
    </>
  );
}