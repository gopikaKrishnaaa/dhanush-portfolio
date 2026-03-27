import { useState, useEffect, useRef, useCallback } from "react";

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Tenor+Sans&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --bg:      #0C0905;
  --bg2:     #110D07;
  --bg3:     #181008;
  --gold:    #C9A84C;
  --gold2:   #E8C878;
  --gold3:   #8B6820;
  --amber:   #D4701A;
  --cream:   #F0E2C4;
  --muted:   rgba(240,226,196,0.45);
  --line:    rgba(201,168,76,0.18);
  --font-display: 'Cormorant Garamond', serif;
  --font-ui:      'Tenor Sans', sans-serif;
  --font-body:    'DM Sans', sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--cream);
  font-family: var(--font-body);
  overflow-x: hidden;
  cursor: none;
}
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--gold3); }

/* ── CURSOR ─────────────────────────────────────────────────────────── */
.cursor-dot {
  position: fixed; top: 0; left: 0; pointer-events: none; z-index: 99999;
  mix-blend-mode: difference;
  transition: transform 0.15s ease, opacity 0.3s;
}
.cursor-dot .inner {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--gold2);
  transform: translate(-50%, -50%);
  transition: width .3s, height .3s;
}
.cursor-dot.hovering .inner { width: 40px; height: 40px; background: rgba(201,168,76,0.25); }
.cursor-ring {
  position: fixed; top: 0; left: 0; pointer-events: none; z-index: 99998;
  transition: transform 0.4s cubic-bezier(0.16,1,.3,1);
}
.cursor-ring .ring {
  width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid rgba(201,168,76,0.5);
  transform: translate(-50%,-50%);
  transition: width .35s, height .35s, border-color .3s;
}
.cursor-ring.hovering .ring { width: 60px; height: 60px; border-color: var(--gold); }

/* ── NOISE GRAIN ────────────────────────────────────────────────────── */
.grain {
  position: fixed; inset: -200%; width: 400%; height: 400%;
  pointer-events: none; z-index: 9000; opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain 0.4s steps(1) infinite;
}
@keyframes grain {
  0%,100%{transform:translate(0,0)}10%{transform:translate(-3%,-4%)}20%{transform:translate(-6%,3%)}
  30%{transform:translate(4%,-2%)}40%{transform:translate(-2%,6%)}50%{transform:translate(-5%,0%)}
  60%{transform:translate(4%,4%)}70%{transform:translate(0,-5%)}80%{transform:translate(-3%,2%)}
  90%{transform:translate(5%,3%)}
}

/* ── NAV ─────────────────────────────────────────────────────────────── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 8000;
  display: flex; justify-content: space-between; align-items: center;
  padding: 2rem 5vw;
  mix-blend-mode: normal;
  transition: background 0.5s, padding 0.4s;
}
.nav.scrolled {
  background: rgba(12,9,5,0.92); backdrop-filter: blur(20px);
  padding: 1.2rem 5vw;
  border-bottom: 1px solid var(--line);
}
.nav-logo {
  font-family: var(--font-display);
  font-size: 1.4rem; font-weight: 600; letter-spacing: 4px;
  color: var(--gold2); text-transform: uppercase;
}
.nav-links { display: flex; gap: 2.5rem; list-style: none; }
.nav-links a {
  font-family: var(--font-ui); font-size: 0.72rem;
  letter-spacing: 2.5px; text-transform: uppercase;
  color: var(--muted); text-decoration: none;
  transition: color 0.3s;
}
.nav-links a:hover { color: var(--gold2); }
.nav-cta {
  font-family: var(--font-ui); font-size: 0.7rem; letter-spacing: 2px;
  text-transform: uppercase; color: var(--bg);
  background: var(--gold); border: none;
  padding: 0.65rem 1.6rem; cursor: none;
  transition: background 0.3s, transform 0.2s;
}
.nav-cta:hover { background: var(--gold2); transform: translateY(-1px); }

/* ── HERO ─────────────────────────────────────────────────────────────── */
.hero {
  position: relative; height: 100vh; overflow: hidden;
  display: flex; align-items: flex-end;
  padding: 0 5vw 8vh;
}
.hero-bg {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 80% 100% at 65% 0%, rgba(201,168,76,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 80% 80%, rgba(212,112,26,0.04) 0%, transparent 50%),
              var(--bg);
}
.hero-img-wrap {
  position: absolute; right: 5vw; top: 0; bottom: 0;
  width: 48%; display: flex; align-items: center; justify-content: center;
  animation: heroFloat 8s ease-in-out infinite;
}
@keyframes heroFloat {
  0%,100%{transform:translateY(0px) rotate(0.5deg)}
  50%{transform:translateY(-22px) rotate(-0.5deg)}
}
.hero-img-frame {
  position: relative; width: 100%; max-width: 520px;
  animation: heroFallIn 1.8s cubic-bezier(0.16,1,.3,1) both;
}
@keyframes heroFallIn {
  from { transform: translateY(-80px) scale(1.05); opacity: 0; }
  to   { transform: translateY(0) scale(1); opacity: 1; }
}
.hero-img-inner {
  width: 100%; aspect-ratio: 3/4;
  background: linear-gradient(160deg, #2A1A08 0%, #1A0E05 40%, #0C0905 100%);
  position: relative; overflow: hidden;
  clip-path: polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%);
}
.hero-img-inner svg { width: 100%; height: 100%; object-fit: cover; }
.hero-img-glow {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(201,168,76,0.12), transparent);
  animation: glowPulse 4s ease-in-out infinite;
}
@keyframes glowPulse {
  0%,100%{opacity:0.7} 50%{opacity:1.3}
}
.hero-img-border {
  position: absolute; inset: -1px;
  border: 1px solid rgba(201,168,76,0.25);
  clip-path: polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%);
}

/* Particles */
.particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.particle {
  position: absolute; width: 2px; height: 2px; border-radius: 50%;
  background: var(--gold);
  animation: particleDrift linear infinite;
}
@keyframes particleDrift {
  0% { transform: translateY(100vh) translateX(0); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.3; }
  100% { transform: translateY(-20vh) translateX(var(--dx,20px)); opacity: 0; }
}

/* Ripple on scroll */
.scroll-ripple {
  position: fixed; pointer-events: none; z-index: 7000;
  border-radius: 50%; border: 1px solid rgba(201,168,76,0.4);
  animation: rippleExpand 0.8s ease-out forwards;
}
@keyframes rippleExpand {
  from { width: 0; height: 0; opacity: 0.7; margin: 0; }
  to   { width: 120px; height: 120px; opacity: 0; margin: -60px 0 0 -60px; }
}

.hero-content { position: relative; z-index: 2; max-width: 520px; }
.hero-eyebrow {
  display: flex; align-items: center; gap: 1rem;
  margin-bottom: 1.5rem;
  animation: fadeUp 1s 0.4s both;
}
.hero-line { width: 50px; height: 1px; background: var(--gold); }
.hero-eyebrow-text {
  font-family: var(--font-ui); font-size: 0.68rem;
  letter-spacing: 4px; text-transform: uppercase; color: var(--gold);
}
.hero-name {
  font-family: var(--font-display); font-size: clamp(5rem, 10vw, 8.5rem);
  font-weight: 300; line-height: 0.88; letter-spacing: -2px;
  color: var(--cream);
  animation: fadeUp 1.2s 0.2s both;
}
.hero-name em { font-style: italic; color: var(--gold2); }
.hero-role {
  font-family: var(--font-ui); font-size: 0.72rem;
  letter-spacing: 5px; text-transform: uppercase;
  color: var(--muted); margin-top: 1.5rem; margin-bottom: 2.5rem;
  animation: fadeUp 1s 0.7s both;
}
.hero-tagline {
  font-family: var(--font-display); font-size: 1.1rem; font-style: italic;
  color: rgba(201,168,76,0.7); line-height: 1.6;
  animation: fadeUp 1s 0.9s both;
  border-left: 1px solid var(--gold3); padding-left: 1.2rem;
  margin-bottom: 3rem;
}
.hero-btns { display: flex; gap: 1rem; animation: fadeUp 1s 1.1s both; }
.btn-gold {
  font-family: var(--font-ui); font-size: 0.7rem; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--bg); background: var(--gold);
  border: none; padding: 0.9rem 2.2rem; cursor: none;
  transition: all 0.3s; position: relative; overflow: hidden;
}
.btn-gold::after {
  content:''; position:absolute; inset:0;
  background: var(--gold2); transform: translateX(-100%);
  transition: transform 0.4s ease;
}
.btn-gold:hover::after { transform: translateX(0); }
.btn-gold span { position: relative; z-index: 1; }
.btn-ghost {
  font-family: var(--font-ui); font-size: 0.7rem; letter-spacing: 2.5px;
  text-transform: uppercase; color: var(--gold); background: transparent;
  border: 1px solid rgba(201,168,76,0.4); padding: 0.9rem 2.2rem; cursor: none;
  transition: all 0.3s;
}
.btn-ghost:hover { border-color: var(--gold); background: rgba(201,168,76,0.08); }

.hero-scroll {
  position: absolute; bottom: 3rem; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  animation: fadeUp 1s 1.5s both;
}
.scroll-text {
  font-family: var(--font-ui); font-size: 0.6rem; letter-spacing: 3px;
  text-transform: uppercase; color: var(--muted);
}
.scroll-bar { width: 1px; height: 60px; background: var(--line); position: relative; overflow: hidden; }
.scroll-bar::after {
  content: ''; position: absolute; top: 0; left: 0;
  width: 100%; height: 40%;
  background: var(--gold);
  animation: scrollDrop 2s ease-in-out infinite;
}
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(300%); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── ABOUT ────────────────────────────────────────────────────────────── */
.about {
  padding: 14vh 5vw;
  position: relative; overflow: hidden;
  background: var(--bg2);
}
.about::before {
  content: 'DHANUSH';
  position: absolute; right: -2vw; top: 50%; transform: translateY(-50%) rotate(90deg);
  font-family: var(--font-display); font-size: 18vw; font-weight: 700;
  color: rgba(201,168,76,0.025); letter-spacing: 8px;
  pointer-events: none; user-select: none; white-space: nowrap;
}
.about-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; align-items: center; }
.about-label {
  font-family: var(--font-ui); font-size: 0.65rem; letter-spacing: 5px;
  text-transform: uppercase; color: var(--gold); margin-bottom: 2rem;
  display: flex; align-items: center; gap: 1rem;
}
.about-label::before { content:''; display:block; width:40px; height:1px; background:var(--gold); }
.about-headline {
  font-family: var(--font-display); font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 300; line-height: 1.1; color: var(--cream); margin-bottom: 2rem;
}
.about-headline em { font-style: italic; color: var(--gold2); }
.about-body {
  font-family: var(--font-body); font-size: 0.95rem; line-height: 1.9;
  color: var(--muted); max-width: 480px;
}
.about-right { display: flex; flex-direction: column; gap: 2.5rem; }
.about-block-title {
  font-family: var(--font-ui); font-size: 0.62rem;
  letter-spacing: 4px; text-transform: uppercase;
  color: var(--gold3); margin-bottom: 1rem;
}
.about-names {
  display: flex; flex-direction: column; gap: 0.6rem;
}
.about-name {
  font-family: var(--font-display); font-size: 1.1rem; font-weight: 400;
  color: var(--cream); display: flex; align-items: center; gap: 0.8rem;
}
.about-name::before { content:''; width:6px; height:1px; background:var(--gold); flex-shrink:0; }
.about-name small { font-family:var(--font-body); font-size:0.75rem; color:var(--muted); font-weight:300; }
.about-divider { width: 100%; height: 1px; background: var(--line); }
.about-badge-row { display: flex; flex-wrap: wrap; gap: 0.6rem; }
.about-badge {
  font-family: var(--font-body); font-size: 0.72rem;
  border: 1px solid var(--line); color: var(--muted);
  padding: 0.4rem 0.9rem; transition: all 0.3s;
}
.about-badge:hover { border-color: var(--gold); color: var(--gold); }

/* ── PROJECTS ─────────────────────────────────────────────────────────── */
.projects { padding: 14vh 0; background: var(--bg); position: relative; }
.projects-header { padding: 0 5vw; margin-bottom: 5rem; }
.section-label {
  font-family: var(--font-ui); font-size: 0.65rem; letter-spacing: 5px;
  text-transform: uppercase; color: var(--gold); margin-bottom: 1.5rem;
  display: flex; align-items: center; gap: 1rem;
}
.section-label::before { content:''; display:block; width:40px; height:1px; background:var(--gold); }
.section-title {
  font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300; color: var(--cream); line-height: 1.1;
}
.section-title em { font-style: italic; color: var(--gold2); }

.proj-scroll { overflow-x: auto; padding: 1rem 5vw 3rem; scrollbar-width: none; }
.proj-scroll::-webkit-scrollbar { display: none; }
.proj-track { display: flex; gap: 1.5rem; width: max-content; }
.proj-card {
  width: 380px; height: 480px; position: relative; flex-shrink: 0;
  overflow: hidden; cursor: none;
  clip-path: polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%);
  transition: transform 0.5s cubic-bezier(0.16,1,.3,1);
}
.proj-card:hover { transform: translateY(-10px); }
.proj-card-bg {
  position: absolute; inset: 0;
  transition: transform 0.7s cubic-bezier(0.16,1,.3,1);
}
.proj-card:hover .proj-card-bg { transform: scale(1.08); }
.proj-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(12,9,5,0.96) 0%, rgba(12,9,5,0.2) 50%, transparent 100%);
  display: flex; flex-direction: column; justify-content: flex-end; padding: 2rem;
}
.proj-num {
  position: absolute; top: 1.5rem; right: 1.5rem;
  font-family: var(--font-display); font-size: 3.5rem; font-weight: 300;
  color: rgba(201,168,76,0.15); line-height: 1;
}
.proj-tag {
  font-family: var(--font-ui); font-size: 0.6rem; letter-spacing: 3px;
  text-transform: uppercase; color: var(--gold); margin-bottom: 0.6rem;
}
.proj-name {
  font-family: var(--font-display); font-size: 1.6rem; font-weight: 400;
  color: var(--cream); line-height: 1.2; margin-bottom: 0.5rem;
}
.proj-loc {
  font-family: var(--font-body); font-size: 0.78rem;
  color: var(--muted); display: flex; align-items: center; gap: 0.4rem;
}

/* ── EXPERIENCE & AWARDS ──────────────────────────────────────────────── */
.exp-awards { padding: 14vh 5vw; background: var(--bg3); }
.exp-awards-inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr; gap: 6vw;
}
.exp-side, .awards-side { }
.big-stat {
  font-family: var(--font-display); font-size: clamp(5rem, 10vw, 9rem);
  font-weight: 300; color: transparent;
  -webkit-text-stroke: 1px rgba(201,168,76,0.3); line-height: 0.9;
  margin-bottom: 0.5rem;
}
.big-stat-label {
  font-family: var(--font-ui); font-size: 0.65rem;
  letter-spacing: 4px; text-transform: uppercase; color: var(--gold);
  margin-bottom: 2rem;
}
.exp-desc {
  font-family: var(--font-body); font-size: 0.95rem; line-height: 1.9;
  color: var(--muted); max-width: 400px;
}
.awards-list { display: flex; flex-direction: column; gap: 0; margin-top: 2rem; }
.award-item {
  display: flex; align-items: flex-start; gap: 1.5rem;
  padding: 1.5rem 0; border-bottom: 1px solid var(--line);
  transition: all 0.3s;
}
.award-item:hover { padding-left: 0.5rem; }
.award-icon-wrap {
  width: 42px; height: 42px; border: 1px solid var(--gold3);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 1.1rem;
  transition: background 0.3s;
}
.award-item:hover .award-icon-wrap { background: rgba(201,168,76,0.1); }
.award-title {
  font-family: var(--font-display); font-size: 1rem; font-weight: 400;
  color: var(--cream); margin-bottom: 0.2rem;
}
.award-org { font-family: var(--font-body); font-size: 0.78rem; color: var(--muted); }

/* ── CLASSES / SHOWS TOGGLE ───────────────────────────────────────────── */
.services-sec { padding: 14vh 5vw; background: var(--bg); position: relative; overflow: hidden; }
.services-sec::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold3), transparent);
}
.toggle-wrap { display: flex; align-items: center; gap: 0; margin: 3rem 0; position: relative; width: fit-content; }
.toggle-btn {
  font-family: var(--font-ui); font-size: 0.68rem; letter-spacing: 3px;
  text-transform: uppercase; background: none; border: none; cursor: none;
  padding: 0.8rem 2.5rem; color: var(--muted); position: relative; z-index: 1;
  transition: color 0.4s;
}
.toggle-btn.active { color: var(--bg); }
.toggle-slider {
  position: absolute; top: 0; left: 0; height: 100%;
  background: var(--gold); transition: transform 0.4s cubic-bezier(0.16,1,.3,1);
  z-index: 0;
}
.services-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.service-cell {
  background: var(--bg); padding: 2rem 1.5rem;
  position: relative; overflow: hidden;
  cursor: none; transition: background 0.4s;
  opacity: 0; transform: translateY(20px);
  transition: opacity 0.4s, transform 0.4s, background 0.3s;
  min-height: 180px; display: flex; flex-direction: column; justify-content: flex-end;
}
.service-cell.vis { opacity: 1; transform: translateY(0); }
.service-cell:hover { background: rgba(201,168,76,0.06); }
.service-cell-num {
  position: absolute; top: 1rem; right: 1.2rem;
  font-family: var(--font-display); font-size: 2.5rem; font-weight: 300;
  color: rgba(201,168,76,0.08); line-height: 1;
}
.service-cell-icon { font-size: 1.6rem; margin-bottom: 1rem; }
.service-cell-name {
  font-family: var(--font-display); font-size: 1.05rem; font-weight: 400;
  color: var(--cream); margin-bottom: 0.3rem; line-height: 1.2;
}
.service-cell-sub {
  font-family: var(--font-body); font-size: 0.73rem;
  color: var(--muted); line-height: 1.5;
}
.service-cell-line {
  width: 0; height: 1px; background: var(--gold);
  transition: width 0.5s ease; margin-top: 0.8rem;
}
.service-cell:hover .service-cell-line { width: 30px; }

/* ── MEDIA ────────────────────────────────────────────────────────────── */
.media-sec { padding: 14vh 5vw; background: var(--bg2); }
.media-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem; margin-top: 3rem;
}
.media-item {
  position: relative; overflow: hidden; cursor: none;
  background: var(--bg3);
  transition: transform 0.5s cubic-bezier(0.16,1,.3,1);
}
.media-item:nth-child(1) { grid-column: 1/3; grid-row: 1/2; }
.media-item:nth-child(4) { grid-column: 2/4; grid-row: 2/3; }
.media-item:nth-child(7) { grid-column: 1/2; grid-row: 3/4; }
.media-inner {
  width: 100%; aspect-ratio: 16/9;
  position: relative; overflow: hidden;
}
.media-item:nth-child(1) .media-inner,
.media-item:nth-child(4) .media-inner { aspect-ratio: 21/9; }
.media-item:nth-child(7) .media-inner { aspect-ratio: 4/3; }
.media-item:hover { transform: scale(0.985); }
.media-item:hover .media-hover-overlay { opacity: 1; }
.media-inner svg { width: 100%; height: 100%; display: block; }
.media-hover-overlay {
  position: absolute; inset: 0; opacity: 0;
  background: rgba(12,9,5,0.6);
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.4s;
}
.media-play {
  width: 54px; height: 54px; border-radius: 50%;
  border: 1px solid var(--gold);
  display: flex; align-items: center; justify-content: center;
  color: var(--gold); font-size: 1.2rem;
  transition: background 0.3s;
}
.media-item:hover .media-play { background: rgba(201,168,76,0.15); }
.media-caption {
  padding: 1rem 1.2rem;
  font-family: var(--font-ui); font-size: 0.65rem;
  letter-spacing: 2px; text-transform: uppercase; color: var(--muted);
  border-top: 1px solid var(--line);
}

/* ── BOOKING ──────────────────────────────────────────────────────────── */
.booking-sec { padding: 14vh 5vw; background: var(--bg3); }
.booking-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 8vw; align-items: start; }
.booking-info-num {
  font-family: var(--font-display); font-size: clamp(3rem, 6vw, 5rem); font-weight: 300;
  color: transparent; -webkit-text-stroke: 1px rgba(201,168,76,0.3); line-height: 0.9;
}
.booking-info-desc {
  font-family: var(--font-body); font-size: 0.9rem; line-height: 1.9;
  color: var(--muted); margin-top: 1.5rem;
}
.booking-info-contact { margin-top: 2rem; display: flex; flex-direction: column; gap: 0.7rem; }
.contact-row {
  display: flex; align-items: center; gap: 1rem;
  font-family: var(--font-body); font-size: 0.83rem; color: var(--muted);
}
.contact-row span.icon {
  color: var(--gold); font-size: 0.9rem; width: 20px; text-align: center;
}
.booking-form { display: flex; flex-direction: column; gap: 0; }
.field-wrap {
  position: relative; border-bottom: 1px solid var(--line);
  transition: border-color 0.4s;
}
.field-wrap:focus-within { border-color: var(--gold); }
.field-label {
  position: absolute; top: 1.2rem; left: 0;
  font-family: var(--font-ui); font-size: 0.6rem; letter-spacing: 3px;
  text-transform: uppercase; color: var(--muted);
  transition: all 0.3s; pointer-events: none;
}
.field-wrap:focus-within .field-label,
.field-wrap.filled .field-label {
  top: 0.2rem; font-size: 0.52rem; color: var(--gold);
}
.field-input, .field-select, .field-textarea {
  width: 100%; background: transparent; border: none; outline: none;
  font-family: var(--font-body); font-size: 0.9rem; color: var(--cream);
  padding: 2rem 0 0.8rem; cursor: none;
}
.field-select option { background: var(--bg3); color: var(--cream); }
.field-textarea { resize: none; height: 100px; }
.field-glow {
  position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 0; height: 1px; background: var(--gold);
  transition: width 0.5s ease;
}
.field-wrap:focus-within .field-glow { width: 100%; }
.submit-btn-wrap { margin-top: 2.5rem; }
.submit-btn {
  font-family: var(--font-ui); font-size: 0.7rem; letter-spacing: 3px;
  text-transform: uppercase; color: var(--bg); background: var(--gold);
  border: none; padding: 1.1rem 3rem; cursor: none;
  position: relative; overflow: hidden; width: 100%;
  transition: background 0.3s;
}
.submit-btn::after {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: 0; height: 0; border-radius: 50%;
  background: rgba(255,255,255,0.2);
  transform: translate(-50%,-50%);
  transition: width 0.6s, height 0.6s;
}
.submit-btn:hover::after { width: 400px; height: 400px; }
.submit-btn:hover { background: var(--gold2); }

/* ── FOOTER ───────────────────────────────────────────────────────────── */
.footer { padding: 8vh 5vw 4vh; background: var(--bg); border-top: 1px solid var(--line); }
.footer-top {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 6vh; flex-wrap: wrap; gap: 2rem;
}
.footer-logo-big {
  font-family: var(--font-display); font-size: clamp(3rem, 7vw, 6rem);
  font-weight: 300; color: transparent;
  -webkit-text-stroke: 1px rgba(201,168,76,0.3); line-height: 0.9;
}
.footer-logo-big em { font-style: italic; color: rgba(201,168,76,0.5); }
.footer-links { display: flex; gap: 4rem; flex-wrap: wrap; }
.footer-link-group { display: flex; flex-direction: column; gap: 0.7rem; }
.footer-link-title {
  font-family: var(--font-ui); font-size: 0.6rem; letter-spacing: 3px;
  text-transform: uppercase; color: var(--gold3); margin-bottom: 0.3rem;
}
.footer-link-item {
  font-family: var(--font-body); font-size: 0.82rem;
  color: var(--muted); text-decoration: none; transition: color 0.3s;
  cursor: none;
}
.footer-link-item:hover { color: var(--gold); }
.footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 3vh; border-top: 1px solid var(--line);
  flex-wrap: wrap; gap: 1rem;
}
.footer-copy { font-family: var(--font-body); font-size: 0.75rem; color: rgba(240,226,196,0.25); }
.footer-tamil {
  font-family: var(--font-display); font-style: italic;
  font-size: 1.1rem; color: rgba(201,168,76,0.4);
}
.footer-wave { display: flex; align-items: center; gap: 3px; }
.footer-wave-bar {
  width: 2px; border-radius: 2px; background: var(--gold3);
  animation: waveFooter 1.4s ease-in-out infinite;
}
@keyframes waveFooter {
  0%,100%{height:4px;opacity:0.4} 50%{height:14px;opacity:0.9}
}

/* ── ANIMATIONS & SCROLL ─────────────────────────────────────────────── */
.reveal {
  opacity: 0; transform: translateY(40px);
  transition: opacity 0.9s cubic-bezier(0.16,1,.3,1), transform 0.9s cubic-bezier(0.16,1,.3,1);
}
.reveal.vis { opacity: 1; transform: translateY(0); }
.reveal-left {
  opacity: 0; transform: translateX(-50px);
  transition: opacity 0.9s, transform 0.9s cubic-bezier(0.16,1,.3,1);
}
.reveal-right {
  opacity: 0; transform: translateX(50px);
  transition: opacity 0.9s, transform 0.9s cubic-bezier(0.16,1,.3,1);
}
.reveal-left.vis, .reveal-right.vis { opacity: 1; transform: translateX(0); }

/* ── MODAL ───────────────────────────────────────────────────────────── */
.modal-bg {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(12,9,5,0.95); backdrop-filter: blur(20px);
  display: flex; align-items: center; justify-content: center; padding: 2rem;
  animation: fadeIn 0.4s;
}
.modal-box {
  background: var(--bg2); border: 1px solid var(--line);
  padding: 3rem; max-width: 500px; width: 100%;
  position: relative; animation: modalIn 0.5s cubic-bezier(0.16,1,.3,1);
  max-height: 90vh; overflow-y: auto;
}
@keyframes modalIn {
  from { opacity:0; transform: scale(0.94) translateY(20px); }
  to   { opacity:1; transform: scale(1) translateY(0); }
}
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
.modal-close-btn {
  position: absolute; top: 1.5rem; right: 1.5rem;
  background: none; border: 1px solid var(--line);
  color: var(--muted); cursor: none; width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center; font-size: 1rem;
  transition: all 0.3s;
}
.modal-close-btn:hover { border-color: var(--gold); color: var(--gold); }
.modal-title {
  font-family: var(--font-display); font-size: 2rem; font-weight: 300;
  color: var(--cream); margin-bottom: 0.5rem;
}
.modal-sub { font-family: var(--font-body); font-size: 0.82rem; color: var(--muted); margin-bottom: 2rem; }
.success-state { text-align: center; padding: 2rem 0; }
.success-icon { font-size: 3rem; margin-bottom: 1rem; }
.success-title { font-family: var(--font-display); font-size: 1.8rem; color: var(--gold2); margin-bottom: 0.5rem; }
.success-desc { font-family: var(--font-body); font-size: 0.85rem; color: var(--muted); }

/* ── RESPONSIVE ──────────────────────────────────────────────────────── */
@media(max-width:1024px) {
  .services-grid { grid-template-columns: repeat(3,1fr); }
  .about-inner { grid-template-columns:1fr; }
  .exp-awards-inner { grid-template-columns:1fr; }
  .booking-inner { grid-template-columns:1fr; }
  .media-grid { grid-template-columns: 1fr 1fr; }
  .media-item:nth-child(1) { grid-column:1/3; }
  .media-item:nth-child(4) { grid-column:1/3; }
  .media-item:nth-child(7) { grid-column:auto; }
}
@media(max-width:768px) {
  .nav-links { display:none; }
  .hero { padding: 0 6vw 12vh; }
  .hero-img-wrap { display:none; }
  .hero-name { font-size: 4.5rem; }
  .services-grid { grid-template-columns:1fr 1fr; }
  .media-grid { grid-template-columns:1fr; }
  .media-item:nth-child(1),.media-item:nth-child(4) { grid-column:auto; }
  .footer-top { flex-direction:column; }
  .footer-links { gap:2rem; }
}
@media(max-width:480px) {
  .services-grid { grid-template-columns:1fr; }
  .hero-name { font-size:3.5rem; }
}
`;

/* ─── DATA ─────────────────────────────────────────────────────────── */
const PROJECTS = [
  {name:"Anandha Kondattam",loc:"Singapore",tag:"International",bg:"#1A1208",accent:"#C9A84C"},
  {name:"Chennai Sangamam",loc:"Chennai",tag:"City Festival",bg:"#120A08",accent:"#D4701A"},
  {name:"Indian Dance Festival",loc:"Mamallapuram",tag:"Cultural",bg:"#0A1208",accent:"#8CB87A"},
  {name:"Made of Chennai",loc:"YMCA",tag:"Stage Show",bg:"#0A0E18",accent:"#7A9CC9"},
  {name:"Neithal Kalai Vizha",loc:"Thoothukudi",tag:"Folk Festival",bg:"#180A12",accent:"#C97A8C"},
  {name:"Kalai Sangamam",loc:"Kanchipuram",tag:"Classical",bg:"#121808",accent:"#A8C97A"},
  {name:"Happy Streets",loc:"Chennai",tag:"Community",bg:"#180E08",accent:"#C9A84C"},
  {name:"Super Singer",loc:"Vijay TV",tag:"Television",bg:"#08121A",accent:"#7AC9C9"},
  {name:"Film BGM",loc:"Various",tag:"Cinema",bg:"#120A18",accent:"#A87AC9"},
];

const CLASSES = [
  {icon:"🥁",name:"Paraiattam",sub:"High-energy traditional drum performance"},
  {icon:"🏺",name:"Karagattam",sub:"Balance & dance with decorated pots"},
  {icon:"🗡️",name:"Silambattam",sub:"Traditional martial art with sticks"},
  {icon:"🐎",name:"Poikaal Kuthiraiattam",sub:"Dummy horse festival dance"},
  {icon:"🦚",name:"Mayilattam",sub:"Peacock-inspired graceful dance"},
  {icon:"🐂",name:"Maadattam",sub:"Bull-themed folk village dance"},
  {icon:"🌾",name:"Oyilattam",sub:"Group rhythmic coordinated dance"},
  {icon:"🎶",name:"Grammiya Paadal",sub:"Folk singing & cultural storytelling"},
  {icon:"🎵",name:"Thavil",sub:"Classical temple percussion"},
  {icon:"🎺",name:"Nadaswaram",sub:"Traditional wind instrument"},
  {icon:"🔥",name:"Devarattam",sub:"Warrior dance — power & rhythm"},
];

const SHOWS = [
  {icon:"🥁",name:"Paraiattam",sub:"Grand stage drum ensemble"},
  {icon:"🎶",name:"Nayyandi Melam",sub:"Vibrant processional music"},
  {icon:"🏺",name:"Karagattam",sub:"Balance dance spectacle"},
  {icon:"🐎",name:"Poikaal Kuthiraiattam",sub:"Festival horse dance"},
  {icon:"🦚",name:"Mayilattam",sub:"Graceful peacock performance"},
  {icon:"🐂",name:"Maadattam",sub:"Traditional bull dance"},
  {icon:"🌾",name:"Oyilattam",sub:"Rhythmic group dance"},
  {icon:"🎵",name:"Thavil",sub:"Powerful temple percussion"},
  {icon:"🎺",name:"Nadaswaram",sub:"Sacred wind instrument"},
  {icon:"🔥",name:"Devarattam",sub:"Warrior battle dance"},
  {icon:"🥁",name:"Thudumbattam",sub:"Ancient drum folk art"},
  {icon:"🗡️",name:"Silambattam",sub:"Martial stick performance"},
  {icon:"🎭",name:"Bommalattam",sub:"Traditional puppet theatre"},
  {icon:"🥁",name:"Chendamelam",sub:"Kerala-Tamil fusion drum"},
  {icon:"🌟",name:"Nasik Doll",sub:"Processional doll dance"},
  {icon:"👑",name:"Rajamelam",sub:"Royal court music ensemble"},
];

const AWARDS = [
  {icon:"🏆",title:"Best Student Artist",org:"Education Minister, Tamil Nadu"},
  {icon:"🌟",title:"Best Artist Award",org:"Nanban Organisation"},
  {icon:"🎖️",title:"Best Musician",org:"IIT Madras Cultural Fest"},
  {icon:"👑",title:"Fine Musician Honour",org:"Kanimozhi Karunanidhi MP"},
];

const MEDIA_ITEMS = [
  {label:"Chennai Sangamam — Live Performance",accent:"#C9A84C",emoji:"🥁"},
  {label:"Anandha Kondattam — Singapore",accent:"#D4701A",emoji:"🎭"},
  {label:"Mayilattam — Stage Show",accent:"#8CB87A",emoji:"🦚"},
  {label:"Thavil — Temple Concert",accent:"#7A9CC9",emoji:"🎵"},
  {label:"Silambattam — Demo",accent:"#C97A8C",emoji:"🗡️"},
  {label:"Workshop Session",accent:"#A8C97A",emoji:"🎓"},
  {label:"Vijay TV — Super Singer",accent:"#C9A84C",emoji:"📺"},
];

/* ─── HERO ILLUSTRATION SVG ────────────────────────────────────────── */
const HeroIllustration = () => (
  <svg viewBox="0 0 520 680" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%'}}>
    <defs>
      <radialGradient id="bodyGrad" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#D4845A"/>
        <stop offset="100%" stopColor="#8B4A28"/>
      </radialGradient>
      <radialGradient id="bgGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.08"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <linearGradient id="clothGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A1A08"/>
        <stop offset="100%" stopColor="#1A0805"/>
      </linearGradient>
      <linearGradient id="drumGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6B2800"/>
        <stop offset="100%" stopColor="#2A0E00"/>
      </linearGradient>
      <filter id="glow2"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    {/* Background ambience */}
    <ellipse cx="260" cy="340" rx="200" ry="280" fill="url(#bgGlow)"/>

    {/* Gold circle rings behind figure */}
    {[80,110,140].map((r,i) => (
      <circle key={i} cx="260" cy="220" r={r} fill="none"
        stroke="#C9A84C" strokeWidth="0.5" opacity={0.15 - i*0.04}
        strokeDasharray={`${8+i*4} ${12+i*4}`}/>
    ))}

    {/* Body shadow */}
    <ellipse cx="260" cy="640" rx="100" ry="20" fill="rgba(201,168,76,0.06)"/>

    {/* Legs */}
    <rect x="215" y="520" width="40" height="110" rx="20" fill="#1A0805"/>
    <rect x="265" y="520" width="40" height="110" rx="20" fill="#1A0805"/>
    <rect x="205" y="620" width="60" height="25" rx="8" fill="#2A1008"/>
    <rect x="255" y="620" width="60" height="25" rx="8" fill="#2A1008"/>

    {/* Body */}
    <ellipse cx="260" cy="440" rx="90" ry="120" fill="url(#clothGrad)"/>
    {/* Dhoti pattern */}
    <path d="M200 480 Q260 500 320 480 L320 540 Q260 560 200 540 Z" fill="rgba(201,168,76,0.12)"/>
    {/* Gold border on clothes */}
    <path d="M180 400 Q260 380 340 400" fill="none" stroke="#C9A84C" strokeWidth="2.5" opacity="0.6"/>
    <path d="M180 410 Q260 390 340 410" fill="none" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3"/>
    {/* Center design */}
    <line x1="255" y1="380" x2="255" y2="480" stroke="#C9A84C" strokeWidth="2" opacity="0.5"/>
    <line x1="265" y1="380" x2="265" y2="480" stroke="#C9A84C" strokeWidth="0.8" opacity="0.25"/>

    {/* Arms */}
    <path d="M190 390 Q140 420 110 470" stroke="url(#bodyGrad)" strokeWidth="36" strokeLinecap="round" fill="none"/>
    <path d="M330 390 Q380 420 410 470" stroke="url(#bodyGrad)" strokeWidth="36" strokeLinecap="round" fill="none"/>

    {/* Drum (Parai) */}
    <ellipse cx="260" cy="530" rx="120" ry="35" fill="url(#drumGrad)"/>
    <rect x="140" y="490" width="240" height="75" rx="12" fill="url(#drumGrad)"/>
    <ellipse cx="260" cy="490" rx="120" ry="30" fill="#5C2200"/>
    <ellipse cx="260" cy="487" rx="108" ry="25" fill="#F0E2C4" opacity="0.92"/>
    {[0.95,0.75,0.5].map((r,i) => (
      <ellipse key={i} cx="260" cy="487" rx={108-i*28} ry={25-i*7}
        fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity={0.4+i*0.2}/>
    ))}
    {/* Drum patterns */}
    <path d="M220 487 Q260 470 300 487" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
    <path d="M220 487 Q260 504 300 487" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>

    {/* Drum sticks */}
    <line x1="110" y1="465" x2="182" y2="478" stroke="#8B4513" strokeWidth="8" strokeLinecap="round"/>
    <ellipse cx="108" cy="468" rx="10" ry="10" fill="#5C2800"/>
    <line x1="410" y1="465" x2="338" y2="478" stroke="#8B4513" strokeWidth="8" strokeLinecap="round"/>
    <ellipse cx="412" cy="468" rx="10" ry="10" fill="#5C2800"/>

    {/* Neck */}
    <rect x="242" y="330" width="36" height="55" rx="18" fill="url(#bodyGrad)"/>

    {/* Head */}
    <ellipse cx="260" cy="300" rx="62" ry="68" fill="url(#bodyGrad)"/>

    {/* Hair */}
    <ellipse cx="260" cy="250" rx="65" ry="35" fill="#150A03"/>
    <path d="M200 268 Q196 310 200 340" stroke="#150A03" strokeWidth="12" fill="none" strokeLinecap="round"/>
    <path d="M320 268 Q324 310 320 340" stroke="#150A03" strokeWidth="12" fill="none" strokeLinecap="round"/>

    {/* Headband */}
    <path d="M200 262 Q260 250 320 262" stroke="#C9A84C" strokeWidth="6" fill="none" strokeLinecap="round"/>
    <path d="M200 262 Q260 250 320 262" stroke="#8B6820" strokeWidth="2" fill="none" strokeLinecap="round"/>
    {[215,235,260,285,305].map((x,i) => (
      <circle key={i} cx={x} cy={258 + (i===2?-2:0)} r="3.5" fill="#D4701A"/>
    ))}

    {/* Eyes */}
    <ellipse cx="240" cy="300" rx="7" ry="8" fill="#150A03"/>
    <ellipse cx="280" cy="300" rx="7" ry="8" fill="#150A03"/>
    <ellipse cx="242" cy="298" rx="2.5" ry="3" fill="white"/>
    <ellipse cx="282" cy="298" rx="2.5" ry="3" fill="white"/>
    {/* Eyebrows */}
    <path d="M232 288 Q240 284 248 288" stroke="#150A03" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M272 288 Q280 284 288 288" stroke="#150A03" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

    {/* Smile */}
    <path d="M245 318 Q260 330 275 318" stroke="#6B1A00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

    {/* Bindi / Tilak */}
    <line x1="260" y1="272" x2="260" y2="285" stroke="#FF3300" strokeWidth="3.5" strokeLinecap="round"/>
    <circle cx="260" cy="270" r="3" fill="#FF3300"/>

    {/* Earrings */}
    <circle cx="198" cy="308" r="6" fill="none" stroke="#C9A84C" strokeWidth="2"/>
    <circle cx="198" cy="318" r="3" fill="#C9A84C"/>
    <circle cx="322" cy="308" r="6" fill="none" stroke="#C9A84C" strokeWidth="2"/>
    <circle cx="322" cy="318" r="3" fill="#C9A84C"/>

    {/* Sound wave lines radiating */}
    {[0,1,2].map(i => (
      <path key={`wl${i}`}
        d={`M${80-i*18},460 Q${80-i*18},480 ${80-i*18},500`}
        stroke="#C9A84C" strokeWidth="2" fill="none"
        opacity={0.6-i*0.18} strokeLinecap="round"/>
    ))}
    {[0,1,2].map(i => (
      <path key={`wr${i}`}
        d={`M${440+i*18},460 Q${440+i*18},480 ${440+i*18},500`}
        stroke="#C9A84C" strokeWidth="2" fill="none"
        opacity={0.6-i*0.18} strokeLinecap="round"/>
    ))}

    {/* Floating gold particles */}
    {[[60,180,3],[400,140,2.5],[70,400,2],[440,350,3],[140,80,2],[380,90,2.5],[50,560,2]].map(([x,y,r],i) => (
      <circle key={`p${i}`} cx={x} cy={y} r={r} fill="#C9A84C" opacity={0.3+i*0.05}/>
    ))}

    {/* Kolam dots at bottom */}
    {[[-80,20],[-55,0],[-30,15],[0,0],[30,15],[55,0],[80,20]].map(([dx,dy],i) => (
      <circle key={`k${i}`} cx={260+dx} cy={648+dy} r="2.5" fill="#C9A84C" opacity={0.25+i*0.04}/>
    ))}
  </svg>
);

/* ─── MEDIA SVG THUMBNAILS ─────────────────────────────────────────── */
const MediaThumb = ({item, idx}) => {
  const w = 900, h = [300,200,200,300,200,200,300][idx] || 200;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
      <rect width={w} height={h} fill={`hsl(${idx*40},15%,8%)`}/>
      <radialGradient id={`mg${idx}`} cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor={item.accent} stopOpacity="0.12"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
      <rect width={w} height={h} fill={`url(#mg${idx})`}/>
      {/* Grid lines */}
      {[w/4,w/2,3*w/4].map((x,i) => (
        <line key={i} x1={x} y1={0} x2={x} y2={h} stroke={item.accent} strokeWidth="0.5" opacity="0.06"/>
      ))}
      {[h/3,2*h/3].map((y,i) => (
        <line key={i} x1={0} y1={y} x2={w} y2={y} stroke={item.accent} strokeWidth="0.5" opacity="0.06"/>
      ))}
      <text x={w/2} y={h/2-10} textAnchor="middle" dominantBaseline="middle" fontSize={h*0.35} opacity="0.2">{item.emoji}</text>
      <text x={w/2} y={h-25} textAnchor="middle" fontSize="12" fill={item.accent} opacity="0.6" fontFamily="Tenor Sans, sans-serif" letterSpacing="2">{item.label.toUpperCase()}</text>
    </svg>
  );
};

/* ─── PARTICLES ────────────────────────────────────────────────────── */
const Particles = () => {
  const particles = Array.from({length:18}, (_,i) => ({
    id:i, left:`${5+i*5.2}%`,
    delay:`${Math.random()*8}s`,
    dur:`${10+Math.random()*12}s`,
    dx:`${(Math.random()-0.5)*80}px`,
    size: `${1+Math.random()*2}px`,
    opacity: 0.2+Math.random()*0.5,
  }));
  return (
    <div className="particles">
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left:p.left, width:p.size, height:p.size,
          animationDuration:p.dur, animationDelay:p.delay,
          '--dx':p.dx, opacity:p.opacity,
        }}/>
      ))}
    </div>
  );
};

/* ─── PROJECT CARD BG ──────────────────────────────────────────────── */
const ProjectBg = ({p, idx}) => (
  <svg viewBox="0 0 380 480" xmlns="http://www.w3.org/2000/svg" style={{width:'100%',height:'100%',display:'block'}}>
    <defs>
      <radialGradient id={`pg${idx}`} cx="40%" cy="30%" r="70%">
        <stop offset="0%" stopColor={p.accent} stopOpacity="0.15"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
    </defs>
    <rect width="380" height="480" fill={p.bg}/>
    <rect width="380" height="480" fill={`url(#pg${idx})`}/>
    {/* Abstract pattern */}
    <circle cx="300" cy="80" r="120" fill="none" stroke={p.accent} strokeWidth="0.5" opacity="0.15"/>
    <circle cx="300" cy="80" r="80" fill="none" stroke={p.accent} strokeWidth="0.5" opacity="0.2"/>
    <circle cx="300" cy="80" r="40" fill={p.accent} opacity="0.05"/>
    <text x="190" y="240" textAnchor="middle" dominantBaseline="middle" fontSize="90" opacity="0.12" fill={p.accent}>
      {['🥁','🎭','💃','🌟','🎪','🎶','🏠','📺','🎬'][idx]}
    </text>
    {/* Corner lines */}
    <line x1="0" y1="0" x2="60" y2="0" stroke={p.accent} strokeWidth="0.5" opacity="0.3"/>
    <line x1="0" y1="0" x2="0" y2="60" stroke={p.accent} strokeWidth="0.5" opacity="0.3"/>
    <line x1="380" y1="480" x2="320" y2="480" stroke={p.accent} strokeWidth="0.5" opacity="0.3"/>
    <line x1="380" y1="480" x2="380" y2="420" stroke={p.accent} strokeWidth="0.5" opacity="0.3"/>
  </svg>
);

/* ─── MAIN COMPONENT ───────────────────────────────────────────────── */
export default function DhanushPortfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('classes');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({name:'',email:'',phone:'',type:'',msg:''});
  const [curPos, setCurPos] = useState({x:0,y:0});
  const [ringPos, setRingPos] = useState({x:0,y:0});
  const [hovering, setHovering] = useState(false);

  const curRef = useRef({x:0,y:0});
  const ringRef = useRef({x:0,y:0});
  const rafRef = useRef(null);

  // Cursor
  useEffect(() => {
    const move = e => { curRef.current = {x:e.clientX, y:e.clientY}; setCurPos({x:e.clientX,y:e.clientY}); };
    const hoverIn = () => setHovering(true);
    const hoverOut = () => setHovering(false);
    document.addEventListener('mousemove', move);
    document.querySelectorAll('button,a,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', hoverIn);
      el.addEventListener('mouseleave', hoverOut);
    });
    const animate = () => {
      ringRef.current.x += (curRef.current.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (curRef.current.y - ringRef.current.y) * 0.12;
      setRingPos({...ringRef.current});
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { document.removeEventListener('mousemove', move); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll ripple
  useEffect(() => {
    let lastY = 0, ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const dy = Math.abs(window.scrollY - lastY);
          if (dy > 100) {
            lastY = window.scrollY;
            const el = document.createElement('div');
            el.className = 'scroll-ripple';
            el.style.cssText = `left:${window.innerWidth/2}px;top:${window.innerHeight/2}px`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 900);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
    }, {threshold: 0.12});
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.service-cell').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [activeTab]);

  const handleSubmit = e => { e.preventDefault(); setSubmitted(true); };
  const openModal = () => { setModalOpen(true); setSubmitted(false); };
  const closeModal = () => setModalOpen(false);

  const currentList = activeTab === 'classes' ? CLASSES : SHOWS;
  const sliderW = activeTab === 'classes' ? '50%' : '50%';
  const sliderX = activeTab === 'classes' ? '0%' : '100%';

  return (
    <>
      <style>{CSS}</style>

      {/* GRAIN */}
      <div className="grain"/>

      {/* CURSOR */}
      <div className="cursor-dot" style={{transform:`translate(${curPos.x}px,${curPos.y}px)`}} className={`cursor-dot ${hovering?'hovering':''}`}>
        <div className="inner"/>
      </div>
      <div className={`cursor-ring ${hovering?'hovering':''}`} style={{transform:`translate(${ringPos.x}px,${ringPos.y}px)`}}>
        <div className="ring"/>
      </div>

      {/* NAV */}
      <nav className={`nav ${scrolled?'scrolled':''}`}>
        <div className="nav-logo">Dhanush</div>
        <ul className="nav-links">
          {['About','Projects','Services','Media','Contact'].map(l => (
            <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={openModal}>Book Now</button>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="hero-bg"/>
        <Particles/>

        <div className="hero-img-wrap">
          <div className="hero-img-frame">
            <div className="hero-img-inner">
              <HeroIllustration/>
              <div className="hero-img-glow"/>
            </div>
            <div className="hero-img-border"/>
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-line"/>
            <span className="hero-eyebrow-text">Folk Performance Artist</span>
          </div>
          <h1 className="hero-name">
            Dha<em>nush</em>
          </h1>
          <p className="hero-role">10+ Years · Rhythm & Culture</p>
          <blockquote className="hero-tagline">
            "Not Just Performance —<br/>A Living Tradition"
          </blockquote>
          <div className="hero-btns">
            <button className="btn-gold" onClick={() => document.getElementById('media').scrollIntoView({behavior:'smooth'})}>
              <span>▶ Watch Performance</span>
            </button>
            <button className="btn-ghost" onClick={openModal}>Book a Show</button>
          </div>
        </div>

        <div className="hero-scroll">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-bar"/>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────── */}
      <section className="about" id="about">
        <div className="about-inner">
          <div>
            <div className="about-label reveal">The Artist</div>
            <h2 className="about-headline reveal" style={{transitionDelay:'0.1s'}}>
              Rhythm is<br/>not music —<br/><em>it is life</em>
            </h2>
            <p className="about-body reveal" style={{transitionDelay:'0.2s', marginTop:'0.5rem'}}>
              10+ years of experience in traditional and contemporary folk performance.
              Dhanush brings the ancient heartbeat of Tamil culture to stages across the world,
              preserving art forms that speak beyond language.
            </p>
          </div>
          <div className="about-right">
            <div className="reveal">
              <div className="about-block-title">Mentored by</div>
              <div className="about-names">
                <div className="about-name">Paul Jacob <small>Music Director</small></div>
                <div className="about-name">Thanjai David <small>Parai Maestro</small></div>
              </div>
            </div>
            <div className="about-divider reveal"/>
            <div className="reveal">
              <div className="about-block-title">Recognised by</div>
              <div className="about-badge-row">
                {['IIT Madras','Education Minister','Kanimozhi Karunanidhi MP','Nanban Organisation'].map(b => (
                  <span key={b} className="about-badge">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────── */}
      <section className="projects" id="projects">
        <div className="projects-header">
          <div className="section-label reveal">Stage Presence</div>
          <h2 className="section-title reveal" style={{transitionDelay:'0.1s'}}>
            Featured <em>Performances</em>
          </h2>
        </div>
        <div className="proj-scroll">
          <div className="proj-track">
            {PROJECTS.map((p, i) => (
              <div className="proj-card" key={i}>
                <div className="proj-card-bg"><ProjectBg p={p} idx={i}/></div>
                <div className="proj-overlay">
                  <div className="proj-num">0{i+1}</div>
                  <div className="proj-tag">{p.tag}</div>
                  <div className="proj-name">{p.name}</div>
                  <div className="proj-loc">📍 {p.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE & AWARDS ───────────────────────────────────── */}
      <section className="exp-awards" id="experience">
        <div className="exp-awards-inner">
          <div className="exp-side reveal-left">
            <div className="section-label" style={{marginBottom:'2rem'}}>Experience</div>
            <div className="big-stat">10+</div>
            <div className="big-stat-label">Years of Craft</div>
            <p className="exp-desc" style={{marginTop:'1.5rem'}}>
              Performing and teaching Tamil folk arts across stages, schools, temples,
              television, and international festivals. Every show is a conversation
              between the ancient and the present.
            </p>
          </div>
          <div className="awards-side reveal-right" style={{transitionDelay:'0.15s'}}>
            <div className="section-label" style={{marginBottom:'2rem'}}>Recognition</div>
            <div className="awards-list">
              {AWARDS.map((a, i) => (
                <div className="award-item" key={i} style={{transitionDelay:`${i*0.08}s`}}>
                  <div className="award-icon-wrap">{a.icon}</div>
                  <div>
                    <div className="award-title">{a.title}</div>
                    <div className="award-org">{a.org}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES (CLASSES / SHOWS) ────────────────────────────── */}
      <section className="services-sec" id="services">
        <div className="section-label reveal">Repertoire</div>
        <h2 className="section-title reveal" style={{transitionDelay:'0.1s'}}>
          Classes & <em>Shows</em>
        </h2>

        <div className="toggle-wrap reveal" style={{transitionDelay:'0.2s'}}>
          <div className="toggle-slider" style={{width:`calc(50% + 0px)`, transform:`translateX(${activeTab==='classes'?'0%':'100%'})`}}/>
          <button className={`toggle-btn ${activeTab==='classes'?'active':''}`}
            onClick={() => setActiveTab('classes')}>Classes</button>
          <button className={`toggle-btn ${activeTab==='shows'?'active':''}`}
            onClick={() => setActiveTab('shows')}>Shows</button>
        </div>

        <div className="services-grid">
          {currentList.map((s, i) => (
            <div className="service-cell" key={`${activeTab}-${i}`}
              style={{transitionDelay:`${(i%4)*0.07}s`}}>
              <div className="service-cell-num">{String(i+1).padStart(2,'0')}</div>
              <div className="service-cell-icon">{s.icon}</div>
              <div className="service-cell-name">{s.name}</div>
              <div className="service-cell-sub">{s.sub}</div>
              <div className="service-cell-line"/>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEDIA ─────────────────────────────────────────────────── */}
      <section className="media-sec" id="media">
        <div className="section-label reveal">Visual Archive</div>
        <h2 className="section-title reveal" style={{transitionDelay:'0.1s'}}>
          Watch & <em>Feel</em>
        </h2>
        <div className="media-grid">
          {MEDIA_ITEMS.map((item, i) => (
            <div className="media-item" key={i}>
              <div className="media-inner">
                <MediaThumb item={item} idx={i}/>
                <div className="media-hover-overlay">
                  <div className="media-play">▶</div>
                </div>
              </div>
              <div className="media-caption">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOOKING ───────────────────────────────────────────────── */}
      <section className="booking-sec" id="contact">
        <div className="booking-inner">
          <div className="reveal-left">
            <div className="section-label" style={{marginBottom:'2rem'}}>Get in Touch</div>
            <div className="booking-info-num">Book<br/><em style={{fontStyle:'italic',color:'var(--gold2)'}}>Now</em></div>
            <p className="booking-info-desc">
              Available for performances, workshops, cultural shows, and collaborations.
              Based in Chennai — performing globally.
            </p>
            <div className="booking-info-contact">
              <div className="contact-row"><span className="icon">📍</span> Chennai, Tamil Nadu, India</div>
              <div className="contact-row"><span className="icon">✉️</span> dhanush@folkartist.in</div>
              <div className="contact-row"><span className="icon">📞</span> +91 98765 43210</div>
              <div className="contact-row"><span className="icon">📸</span> @dhanush.folkartist</div>
            </div>
          </div>

          <div className="reveal-right" style={{transitionDelay:'0.15s'}}>
            <form className="booking-form" onSubmit={handleSubmit}>
              {[
                {id:'name',label:'Your Name',type:'text',ph:'Full Name'},
                {id:'email',label:'Email Address',type:'email',ph:'you@mail.com'},
                {id:'phone',label:'Phone (optional)',type:'tel',ph:'+91 XXXXXXXXXX'},
              ].map(f => (
                <div className={`field-wrap ${form[f.id]?'filled':''}`} key={f.id}>
                  <label className="field-label">{f.label}</label>
                  <input className="field-input" type={f.type}
                    value={form[f.id]}
                    onChange={e => setForm({...form,[f.id]:e.target.value})}
                    required={f.id!=='phone'}/>
                  <div className="field-glow"/>
                </div>
              ))}
              <div className={`field-wrap ${form.type?'filled':''}`}>
                <label className="field-label">Event Type</label>
                <select className="field-select" value={form.type}
                  onChange={e => setForm({...form,type:e.target.value})} required>
                  <option value=""/>
                  {['Stage Performance','Cultural Festival','Workshop','Wedding','Television / Film','School / College Event'].map(o => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <div className="field-glow"/>
              </div>
              <div className={`field-wrap ${form.msg?'filled':''}`}>
                <label className="field-label">Message</label>
                <textarea className="field-textarea"
                  value={form.msg}
                  onChange={e => setForm({...form,msg:e.target.value})}/>
                <div className="field-glow"/>
              </div>
              <div className="submit-btn-wrap">
                <button type="submit" className="submit-btn">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo-big">Dha<em>nush</em></div>
          <div className="footer-links">
            <div className="footer-link-group">
              <div className="footer-link-title">Explore</div>
              {['About','Projects','Services','Media','Contact'].map(l => (
                <a key={l} href={`#${l.toLowerCase()}`} className="footer-link-item">{l}</a>
              ))}
            </div>
            <div className="footer-link-group">
              <div className="footer-link-title">Offerings</div>
              {['Performances','Workshops','Cultural Shows','School Programs','Film BGM'].map(l => (
                <span key={l} className="footer-link-item" style={{cursor:'default'}}>{l}</span>
              ))}
            </div>
            <div className="footer-link-group">
              <div className="footer-link-title">Connect</div>
              {['Instagram','YouTube','Facebook','LinkedIn'].map(l => (
                <a key={l} href="#" className="footer-link-item">{l}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© 2024 Dhanush — Folk Artist. All rights reserved.</span>
          <div className="footer-wave">
            {Array.from({length:12},(_,i) => (
              <div key={i} className="footer-wave-bar" style={{
                animationDelay:`${i*0.1}s`,
                height:`${4+Math.sin(i)*6}px`
              }}/>
            ))}
          </div>
          <span className="footer-tamil">பறை – ஒரு அடையாளம்</span>
        </div>
      </footer>

      {/* ── MODAL ─────────────────────────────────────────────────── */}
      {modalOpen && (
        <div className="modal-bg" onClick={e => e.target.className === 'modal-bg' && closeModal()}>
          <div className="modal-box">
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
            {!submitted ? (
              <>
                <div className="modal-title">Book a Show</div>
                <div className="modal-sub">Dhanush's team will reach you within 24 hours.</div>
                <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'0'}}>
                  {[
                    {id:'mname',label:'Name',type:'text'},
                    {id:'memail',label:'Email',type:'email'},
                    {id:'mphone',label:'Phone',type:'tel'},
                  ].map(f => (
                    <div className="field-wrap" key={f.id} style={{marginBottom:'0.3rem'}}>
                      <label className="field-label">{f.label}</label>
                      <input className="field-input" type={f.type} required/>
                      <div className="field-glow"/>
                    </div>
                  ))}
                  <div className="field-wrap" style={{marginBottom:'0.3rem'}}>
                    <label className="field-label">Event</label>
                    <select className="field-select" required>
                      <option value=""/>
                      {['Stage Show','Festival','Workshop','Wedding','Other'].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <div className="field-glow"/>
                  </div>
                  <div className="field-wrap" style={{marginBottom:'1.5rem'}}>
                    <label className="field-label">Message</label>
                    <textarea className="field-textarea"/>
                    <div className="field-glow"/>
                  </div>
                  <button type="submit" className="submit-btn">Confirm Booking</button>
                </form>
              </>
            ) : (
              <div className="success-state">
                <div className="success-icon">🥁</div>
                <div className="success-title">Booking Received!</div>
                <p className="success-desc" style={{marginTop:'0.8rem'}}>
                  Thank you — Dhanush's team will contact you within 24 hours to confirm details.
                </p>
                <div style={{marginTop:'2rem',fontFamily:'var(--font-display)',fontStyle:'italic',color:'var(--gold)',fontSize:'1.1rem'}}>
                  பறை – ஒரு அடையாளம்
                </div>
                <button className="btn-ghost" style={{marginTop:'1.5rem',padding:'0.8rem 2rem',cursor:'none'}} onClick={closeModal}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
