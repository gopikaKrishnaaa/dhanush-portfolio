/* eslint-disable */
import { useState, useEffect, useRef, useCallback } from "react";
import dhanushImg from "./Assests/dhanush.png";



// ── ADD YOUR PHOTOS ──────────────────────────────────────────────
// Hero photo:   replace <HeroIllustration/> with <img src="dhanush.jpg" .../>
// Mentor photos: replace emoji in mentor-photo div with <img src="paul.jpg" .../>
// Media photos:  replace media-placeholder div with <img src="show.jpg" .../>
// ────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Tenor+Sans&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --bg:    #0C0905;
  --bg2:   #110D07;
  --bg3:   #181008;
  --gold:  #C9A84C;
  --gold2: #E8C878;
  --gold3: #8B6820;
  --amber: #D4701A;
  --cream: #F0E2C4;
  --muted: rgba(240,226,196,0.45);
  --line:  rgba(201,168,76,0.18);
  --font-display: 'Cormorant Garamond', serif;
  --font-ui:      'Tenor Sans', sans-serif;
  --font-body:    'DM Sans', sans-serif;
}
*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html { scroll-behavior:smooth; font-size:16px; }
body { background:var(--bg); color:var(--cream); font-family:var(--font-body); overflow-x:hidden; cursor:none; }
::-webkit-scrollbar { width:2px; }
::-webkit-scrollbar-track { background:var(--bg); }
::-webkit-scrollbar-thumb { background:var(--gold3); }

/* GRAIN */
.grain { position:fixed; inset:-200%; width:400%; height:400%; pointer-events:none; z-index:9000; opacity:0.032;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation:grainMove 0.4s steps(1) infinite; }
@keyframes grainMove {
  0%,100%{transform:translate(0,0)} 10%{transform:translate(-3%,-4%)} 20%{transform:translate(-6%,3%)}
  30%{transform:translate(4%,-2%)} 40%{transform:translate(-2%,6%)} 50%{transform:translate(-5%,0)}
  60%{transform:translate(4%,4%)} 70%{transform:translate(0,-5%)} 80%{transform:translate(-3%,2%)} 90%{transform:translate(5%,3%)} }

/* BG CANVAS */
.bg-canvas { position:fixed; inset:0; z-index:1; opacity:0; transition:opacity 2s ease; pointer-events:none; }
.bg-canvas.visible { opacity:1; }

/* PRELOADER */
.preloader { position:fixed; inset:0; z-index:8500; background:var(--bg);
  display:flex; flex-direction:column; justify-content:space-between; padding:40px 5vw;
  transition:opacity 0.9s ease, visibility 0.9s ease; }
.preloader.out { opacity:0; visibility:hidden; }
.pre-top { display:flex; justify-content:space-between; align-items:flex-start; }
.pre-logo { font-family:var(--font-display); font-size:1.2rem; font-weight:600; letter-spacing:4px; text-transform:uppercase; color:rgba(232,200,120,0.5); }
.pre-logo em { font-style:italic; color:var(--gold2); }
.pre-status { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:3px; text-transform:uppercase; color:rgba(240,226,196,0.25); }
.pre-mid { display:flex; flex-direction:column; align-items:center; gap:24px; }
.pre-count { font-family:var(--font-display); font-size:clamp(6rem,18vw,16rem); font-weight:300; line-height:1; color:var(--cream); letter-spacing:-0.04em; font-variant-numeric:tabular-nums; }
.pre-track { width:clamp(200px,40vw,400px); height:1px; background:rgba(201,168,76,0.12); }
.pre-fill { height:100%; background:var(--gold); transition:width 0.05s linear; }
.pre-bot { display:flex; justify-content:space-between; align-items:flex-end; }
.pre-tagline { font-family:var(--font-display); font-size:1rem; font-style:italic; color:rgba(240,226,196,0.35); }
.pre-pct { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.2em; color:rgba(240,226,196,0.2); }

/* CURSOR */
.cursor-dot { position:fixed; top:0; left:0; pointer-events:none; z-index:8001; mix-blend-mode:difference; }
.cursor-dot-inner { width:8px; height:8px; border-radius:50%; background:var(--gold2); transform:translate(-50%,-50%); transition:width 0.3s,height 0.3s; }
.cursor-dot.hov .cursor-dot-inner { width:40px; height:40px; background:rgba(201,168,76,0.25); }
.cursor-ring { position:fixed; top:0; left:0; pointer-events:none; z-index:8000; }
.cursor-ring-inner { width:36px; height:36px; border-radius:50%; border:1px solid rgba(201,168,76,0.5); transform:translate(-50%,-50%); transition:width 0.35s,height 0.35s,border-color 0.3s; }
.cursor-ring.hov .cursor-ring-inner { width:60px; height:60px; border-color:var(--gold); }

/* NAV */
.nav { position:fixed; top:0; left:0; right:0; z-index:700; display:flex; justify-content:space-between; align-items:center; padding:28px 5vw; transition:background 0.5s,padding 0.4s,border-color 0.4s; border-bottom:1px solid transparent; }
.nav.stuck { background:rgba(12,9,5,0.92); backdrop-filter:blur(20px); padding:16px 5vw; border-color:var(--line); }
.nav-logo { font-family:var(--font-display); font-size:1.15rem; font-weight:600; letter-spacing:3px; text-transform:uppercase; color:var(--gold2); text-decoration:none; cursor:none; line-height:1.1; }
.nav-logo em { font-style:italic; }
.nav-logo small { display:block; font-size:0.5rem; letter-spacing:3px; color:var(--muted); font-family:var(--font-ui); margin-top:2px; }
.nav-links { display:flex; gap:2.5rem; list-style:none; align-items:center; }
.nav-links a { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:2.5px; text-transform:uppercase; color:var(--muted); text-decoration:none; transition:color 0.3s; cursor:none; }
.nav-links a:hover { color:var(--gold2); }
.nav-cta { font-family:var(--font-ui); font-size:0.68rem; letter-spacing:2px; text-transform:uppercase; color:var(--bg); background:var(--gold); border:none; padding:0.65rem 1.6rem; cursor:none; transition:background 0.3s,transform 0.2s; }
.nav-cta:hover { background:var(--gold2); transform:translateY(-1px); }

/* HERO */
.hero { position:relative; height:100vh; overflow:hidden; display:flex; align-items:flex-end; padding:0 5vw 8vh; }
.hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse 80% 100% at 65% 0%,rgba(201,168,76,0.07) 0%,transparent 60%),radial-gradient(ellipse 50% 60% at 80% 80%,rgba(212,112,26,0.04) 0%,transparent 50%),var(--bg); }
.particles-wrap { position:absolute; inset:0; overflow:hidden; pointer-events:none; }
.particle { position:absolute; width:2px; height:2px; border-radius:50%; background:var(--gold); animation:particleDrift linear infinite; }
@keyframes particleDrift { 0%{transform:translateY(100vh) translateX(0);opacity:0} 10%{opacity:0.6} 90%{opacity:0.3} 100%{transform:translateY(-20vh) translateX(var(--dx,20px));opacity:0} }
.scroll-ripple { position:fixed; pointer-events:none; z-index:7000; border-radius:50%; border:1px solid rgba(201,168,76,0.4); animation:rippleExpand 0.8s ease-out forwards; }
@keyframes rippleExpand { from{width:0;height:0;opacity:0.7;margin:0} to{width:120px;height:120px;opacity:0;margin:-60px 0 0 -60px} }

.hero-img-wrap { position:absolute; right:5vw; top:0; bottom:0; width:44%; display:flex; align-items:center; justify-content:center; animation:heroFloat 8s ease-in-out infinite; }
@keyframes heroFloat { 0%,100%{transform:translateY(0) rotate(0.5deg)} 50%{transform:translateY(-22px) rotate(-0.5deg)} }
.hero-img-frame { position:relative; width:100%; max-width:500px; animation:heroFallIn 1.8s cubic-bezier(0.16,1,0.3,1) both; }
@keyframes heroFallIn { from{transform:translateY(-80px) scale(1.05);opacity:0} to{transform:translateY(0) scale(1);opacity:1} }
.hero-img-inner { width:100%; aspect-ratio:3/4; position:relative; overflow:hidden; clip-path:polygon(6% 0%,94% 0%,100% 6%,100% 94%,94% 100%,6% 100%,0% 94%,0% 6%); background:linear-gradient(160deg,#2A1A08,#1A0E05,#0C0905); }
.hero-img-inner img { width:100%; height:100%; object-fit:cover; display:block; }
.hero-img-inner svg { width:100%; height:100%; }
.hero-img-glow { position:absolute; inset:0; background:radial-gradient(ellipse 60% 40% at 50% 0%,rgba(201,168,76,0.12),transparent); animation:glowPulse 4s ease-in-out infinite; }
@keyframes glowPulse { 0%,100%{opacity:0.7} 50%{opacity:1.3} }
.hero-img-border { position:absolute; inset:-1px; border:1px solid rgba(201,168,76,0.25); clip-path:polygon(6% 0%,94% 0%,100% 6%,100% 94%,94% 100%,6% 100%,0% 94%,0% 6%); }

.hero-content { position:relative; z-index:2; max-width:540px; }
.hero-eyebrow { display:flex; align-items:center; gap:1rem; margin-bottom:1.2rem; animation:fadeUp 1s 0.4s both; }
.hero-eyebrow-line { width:50px; height:1px; background:var(--gold); flex-shrink:0; }
.hero-eyebrow-text { font-family:var(--font-ui); font-size:0.65rem; letter-spacing:3.5px; text-transform:uppercase; color:var(--gold); }

.hero-name { font-family:var(--font-display); font-size:clamp(3rem,7vw,6.5rem); font-weight:300; line-height:0.9; letter-spacing:-2px; color:var(--cream); animation:fadeUp 1.2s 0.2s both; }
.hero-name em { font-style:italic; color:var(--gold2); display:block; }

.hero-degrees { display:flex; align-items:center; gap:0.6rem; margin:1rem 0 0.8rem; flex-wrap:wrap; animation:fadeUp 1s 0.55s both; }
.hero-deg { font-family:var(--font-ui); font-size:0.58rem; letter-spacing:2.5px; text-transform:uppercase; color:rgba(201,168,76,0.7); border:1px solid rgba(201,168,76,0.25); padding:0.3rem 0.85rem; }
.hero-deg-sep { color:rgba(201,168,76,0.3); font-size:0.7rem; }

.hero-roles { display:flex; align-items:center; gap:0; margin-bottom:1.8rem; flex-wrap:wrap; animation:fadeUp 1s 0.7s both; }
.hero-role-tag { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:3px; text-transform:uppercase; color:var(--muted); padding-right:1rem; margin-right:1rem; border-right:1px solid var(--gold3); line-height:1; }
.hero-role-tag:last-child { border-right:none; margin-right:0; padding-right:0; }

.hero-tagline { font-family:var(--font-display); font-size:1.1rem; font-style:italic; color:rgba(201,168,76,0.72); line-height:1.65; border-left:1px solid var(--gold3); padding-left:1.2rem; margin-bottom:2.8rem; animation:fadeUp 1s 0.85s both; }
.hero-btns { display:flex; gap:1rem; animation:fadeUp 1s 1s both; flex-wrap:wrap; }
.hero-scroll { position:absolute; bottom:3rem; left:50%; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:0.5rem; animation:fadeUp 1s 1.5s both; }
.hero-scroll-text { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:3px; text-transform:uppercase; color:var(--muted); }
.hero-scroll-bar { width:1px; height:60px; background:var(--line); position:relative; overflow:hidden; }
.hero-scroll-bar::after { content:''; position:absolute; top:0; left:0; width:100%; height:40%; background:var(--gold); animation:scrollDrop 2s ease-in-out infinite; }
@keyframes scrollDrop { 0%{transform:translateY(-100%)} 100%{transform:translateY(300%)} }
@keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }

/* MARQUEE */
.marquee-band { overflow:hidden; background:var(--gold); padding:13px 0; border-top:1px solid rgba(240,226,196,0.05); border-bottom:1px solid rgba(240,226,196,0.05); }
.marquee-inner { display:flex; white-space:nowrap; animation:marqueeRun 28s linear infinite; }
.marquee-inner:hover { animation-play-state:paused; }
.marquee-inner span { font-family:var(--font-ui); font-size:0.9rem; letter-spacing:0.14em; color:var(--bg); padding:0 28px; }
@keyframes marqueeRun { from{transform:translateX(0)} to{transform:translateX(-50%)} }

/* SECTION COMMONS */
.sec-label { font-family:var(--font-ui); font-size:0.65rem; letter-spacing:5px; text-transform:uppercase; color:var(--gold); margin-bottom:1.5rem; display:flex; align-items:center; gap:1rem; }
.sec-label::before { content:''; width:40px; height:1px; background:var(--gold); display:block; }
.sec-title { font-family:var(--font-display); font-size:clamp(2.5rem,5vw,4.2rem); font-weight:300; line-height:1.05; color:var(--cream); }
.sec-title em { font-style:italic; color:var(--gold2); }

/* BUTTONS */
.btn { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:2.5px; text-transform:uppercase; border:none; padding:0.9rem 2.2rem; cursor:none; transition:all 0.3s; position:relative; overflow:hidden; }
.btn-gold { color:var(--bg); background:var(--gold); }
.btn-gold::after { content:''; position:absolute; inset:0; background:var(--gold2); transform:translateX(-100%); transition:transform 0.4s ease; }
.btn-gold:hover::after { transform:translateX(0); }
.btn-gold > span { position:relative; z-index:1; }
.btn-ghost { color:var(--gold); background:transparent; border:1px solid rgba(201,168,76,0.4); }
.btn-ghost:hover { border-color:var(--gold); background:rgba(201,168,76,0.08); }

/* SCROLL REVEALS */
.reveal { opacity:0; transform:translateY(36px); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1); }
.reveal.vis { opacity:1; transform:translateY(0); }
.reveal-left { opacity:0; transform:translateX(-44px); transition:opacity 0.9s,transform 0.9s cubic-bezier(0.16,1,0.3,1); }
.reveal-right { opacity:0; transform:translateX(44px); transition:opacity 0.9s,transform 0.9s cubic-bezier(0.16,1,0.3,1); }
.reveal-left.vis,.reveal-right.vis { opacity:1; transform:translateX(0); }

/* GALLERY */
.gallery-sec { padding:14vh 5vw; background:var(--bg); }
.gallery-header { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:3.5rem; flex-wrap:wrap; gap:1rem; }
.gallery-count { font-family:var(--font-ui); font-size:0.72rem; letter-spacing:0.2em; color:var(--muted); }
.filter-row { display:flex; gap:28px; margin-bottom:2.5rem; flex-wrap:wrap; border-bottom:1px solid rgba(201,168,76,0.08); padding-bottom:18px; }
.filter-btn { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:0.18em; text-transform:uppercase; color:var(--muted); background:none; border:none; cursor:none; padding:4px 0; position:relative; transition:color 0.3s; }
.filter-btn::after { content:''; position:absolute; bottom:-1px; left:0; right:0; height:1px; background:var(--cream); transform:scaleX(0); transform-origin:left; transition:transform 0.35s ease; }
.filter-btn.active,.filter-btn:hover { color:var(--cream); }
.filter-btn.active::after,.filter-btn:hover::after { transform:scaleX(1); }
.gallery-list { display:flex; flex-direction:column; }
.gallery-item { display:grid; grid-template-columns:64px 1fr 180px 110px; align-items:center; gap:32px; padding:22px 0; border-bottom:1px solid rgba(201,168,76,0.07); cursor:none; position:relative; overflow:hidden; transition:padding 0.4s cubic-bezier(0.23,1,0.32,1); }
.gallery-item::before { content:''; position:absolute; left:0; top:0; bottom:0; width:0; background:rgba(201,168,76,0.04); transition:width 0.5s ease; }
.gallery-item:hover { padding-left:14px; }
.gallery-item:hover::before { width:100%; }
.gi-num { font-family:var(--font-display); font-size:0.7rem; color:rgba(201,168,76,0.25); letter-spacing:0.1em; transition:color 0.3s; }
.gallery-item:hover .gi-num { color:var(--gold); }
.gi-title { font-family:var(--font-display); font-size:clamp(1.3rem,2.8vw,2.6rem); font-weight:300; color:var(--cream); transition:color 0.35s; letter-spacing:-0.015em; }
.gallery-item:hover .gi-title { color:var(--gold2); }
.gi-meta { font-size:0.75rem; color:var(--muted); }
.gi-tag { font-family:var(--font-ui); font-size:0.65rem; letter-spacing:0.14em; color:rgba(201,168,76,0.55); border:1px solid rgba(201,168,76,0.2); padding:5px 12px; text-align:center; justify-self:end; transition:all 0.3s; }
.gallery-item:hover .gi-tag { color:var(--gold); border-color:rgba(201,168,76,0.5); }
.gallery-preview { position:fixed; pointer-events:none; z-index:600; border-radius:2px; overflow:hidden; width:clamp(160px,16vw,260px); aspect-ratio:3/4; box-shadow:0 40px 100px rgba(0,0,0,0.75); opacity:0; transform:scale(0.9) rotate(-2deg); transition:opacity 0.3s,transform 0.35s cubic-bezier(0.23,1,0.32,1); display:flex; align-items:center; justify-content:center; font-size:3rem; }
.gallery-preview.active { opacity:1; transform:scale(1) rotate(0deg); }
.gallery-preview::after { content:''; position:absolute; inset:0; border:1px solid rgba(201,168,76,0.15); }

/* ABOUT */
.about-sec { padding:14vh 5vw; background:var(--bg2); position:relative; overflow:hidden; }
.about-watermark { position:absolute; right:-2vw; top:50%; transform:translateY(-50%) rotate(90deg); font-family:var(--font-display); font-size:18vw; font-weight:700; color:rgba(201,168,76,0.022); letter-spacing:8px; pointer-events:none; user-select:none; white-space:nowrap; }
.about-grid { display:grid; grid-template-columns:1fr 1fr; gap:8vw; align-items:start; max-width:1200px; margin:0 auto; }
.about-body { font-size:0.95rem; line-height:1.9; color:var(--muted); margin:1.5rem 0; }
.about-body strong { color:var(--gold); font-weight:500; }

/* MENTOR CARDS */
.mentor-block { margin-top:2rem; padding-top:2rem; border-top:1px solid var(--line); }
.mentor-label { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:4px; text-transform:uppercase; color:var(--gold3); margin-bottom:1.2rem; }
.mentor-card { display:flex; align-items:center; gap:1.2rem; padding:1rem 1.2rem; margin-bottom:0.8rem; border:1px solid rgba(201,168,76,0.1); transition:border-color 0.3s,background 0.3s; cursor:none; }
.mentor-card:hover { border-color:rgba(201,168,76,0.35); background:rgba(201,168,76,0.04); }
.mentor-photo { width:60px; height:60px; border-radius:50%; flex-shrink:0; overflow:hidden; border:1px solid rgba(201,168,76,0.3); display:flex; align-items:center; justify-content:center; font-size:1.6rem; background:linear-gradient(135deg,#2A1A08,#8B4010); }
.mentor-photo img { width:100%; height:100%; object-fit:cover; border-radius:50%; }
.mentor-name-text { font-family:var(--font-display); font-size:1.05rem; font-weight:400; color:var(--cream); margin-bottom:0.15rem; }
.mentor-role-text { font-family:var(--font-body); font-size:0.72rem; color:var(--muted); }

.about-right { display:flex; flex-direction:column; gap:2.5rem; }
.about-sub-label { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:4px; text-transform:uppercase; color:var(--gold3); margin-bottom:1rem; }
.badge-row { display:flex; flex-wrap:wrap; gap:0.6rem; }
.badge { font-family:var(--font-body); font-size:0.72rem; border:1px solid var(--line); color:var(--muted); padding:0.4rem 0.9rem; transition:all 0.3s; cursor:none; }
.badge:hover { border-color:var(--gold); color:var(--gold); }
.stat-row { display:flex; align-items:baseline; gap:12px; padding:18px 0; border-bottom:1px solid var(--line); }
.stat-row:last-child { border-bottom:none; }
.stat-num { font-family:var(--font-display); font-size:3.5rem; font-weight:300; color:var(--gold); line-height:1; min-width:80px; }
.stat-desc { font-size:0.8rem; color:var(--muted); line-height:1.5; }

/* PROJECTS */
.projects-sec { padding:14vh 5vw 0; background:var(--bg); }
.proj-hint { font-size:0.78rem; font-family:var(--font-ui); letter-spacing:0.15em; color:var(--muted); margin:1rem 0 2rem; }
.proj-scroll-wrap { overflow-x:auto; padding:1rem 5vw 4rem; margin:0 -5vw; scrollbar-width:none; }
.proj-scroll-wrap::-webkit-scrollbar { display:none; }
.proj-track { display:flex; gap:1.5rem; width:max-content; cursor:grab; }
.proj-track:active { cursor:grabbing; }
.proj-card { width:380px; height:480px; position:relative; flex-shrink:0; overflow:hidden; cursor:none; clip-path:polygon(0 0,95% 0,100% 5%,100% 100%,5% 100%,0 95%); transition:transform 0.5s cubic-bezier(0.16,1,0.3,1); }
.proj-card:hover { transform:translateY(-10px); }
.proj-card-bg { position:absolute; inset:0; background-size:cover; background-position:center; transition:transform 0.7s cubic-bezier(0.16,1,0.3,1); }
.proj-card:hover .proj-card-bg { transform:scale(1.08); }
.proj-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(12,9,5,0.96) 0%,rgba(12,9,5,0.2) 50%,transparent 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:2rem; }
.proj-bg-num { position:absolute; top:1.5rem; right:1.5rem; font-family:var(--font-display); font-size:3.5rem; font-weight:300; color:rgba(201,168,76,0.12); line-height:1; }
.proj-tag-label { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:3px; text-transform:uppercase; color:var(--gold); margin-bottom:0.6rem; }
.proj-name { font-family:var(--font-display); font-size:1.6rem; font-weight:400; color:var(--cream); line-height:1.2; margin-bottom:0.5rem; }
.proj-loc { font-family:var(--font-body); font-size:0.78rem; color:var(--muted); display:flex; align-items:center; gap:0.4rem; }

/* EXP & AWARDS */
.exp-awards-sec { padding:14vh 5vw; background:var(--bg3); }
.ea-grid { display:grid; grid-template-columns:1fr 1fr; gap:6vw; max-width:1200px; margin:0 auto; align-items:start; }
.big-stat-num { font-family:var(--font-display); font-size:clamp(5rem,10vw,9rem); font-weight:300; color:transparent; -webkit-text-stroke:1px rgba(201,168,76,0.3); line-height:0.9; margin-bottom:0.5rem; }
.big-stat-label { font-family:var(--font-ui); font-size:0.65rem; letter-spacing:4px; text-transform:uppercase; color:var(--gold); margin-bottom:2rem; }
.exp-description { font-size:0.95rem; line-height:1.9; color:var(--muted); max-width:400px; }
.awards-list { display:flex; flex-direction:column; margin-top:2rem; }
.award-item { display:flex; align-items:flex-start; gap:1.5rem; padding:1.5rem 0; border-bottom:1px solid var(--line); transition:all 0.3s; cursor:none; }
.award-item:hover { padding-left:0.6rem; }
.award-icon-box { width:42px; height:42px; border:1px solid var(--gold3); display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:1.1rem; transition:background 0.3s; }
.award-item:hover .award-icon-box { background:rgba(201,168,76,0.1); }
.award-title-text { font-family:var(--font-display); font-size:1rem; font-weight:400; color:var(--cream); margin-bottom:0.2rem; }
.award-org-text { font-family:var(--font-body); font-size:0.78rem; color:var(--muted); }

/* SERVICES */
.services-sec { padding:14vh 5vw; background:var(--bg); position:relative; overflow:hidden; }
.services-sec::after { content:''; position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,var(--gold3),transparent); }
.toggle-wrap { display:flex; align-items:center; gap:0; margin:3rem 0; position:relative; width:fit-content; }
.toggle-slider { position:absolute; top:0; left:0; height:100%; background:var(--gold); transition:transform 0.4s cubic-bezier(0.16,1,0.3,1); z-index:0; pointer-events:none; }
.toggle-btn { font-family:var(--font-ui); font-size:0.68rem; letter-spacing:3px; text-transform:uppercase; background:none; border:none; cursor:none; padding:0.8rem 2.5rem; color:var(--muted); position:relative; z-index:1; transition:color 0.4s; }
.toggle-btn.active { color:var(--bg); }
.svc-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:var(--line); border:1px solid var(--line); }
.svc-cell { background:var(--bg); padding:2rem 1.5rem; position:relative; overflow:hidden; cursor:none; min-height:180px; display:flex; flex-direction:column; justify-content:flex-end; transition:background 0.4s,opacity 0.5s,transform 0.5s; opacity:0; transform:translateY(18px); }
.svc-cell.vis { opacity:1; transform:translateY(0); }
.svc-cell:hover { background:rgba(201,168,76,0.06); }
.svc-cell-num { position:absolute; top:1rem; right:1.2rem; font-family:var(--font-display); font-size:2.5rem; font-weight:300; color:rgba(201,168,76,0.07); line-height:1; }
.svc-icon { font-size:1.6rem; margin-bottom:1rem; }
.svc-name { font-family:var(--font-display); font-size:1.05rem; font-weight:400; color:var(--cream); margin-bottom:0.3rem; line-height:1.2; }
.svc-sub { font-family:var(--font-body); font-size:0.73rem; color:var(--muted); line-height:1.5; }
.svc-line { width:0; height:1px; background:var(--gold); transition:width 0.5s ease; margin-top:0.8rem; }
.svc-cell:hover .svc-line { width:30px; }

/* MEDIA */
.media-sec { padding:14vh 5vw; background:var(--bg2); }
.media-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; margin-top:3rem; }
.media-item { position:relative; overflow:hidden; cursor:none; background:var(--bg3); transition:transform 0.5s cubic-bezier(0.16,1,0.3,1); }
.media-item:nth-child(1) { grid-column:1/3; }
.media-item:nth-child(4) { grid-column:2/4; }
.media-item:hover { transform:scale(0.985); }
.media-inner { width:100%; aspect-ratio:16/9; position:relative; overflow:hidden; }
.media-item:nth-child(1) .media-inner,.media-item:nth-child(4) .media-inner { aspect-ratio:21/9; }
.media-placeholder { width:100%; height:100%; display:flex; align-items:center; justify-content:center; flex-direction:column; gap:12px; font-size:3rem; }
.media-placeholder-label { font-family:var(--font-ui); font-size:0.62rem; letter-spacing:0.2em; text-transform:uppercase; opacity:0.5; }
.media-hover-overlay { position:absolute; inset:0; opacity:0; background:rgba(12,9,5,0.55); display:flex; align-items:center; justify-content:center; transition:opacity 0.4s; }
.media-item:hover .media-hover-overlay { opacity:1; }
.media-play { width:54px; height:54px; border-radius:50%; border:1px solid var(--gold); display:flex; align-items:center; justify-content:center; color:var(--gold); font-size:1.1rem; transition:background 0.3s; }
.media-item:hover .media-play { background:rgba(201,168,76,0.15); }
.media-caption { padding:1rem 1.2rem; font-family:var(--font-ui); font-size:0.65rem; letter-spacing:2px; text-transform:uppercase; color:var(--muted); border-top:1px solid var(--line); }

/* BOOKING */
.booking-sec { padding:14vh 5vw; background:var(--bg3); }
.booking-grid { display:grid; grid-template-columns:1fr 1fr; gap:8vw; align-items:start; max-width:1100px; margin:0 auto; }
.booking-num { font-family:var(--font-display); font-size:clamp(3rem,6vw,5.5rem); font-weight:300; color:transparent; -webkit-text-stroke:1px rgba(201,168,76,0.3); line-height:0.9; }
.booking-num em { font-style:italic; color:rgba(232,200,120,0.5); }
.booking-desc { font-size:0.9rem; line-height:1.9; color:var(--muted); margin-top:1.5rem; max-width:340px; }
.contact-list { margin-top:2rem; display:flex; flex-direction:column; gap:0.7rem; }
.contact-row { display:flex; align-items:center; gap:1rem; font-size:0.83rem; color:var(--muted); }
.contact-icon { color:var(--gold); font-size:0.9rem; width:20px; text-align:center; }
.booking-form { display:flex; flex-direction:column; }
.form-field { position:relative; border-bottom:1px solid var(--line); transition:border-color 0.4s; }
.form-field:focus-within { border-color:var(--gold); }
.form-field label { position:absolute; top:1.2rem; left:0; font-family:var(--font-ui); font-size:0.6rem; letter-spacing:3px; text-transform:uppercase; color:var(--muted); transition:all 0.3s; pointer-events:none; }
.form-field.filled label,.form-field:focus-within label { top:0.2rem; font-size:0.52rem; color:var(--gold); }
.form-field input,.form-field textarea { width:100%; background:transparent; border:none; outline:none; font-family:var(--font-body); font-size:0.9rem; color:var(--cream); padding:2rem 0 0.8rem; cursor:none; }
.form-field textarea { resize:none; height:100px; }
.field-glow { position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:0; height:1px; background:var(--gold); transition:width 0.5s ease; }
.form-field:focus-within .field-glow { width:100%; }
.submit-btn { font-family:var(--font-ui); font-size:0.7rem; letter-spacing:3px; text-transform:uppercase; color:var(--bg); background:var(--gold); border:none; padding:1.1rem 3rem; cursor:none; width:100%; margin-top:2.5rem; position:relative; overflow:hidden; transition:background 0.3s; }
.submit-btn::after { content:''; position:absolute; top:50%; left:50%; width:0; height:0; border-radius:50%; background:rgba(255,255,255,0.2); transform:translate(-50%,-50%); transition:width 0.6s,height 0.6s; }
.submit-btn:hover::after { width:400px; height:400px; }
.submit-btn:hover { background:var(--gold2); }

/* FOOTER */
.footer { padding:8vh 5vw 4vh; background:var(--bg); border-top:1px solid var(--line); }
.footer-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6vh; flex-wrap:wrap; gap:2rem; }
.footer-logo { font-family:var(--font-display); font-size:clamp(3rem,7vw,6rem); font-weight:300; color:transparent; -webkit-text-stroke:1px rgba(201,168,76,0.28); line-height:0.9; }
.footer-logo em { font-style:italic; color:rgba(201,168,76,0.45); }
.footer-logo-sub { font-family:var(--font-ui); font-size:0.55rem; letter-spacing:3px; color:var(--gold3); text-transform:uppercase; margin-top:0.6rem; }
.footer-links-grid { display:flex; gap:4rem; flex-wrap:wrap; }
.footer-link-group { display:flex; flex-direction:column; gap:0.7rem; }
.footer-link-group-title { font-family:var(--font-ui); font-size:0.6rem; letter-spacing:3px; text-transform:uppercase; color:var(--gold3); margin-bottom:0.3rem; }
.footer-link { font-family:var(--font-body); font-size:0.82rem; color:var(--muted); text-decoration:none; transition:color 0.3s; cursor:none; }
.footer-link:hover { color:var(--gold); }
.footer-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:3vh; border-top:1px solid var(--line); flex-wrap:wrap; gap:1rem; }
.footer-copy { font-family:var(--font-body); font-size:0.75rem; color:rgba(240,226,196,0.22); }
.footer-tamil { font-family:var(--font-display); font-style:italic; font-size:1.1rem; color:rgba(201,168,76,0.4); }
.footer-wave { display:flex; align-items:center; gap:3px; }
.footer-wave-bar { width:2px; border-radius:2px; background:var(--gold3); animation:waveFooter 1.4s ease-in-out infinite; }
@keyframes waveFooter { 0%,100%{height:4px;opacity:0.4} 50%{height:14px;opacity:0.9} }

/* MODAL */
.modal-bg { position:fixed; inset:0; z-index:9999; background:rgba(12,9,5,0.95); backdrop-filter:blur(20px); display:flex; align-items:center; justify-content:center; padding:2rem; animation:fadeInModal 0.4s; }
.modal-box { background:var(--bg2); border:1px solid var(--line); padding:3rem; max-width:500px; width:100%; position:relative; animation:modalSlideIn 0.5s cubic-bezier(0.16,1,0.3,1); max-height:90vh; overflow-y:auto; }
@keyframes modalSlideIn { from{opacity:0;transform:scale(0.94) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes fadeInModal { from{opacity:0} to{opacity:1} }
.modal-close-btn { position:absolute; top:1.5rem; right:1.5rem; background:none; border:1px solid var(--line); color:var(--muted); cursor:none; width:36px; height:36px; display:flex; align-items:center; justify-content:center; font-size:1rem; transition:all 0.3s; }
.modal-close-btn:hover { border-color:var(--gold); color:var(--gold); }
.modal-title { font-family:var(--font-display); font-size:2rem; font-weight:300; color:var(--cream); margin-bottom:0.5rem; }
.modal-sub { font-family:var(--font-body); font-size:0.82rem; color:var(--muted); margin-bottom:2rem; }
.success-state { text-align:center; padding:2rem 0; }
.success-icon { font-size:3rem; margin-bottom:1rem; }
.success-title { font-family:var(--font-display); font-size:1.8rem; color:var(--gold2); margin-bottom:0.5rem; }
.success-desc { font-family:var(--font-body); font-size:0.85rem; color:var(--muted); }
.success-tamil { margin-top:2rem; font-family:var(--font-display); font-style:italic; color:var(--gold); font-size:1.1rem; }

/* RESPONSIVE */
@media(max-width:1100px) {
  .svc-grid { grid-template-columns:repeat(3,1fr); }
  .about-grid,.ea-grid,.booking-grid { grid-template-columns:1fr; gap:48px; }
  .media-grid { grid-template-columns:1fr 1fr; }
  .media-item:nth-child(1),.media-item:nth-child(4) { grid-column:1/3; }
  .gallery-item { grid-template-columns:44px 1fr; }
  .gi-meta,.gi-tag { display:none; }
}
@media(max-width:768px) {
  .nav-links { display:none; }
  .hero-img-wrap { display:none; }
  .hero-name { font-size:3rem; }
  .svc-grid { grid-template-columns:1fr 1fr; }
  .media-grid { grid-template-columns:1fr; }
  .media-item:nth-child(1),.media-item:nth-child(4) { grid-column:auto; }
  .footer-top { flex-direction:column; }
  .footer-links-grid { gap:2rem; }
  .hero-btns { flex-direction:column; align-items:flex-start; }
}
@media(max-width:480px) {
  .svc-grid { grid-template-columns:1fr; }
  .hero-name { font-size:2.5rem; }
}
`;

/* ── DATA ── */
const PROJECTS = [
  {name:"Anandha Kondattam",     loc:"Singapore",    tag:"International", bg:"linear-gradient(145deg,#1A1208,#3A2010)"},
  {name:"Chennai Sangamam",      loc:"Chennai",       tag:"City Festival",  bg:"linear-gradient(145deg,#120A08,#3A1A0A)"},
  {name:"Indian Dance Festival", loc:"Mamallapuram",  tag:"Cultural",       bg:"linear-gradient(145deg,#0A1208,#1A2A12)"},
  {name:"Made of Chennai",       loc:"YMCA Madras",   tag:"Concert",        bg:"linear-gradient(145deg,#0A0E18,#182030)"},
  {name:"Neithal Kalai Vizha",   loc:"Thoothukudi",   tag:"Folk Festival",  bg:"linear-gradient(145deg,#180A12,#301826)"},
  {name:"Kalai Sangamam",        loc:"Kanchipuram",   tag:"Arts Festival",  bg:"linear-gradient(145deg,#121808,#243014)"},
  {name:"Happy Streets",         loc:"Chennai",       tag:"Community",      bg:"linear-gradient(145deg,#180E08,#3A2010)"},
  {name:"Kalai Kadhambam",       loc:"Tamil Nadu",    tag:"Show Director",  bg:"linear-gradient(145deg,#0E0808,#281818)"},
  {name:"Super Singer",          loc:"Vijay TV",      tag:"Television",     bg:"linear-gradient(145deg,#08121A,#102030)"},
  {name:"Background Score",      loc:"Tamil Cinema",  tag:"Film",           bg:"linear-gradient(145deg,#120A18,#241830)"},
];

const GALLERY_ITEMS = [
  {title:"Anandha Kondattam",           meta:"Singapore",    tag:"International", cat:"international"},
  {title:"Chennai Sangamam",             meta:"Chennai",      tag:"City Festival",  cat:"festival"},
  {title:"Indian Dance Festival",        meta:"Mamallapuram", tag:"Cultural",       cat:"festival"},
  {title:"Made of Chennai Concert",      meta:"YMCA Madras",  tag:"Concert",        cat:"concert"},
  {title:"Neithal Kalai Vizha",          meta:"Thoothukudi",  tag:"Folk Festival",  cat:"festival"},
  {title:"Kalai Sangamam",               meta:"Kanchipuram",  tag:"Arts Festival",  cat:"festival"},
  {title:"Happy Streets",                meta:"Chennai",      tag:"Community",      cat:"festival"},
  {title:"Kalai Kadhambam",             meta:"Tamil Nadu",   tag:"Show Director",  cat:"festival"},
  {title:"Super Singer",                 meta:"Vijay TV",     tag:"Television",     cat:"tv"},
  {title:"Background Score — Tamil Films",meta:"Cinema",     tag:"Film",           cat:"tv"},
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
  {icon:"🥁",name:"Paraiattam",            sub:"High-energy traditional drum performance"},
  {icon:"🏺",name:"Karagattam",            sub:"Balance & dance with decorated pots"},
  {icon:"🗡️",name:"Silambattam",           sub:"Traditional martial art with sticks"},
  {icon:"🐎",name:"Poikaal Kuthiraiattam", sub:"Dummy horse festival dance"},
  {icon:"🦚",name:"Mayilattam",            sub:"Peacock-inspired graceful dance"},
  {icon:"🐂",name:"Maadattam",             sub:"Bull-themed folk village dance"},
  {icon:"🌾",name:"Oyilattam",             sub:"Group rhythmic coordinated dance"},
  {icon:"🎶",name:"Grammiya Paadal",       sub:"Folk singing & cultural storytelling"},
  {icon:"🎵",name:"Thavil",               sub:"Classical temple percussion"},
  {icon:"🎺",name:"Nadaswaram",            sub:"Traditional wind instrument"},
  {icon:"🔥",name:"Devarattam",            sub:"Warrior dance — power & rhythm"},
];

const SHOWS = [
  {icon:"🥁",name:"Paraiattam",            sub:"Grand stage drum ensemble"},
  {icon:"🎶",name:"Nayyandi Melam",        sub:"Vibrant processional music"},
  {icon:"🏺",name:"Karagattam",            sub:"Balance dance spectacle"},
  {icon:"🐎",name:"Poikaal Kuthiraiattam", sub:"Festival horse dance"},
  {icon:"🦚",name:"Mayilattam",            sub:"Graceful peacock performance"},
  {icon:"🐂",name:"Maadattam",             sub:"Traditional bull dance"},
  {icon:"🌾",name:"Oyilattam",             sub:"Rhythmic group dance"},
  {icon:"🎵",name:"Thavil",               sub:"Powerful temple percussion"},
  {icon:"🎺",name:"Nadaswaram",            sub:"Sacred wind instrument"},
  {icon:"🔥",name:"Devarattam",            sub:"Warrior battle dance"},
  {icon:"🥁",name:"Thudumbattam",          sub:"Ancient drum folk art"},
  {icon:"🗡️",name:"Silambattam",           sub:"Martial stick performance"},
  {icon:"🎭",name:"Bommalattam",           sub:"Traditional puppet theatre"},
  {icon:"🥁",name:"Chendamelam",           sub:"Kerala-Tamil fusion drum"},
  {icon:"🌟",name:"Nasik Doll",            sub:"Processional doll dance"},
  {icon:"👑",name:"Rajamelam",             sub:"Royal court music ensemble"},
];

const AWARDS = [
  {icon:"🏆",title:"Best Student Artist",  org:"Education Minister, Tamil Nadu"},
  {icon:"🌟",title:"Best Artist Award",    org:"Nanban Organisation"},
  {icon:"🎖️",title:"Best Musician",        org:"IIT Madras Cultural Fest"},
  {icon:"👑",title:"Fine Musician Honour", org:"Kanimozhi Karunanidhi MP"},
];

const MEDIA = [
  {emoji:"🥁",label:"Chennai Sangamam — Live Performance",  bg:"linear-gradient(135deg,#1A1208,#3A2010)"},
  {emoji:"🎭",label:"Anandha Kondattam — Singapore",        bg:"linear-gradient(135deg,#120A08,#3A1808)"},
  {emoji:"🦚",label:"Mayilattam — Stage Performance",       bg:"linear-gradient(135deg,#0A1208,#1A2A12)"},
  {emoji:"🎵",label:"Thavil — Temple Concert",              bg:"linear-gradient(135deg,#0A0E18,#182030)"},
  {emoji:"🗡️",label:"Silambattam — Demo",                   bg:"linear-gradient(135deg,#180A12,#301826)"},
  {emoji:"🎓",label:"Workshop Session",                     bg:"linear-gradient(135deg,#121808,#243014)"},
  {emoji:"📺",label:"Super Singer — Vijay TV",              bg:"linear-gradient(135deg,#180E08,#3A2010)"},
];



/* ── CANVAS HOOK ── */
function useCanvas(canvasRef, ready) {
  useEffect(() => {
    if (!ready) return;
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let W, H, pts=[], rings=[], raf;
    const resize = () => { W=cv.width=window.innerWidth; H=cv.height=window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    class Pt {
      constructor(init) { this.x=Math.random()*W; this.y=init?Math.random()*H:H+5; this.r=0.3+Math.random()*1.2; this.s=0.15+Math.random()*0.4; this.op=0.05+Math.random()*0.25; this.dx=(Math.random()-0.5)*0.3; }
      step() { this.y-=this.s; this.x+=this.dx; if(this.y<-5){this.y=H+5;this.x=Math.random()*W;} }
      draw() { ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2); ctx.fillStyle=`rgba(201,168,76,${this.op})`; ctx.fill(); }
    }
    for(let i=0;i<100;i++) pts.push(new Pt(true));
    const spawnRing=()=>{ rings.push({x:W/2,y:H*0.55,r:0,max:Math.max(W,H)*0.65,sp:1.2}); setTimeout(spawnRing,3500+Math.random()*2000); };
    setTimeout(spawnRing,2500);
    const frame=()=>{
      ctx.clearRect(0,0,W,H);
      const g=ctx.createRadialGradient(W/2,H*0.5,0,W/2,H*0.5,H*0.8);
      g.addColorStop(0,"rgba(30,18,5,0.2)"); g.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
      pts.forEach(p=>{p.step();p.draw();});
      rings=rings.filter(r=>{ r.r+=r.sp; const life=1-r.r/r.max; if(life<=0)return false; ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.strokeStyle=`rgba(201,168,76,${life*0.1})`;ctx.lineWidth=1;ctx.stroke();return true;});
      raf=requestAnimationFrame(frame);
    };
    frame();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[ready]);
}

/* ── HOOKS ── */
function useCursor() {
  const [dot,setDot]=useState({x:0,y:0}), [ring,setRing]=useState({x:0,y:0}), [hov,setHov]=useState(false);
  const cur=useRef({x:0,y:0}), rng=useRef({x:0,y:0});
  useEffect(()=>{
    const move=e=>{cur.current={x:e.clientX,y:e.clientY};setDot({x:e.clientX,y:e.clientY});};
    document.addEventListener("mousemove",move);
    const tick=()=>{rng.current.x+=(cur.current.x-rng.current.x)*0.12;rng.current.y+=(cur.current.y-rng.current.y)*0.12;setRing({...rng.current});requestAnimationFrame(tick);};
    requestAnimationFrame(tick);
    return()=>document.removeEventListener("mousemove",move);
  },[]);
  return {dot,ring,hov,setHov};
}

function useReveal(dep) {
  useEffect(()=>{
    const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("vis");obs.unobserve(e.target);}}),{threshold:0.1});
    document.querySelectorAll(".reveal,.reveal-left,.reveal-right,.svc-cell").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[dep]);
}

function useCounters() {
  useEffect(()=>{
    const obs=new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(!e.isIntersecting)return;
        const el=e.target,target=+el.dataset.count,dur=1400;
        let s=null;
        const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1),ease=1-(1-p)**3;el.textContent=Math.floor(ease*target)+(p>=1?"+":"");if(p<1)requestAnimationFrame(step);};
        requestAnimationFrame(step);obs.unobserve(el);
      });
    },{threshold:0.6});
    document.querySelectorAll("[data-count]").forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  });
}

/* ── MAIN ── */
export default function App() {
  const [preCount,setPreCount]=useState(0);
  const [preReady,setPreReady]=useState(false);
  const [canvasOn,setCanvasOn]=useState(false);
  const [navStuck,setNavStuck]=useState(false);
  const [activeTab,setActiveTab]=useState("classes");
  const [filter,setFilter]=useState("all");
  const [modalOpen,setModalOpen]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [previewPos,setPreviewPos]=useState({left:0,top:0});
  const [previewActive,setPreviewActive]=useState(false);
  const [previewBg,setPreviewBg]=useState("");
  const [formData,setFormData]=useState({name:"",email:"",message:""});
  const [formFilled,setFormFilled]=useState({name:false,email:false,message:false});

  const canvasRef=useRef(null);
  const projTrack=useRef(null);
  const drag=useRef({on:false,sx:0,sl:0});
  const tStart=useRef(0),tScroll=useRef(0);

  const {dot,ring,hov,setHov}=useCursor();
  useCanvas(canvasRef,canvasOn);
  useReveal(activeTab);
  useCounters();

  /* preloader */
  useEffect(()=>{
    const dur=2200,t0=performance.now();
    const step=now=>{const t=Math.min((now-t0)/dur,1),ease=1-(1-t)**3;setPreCount(Math.round(ease*100));if(t<1)requestAnimationFrame(step);else setTimeout(()=>{setPreReady(true);setTimeout(()=>setCanvasOn(true),300);},300);};
    requestAnimationFrame(step);
  },[]);

  /* nav */
  useEffect(()=>{const fn=()=>setNavStuck(window.scrollY>60);window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);},[]);

  /* ripple */
  useEffect(()=>{
    let lastY=0;
    const fn=()=>{if(Math.abs(window.scrollY-lastY)>100){lastY=window.scrollY;const el=document.createElement("div");el.className="scroll-ripple";el.style.cssText=`left:${window.innerWidth/2}px;top:${window.innerHeight/2}px`;document.body.appendChild(el);setTimeout(()=>el.remove(),900);}};
    window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);
  },[]);

  /* parallax */
  useEffect(()=>{
    const fn=()=>{if(window.scrollY<window.innerHeight){const n=document.querySelector(".hero-name");const q=document.querySelector(".hero-tagline");if(n)n.style.transform=`translateY(${window.scrollY*0.07}px)`;if(q)q.style.transform=`translateY(${window.scrollY*0.04}px)`;}};
    window.addEventListener("scroll",fn,{passive:true});return()=>window.removeEventListener("scroll",fn);
  },[]);

  /* preview follow */
  useEffect(()=>{
    const fn=e=>{const pw=220,ph=295;let x=e.clientX+32,y=e.clientY-80;if(x+pw>window.innerWidth-16)x=e.clientX-pw-32;if(y+ph>window.innerHeight-16)y=window.innerHeight-ph-16;if(y<16)y=16;setPreviewPos({left:x,top:y});};
    document.addEventListener("mousemove",fn);return()=>document.removeEventListener("mousemove",fn);
  },[]);

  /* drag scroll */
  const onDragStart=useCallback(e=>{drag.current={on:true,sx:e.pageX-projTrack.current.offsetLeft,sl:projTrack.current.scrollLeft};},[]);
  const onDragMove=useCallback(e=>{if(!drag.current.on)return;e.preventDefault();projTrack.current.scrollLeft=drag.current.sl-(e.pageX-projTrack.current.offsetLeft-drag.current.sx)*1.2;},[]);
  const onDragEnd=useCallback(()=>{drag.current.on=false;},[]);

  /* magnetic */
  const magMove=useCallback((e,el)=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*0.2}px,${(e.clientY-r.top-r.height/2)*0.2}px)`;},[]); 
  const magLeave=useCallback(el=>{el.style.transform="";},[]);

  const filtered=filter==="all"?GALLERY_ITEMS:GALLERY_ITEMS.filter(g=>g.cat===filter);
  const renumbered=filtered.map((g,i)=>({...g,num:String(i+1).padStart(2,"0")}));

  const openModal=()=>{setModalOpen(true);setSubmitted(false);setFormData({name:"",email:"",message:""});setFormFilled({name:false,email:false,message:false});};
  const closeModal=()=>setModalOpen(false);
  const handleForm=e=>{e.preventDefault();setSubmitted(true);};
  const updateField=(k,v)=>{setFormData(p=>({...p,[k]:v}));setFormFilled(p=>({...p,[k]:v.length>0}));};

  const H=()=>setHov(true), L=()=>setHov(false);
  const currentList=activeTab==="classes"?CLASSES:SHOWS;

  return (
    <>
      <style>{CSS}</style>
      <div className="grain"/>
      <canvas ref={canvasRef} className={`bg-canvas${canvasOn?" visible":""}`}/>

      {/* CURSOR */}
      <div className={`cursor-dot${hov?" hov":""}`} style={{transform:`translate(${dot.x}px,${dot.y}px)`}}><div className="cursor-dot-inner"/></div>
      <div className={`cursor-ring${hov?" hov":""}`} style={{transform:`translate(${ring.x}px,${ring.y}px)`}}><div className="cursor-ring-inner"/></div>

      {/* PRELOADER */}
      <div className={`preloader${preReady?" out":""}`}>
        <div className="pre-top">
          <div className="pre-logo">Dhanushkodi <em>Adhitiyan</em></div>
          <div className="pre-status">Loading Experience</div>
        </div>
        <div className="pre-mid">
          <div className="pre-count">{preCount}</div>
          <div className="pre-track"><div className="pre-fill" style={{width:`${preCount}%`}}/></div>
        </div>
        <div className="pre-bot">
          <div className="pre-tagline">Echoes of Tamil Rhythm</div>
          <div className="pre-pct">%</div>
        </div>
      </div>

      {/* NAV */}
      <nav className={`nav${navStuck?" stuck":""}`}>
        <a href="#hero" className="nav-logo" onMouseEnter={H} onMouseLeave={L}>
          Dhanushkodi <em>Adhithiyian</em>
          <small>Percussionist & Performer</small>
        </a>
        <ul className="nav-links">
          {["gallery","about","projects","services","media","contact"].map(s=>(
            <li key={s}><a href={`#${s}`} onMouseEnter={H} onMouseLeave={L}>{s}</a></li>
          ))}
        </ul>
        <button className="nav-cta" onClick={openModal}
          onMouseEnter={H} onMouseMove={e=>magMove(e,e.currentTarget)}
          onMouseLeave={e=>{L();magLeave(e.currentTarget);}}>Book Now</button>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero">
        <div className="hero-bg"/>
        <div className="particles-wrap">
          {Array.from({length:18},(_,i)=>(
            <div key={i} className="particle" style={{left:`${5+i*5.2}%`,"--dx":`${(i%2===0?1:-1)*(20+i*4)}px`,animationDuration:`${10+i*0.7}s`,animationDelay:`${i*0.45}s`,width:`${1+i%3*0.5}px`,height:`${1+i%3*0.5}px`}}/>
          ))}
        </div>
        <div className="hero-img-wrap">
          <div className="hero-img-frame">
            <div className="hero-img-inner">
             <img src={dhanushImg} alt="Dhanushkodi Adhitiyan"/>
              <div className="hero-img-glow"/>
            </div>
            <div className="hero-img-border"/>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="hero-eyebrow-line"/>
            <span className="hero-eyebrow-text">Tamil Folk Arts</span>
          </div>
          <h1 className="hero-name">
            Dhanushkodi<br/><em>Adhitiyan</em>
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
          <blockquote className="hero-tagline">"Rhythm is not music —<br/>it is <em>life</em>"</blockquote>
          <div className="hero-btns">
            <button className="btn btn-gold"
              onClick={()=>document.getElementById("media").scrollIntoView({behavior:"smooth"})}
              onMouseEnter={H} onMouseMove={e=>magMove(e,e.currentTarget)}
              onMouseLeave={e=>{L();magLeave(e.currentTarget);}}>
              <span>▶ Watch Performance</span>
            </button>
            <button className="btn btn-ghost" onClick={openModal}
              onMouseEnter={H} onMouseMove={e=>magMove(e,e.currentTarget)}
              onMouseLeave={e=>{L();magLeave(e.currentTarget);}}>Book a Show</button>
          </div>
        </div>
        <div className="hero-scroll">
          <span className="hero-scroll-text">Scroll</span>
          <div className="hero-scroll-bar"/>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-inner">
          {[...SHOWS,...SHOWS].map((s,i)=><span key={i}>{s.name}</span>)}
        </div>
      </div>

      {/* ── GALLERY ── */}
      <section id="gallery" className="gallery-sec">
        <div className="gallery-header reveal">
          <div><div className="sec-label">Gallery</div><h2 className="sec-title">Selected<br/><em>Performances</em></h2></div>
          <div className="gallery-count">{renumbered.length} works</div>
        </div>
        <div className="filter-row reveal" style={{transitionDelay:"0.1s"}}>
          {[["all","All"],["international","International"],["festival","Festival"],["tv","TV / Film"],["concert","Concert"]].map(([k,l])=>(
            <button key={k} className={`filter-btn${filter===k?" active":""}`}
              onClick={()=>setFilter(k)} onMouseEnter={H} onMouseLeave={L}>{l}</button>
          ))}
        </div>
        <div className="gallery-list">
          {renumbered.map((g,i)=>(
            <div key={g.title} className="gallery-item reveal" style={{transitionDelay:`${i*0.04}s`}}
              onMouseEnter={()=>{H();setPreviewBg(GALLERY_PALETTES[i%GALLERY_PALETTES.length]);setPreviewActive(true);}}
              onMouseLeave={()=>{L();setPreviewActive(false);}}>
              <div className="gi-num">{g.num}</div>
              <div className="gi-title">{g.title}</div>
              <div className="gi-meta">{g.meta}</div>
              <div className="gi-tag">{g.tag}</div>
            </div>
          ))}
        </div>
        {/* hover preview card */}
        <div className={`gallery-preview${previewActive?" active":""}`}
          style={{left:previewPos.left,top:previewPos.top,background:previewBg}}/>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-sec">
        <div className="about-watermark">DHANUSH</div>
        <div className="about-grid">
          <div>
            <div className="sec-label reveal">The Artist</div>
            <h2 className="sec-title reveal" style={{transitionDelay:".1s"}}>Rhythm is not<br/>music — <em>it is life</em></h2>
            <p className="about-body reveal" style={{transitionDelay:".2s"}}>
              10+ years of experience in traditional and contemporary folk performance.{" "}
              <strong>Dhanushkodi Adhitiyan</strong> brings the ancient heartbeat of Tamil culture
              to stages across the world, preserving art forms that speak beyond language.
            </p>
            <div className="mentor-block reveal" style={{transitionDelay:".3s"}}>
              <div className="mentor-label">Mentored & Guided By</div>
              {[
                {name:"Paul Jacob",   role:"Music Director", emoji:"🎵"},
                {name:"Thanjai David",role:"Parai Maestro",  emoji:"🥁"},
              ].map(m=>(
                <div key={m.name} className="mentor-card" onMouseEnter={H} onMouseLeave={L}>
                  <div className="mentor-photo">
                    {/* Replace emoji with: <img src="paul-jacob.jpg" alt={m.name}/> */}
                    {m.emoji}
                  </div>
                  <div>
                    <div className="mentor-name-text">{m.name}</div>
                    <div className="mentor-role-text">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about-right">
            <div className="reveal" style={{transitionDelay:".1s"}}>
              <div className="about-sub-label">Recognised By</div>
              <div className="badge-row">
                {["IIT Madras","Education Minister","Kanimozhi Karunanidhi MP","Nanban Organisation"].map(b=>(
                  <span key={b} className="badge" onMouseEnter={H} onMouseLeave={L}>{b}</span>
                ))}
              </div>
            </div>
            <div style={{width:"100%",height:"1px",background:"var(--line)"}} className="reveal"/>
            <div className="reveal" style={{transitionDelay:".3s"}}>
              <div className="about-sub-label">By the Numbers</div>
              {[
                {count:10,desc:<>Years of active<br/>performance & teaching</>},
                {count:17,desc:<>Art forms performed<br/>& taught</>},
                {count:10,desc:<>Major events across<br/>India & internationally</>},
              ].map(({count,desc},i)=>(
                <div key={i} className="stat-row">
                  <div className="stat-num" data-count={count}>0</div>
                  <div className="stat-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS — right after About ── */}
      <section id="projects" className="projects-sec">
        <div className="sec-label reveal">Stage Presence</div>
        <h2 className="sec-title reveal" style={{transitionDelay:".1s"}}>Featured <em>Performances</em></h2>
        <p className="proj-hint reveal" style={{transitionDelay:".2s"}}>← Drag to explore →</p>
        <div className="proj-scroll-wrap">
          <div className="proj-track" ref={projTrack}
            onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
            onTouchStart={e=>{tStart.current=e.touches[0].pageX;tScroll.current=projTrack.current.scrollLeft;}}
            onTouchMove={e=>{projTrack.current.scrollLeft=tScroll.current-(e.touches[0].pageX-tStart.current)*1.1;}}>
            {PROJECTS.map((p,i)=>(
              <div key={p.name} className="proj-card" onMouseEnter={H} onMouseLeave={L}>
                <div className="proj-card-bg" style={{background:p.bg}}/>
                <div className="proj-overlay">
                  <div className="proj-bg-num">0{i+1}</div>
                  <div className="proj-tag-label">{p.tag}</div>
                  <div className="proj-name">{p.name}</div>
                  <div className="proj-loc">📍 {p.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXP & AWARDS ── */}
      <section id="exp-awards" className="exp-awards-sec">
        <div className="ea-grid">
          <div className="reveal-left">
            <div className="sec-label">Experience</div>
            <div className="big-stat-num">10+</div>
            <div className="big-stat-label">Years of Craft</div>
            <p className="exp-description" style={{marginTop:"1.5rem"}}>
              Performing and teaching Tamil folk arts across stages, schools, temples,
              television, and international festivals. Every show is a conversation
              between the ancient and the present.
            </p>
          </div>
          <div className="reveal-right" style={{transitionDelay:".15s"}}>
            <div className="sec-label">Recognition</div>
            <div className="awards-list">
              {AWARDS.map((a,i)=>(
                <div key={i} className="award-item" onMouseEnter={H} onMouseLeave={L}>
                  <div className="award-icon-box">{a.icon}</div>
                  <div><div className="award-title-text">{a.title}</div><div className="award-org-text">{a.org}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="services-sec">
        <div className="sec-label reveal">Repertoire</div>
        <h2 className="sec-title reveal" style={{transitionDelay:".1s"}}>Classes & <em>Shows</em></h2>
        <div className="toggle-wrap reveal" style={{transitionDelay:".2s"}}>
          <div className="toggle-slider" style={{width:"50%",transform:`translateX(${activeTab==="classes"?"0%":"100%"})`}}/>
          {["classes","shows"].map(t=>(
            <button key={t} className={`toggle-btn${activeTab===t?" active":""}`}
              onClick={()=>setActiveTab(t)} onMouseEnter={H} onMouseLeave={L}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        <div className="svc-grid">
          {currentList.map((s,i)=>(
            <div key={`${activeTab}-${i}`} className="svc-cell" style={{transitionDelay:`${(i%4)*0.07}s`}}
              onMouseEnter={H} onMouseLeave={L}>
              <div className="svc-cell-num">{String(i+1).padStart(2,"0")}</div>
              <div className="svc-icon">{s.icon}</div>
              <div className="svc-name">{s.name}</div>
              <div className="svc-sub">{s.sub}</div>
              <div className="svc-line"/>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEDIA ── */}
      <section id="media" className="media-sec">
        <div className="sec-label reveal">Visual Archive</div>
        <h2 className="sec-title reveal" style={{transitionDelay:".1s"}}>Watch & <em>Feel</em></h2>
        <div className="media-grid reveal" style={{transitionDelay:".2s"}}>
          {MEDIA.map((m,i)=>(
            <div key={i} className="media-item" onMouseEnter={H} onMouseLeave={L}>
              <div className="media-inner">
                {/* Replace with: <img src="show.jpg" style={{width:"100%",height:"100%",objectFit:"cover"}}/> */}
                <div className="media-placeholder" style={{background:m.bg}}>
                  <span>{m.emoji}</span>
                  <span className="media-placeholder-label">{m.label}</span>
                </div>
                <div className="media-hover-overlay"><div className="media-play">▶</div></div>
              </div>
              <div className="media-caption">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="contact" className="booking-sec">
        <div className="booking-grid">
          <div className="reveal-left">
            <div className="sec-label">Get in Touch</div>
            <div className="booking-num">Book<br/><em>Now</em></div>
            <p className="booking-desc">Available for performances, workshops, cultural shows, television, film, and collaborations. Based in Chennai — performing globally.</p>
            <div className="contact-list">
              <div className="contact-row"><span className="contact-icon">📍</span>Chennai, Tamil Nadu, India</div>
              <div className="contact-row"><span className="contact-icon">✉️</span>@aadhikalaikoodam@gmail.com</div>
              <div className="contact-row"><span className="contact-icon">📞</span>+91 63811 45510</div>
              <div className="contact-row"><span className="contact-icon">📸</span>@dhanushkodi_adhityan</div>
            </div>
          </div>
          <div className="reveal-right" style={{transitionDelay:".15s"}}>
            <form className="booking-form" onSubmit={handleForm}>
              {[{k:"name",l:"Your Name",t:"text"},{k:"email",l:"Email Address",t:"email"},{k:"message",l:"Message / Event Details",t:"textarea"}].map(f=>(
                <div key={f.k} className={`form-field${formFilled[f.k]?" filled":""}`}>
                  <label>{f.l}</label>
                  {f.t==="textarea"
                    ?<textarea rows="4" value={formData[f.k]} onChange={e=>updateField(f.k,e.target.value)} onFocus={H} onBlur={L}/>
                    :<input type={f.t} value={formData[f.k]} onChange={e=>updateField(f.k,e.target.value)} onFocus={H} onBlur={L} required/>
                  }
                  <div className="field-glow"/>
                </div>
              ))}
              <button type="submit" className="submit-btn" onMouseEnter={H} onMouseLeave={L}>Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-logo">Dhanushkodi <em>Adhitiyan</em></div>
            <div className="footer-logo-sub">Percussionist · Performer · Parai Educator</div>
          </div>
          <div className="footer-links-grid">
            {[
              {title:"Explore",  links:[["gallery","Gallery"],["about","About"],["projects","Projects"],["services","Services"],["media","Media"],["contact","Contact"]]},
              {title:"Offerings",links:[["#","Live Performances"],["#","Workshops"],["#","Cultural Shows"],["#","School Programs"],["#","Film BGM"]]},
              {title:"Connect",  links:[["#","Instagram"],["#","YouTube"],["#","Facebook"],["#","LinkedIn"]]},
            ].map(g=>(
              <div key={g.title} className="footer-link-group">
                <div className="footer-link-group-title">{g.title}</div>
                {g.links.map(([href,label])=>(
                  <a key={label} href={`#${href.replace("#","")}`} className="footer-link" onMouseEnter={H} onMouseLeave={L}>{label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 Gopika.krishnaa — All rights reserved.</span>
          <div className="footer-wave">
            {Array.from({length:12},(_,i)=>(
              <div key={i} className="footer-wave-bar" style={{animationDelay:`${i*0.1}s`,height:`${4+Math.abs(Math.sin(i))*6}px`}}/>
            ))}
          </div>
          <span className="footer-tamil">கலையும் ★ கல்வியும்</span>
        </div>
      </footer>

      {/* ── MODAL ── */}
      {modalOpen&&(
        <div className="modal-bg" onClick={e=>e.target.className==="modal-bg"&&closeModal()}>
          <div className="modal-box">
            <button className="modal-close-btn" onClick={closeModal} onMouseEnter={H} onMouseLeave={L}>✕</button>
            {!submitted?(
              <>
                <div className="modal-title">Book a Show</div>
                <div className="modal-sub">Dhanush's team will reach you within 24 hours.</div>
                <form onSubmit={handleForm} className="booking-form">
                  {[{k:"name",l:"Name",t:"text"},{k:"email",l:"Email",t:"email"},{k:"message",l:"Message / Event Details",t:"textarea"}].map(f=>(
                    <div key={f.k} className={`form-field${formFilled[f.k]?" filled":""}`}>
                      <label>{f.l}</label>
                      {f.t==="textarea"
                        ?<textarea rows="3" value={formData[f.k]} onChange={e=>updateField(f.k,e.target.value)}/>
                        :<input type={f.t} value={formData[f.k]} required onChange={e=>updateField(f.k,e.target.value)}/>
                      }
                      <div className="field-glow"/>
                    </div>
                  ))}
                  <button type="submit" className="submit-btn" onMouseEnter={H} onMouseLeave={L}>Confirm Booking</button>
                </form>
              </>
            ):(
              <div className="success-state">
                <div className="success-icon">🥁</div>
                <div className="success-title">Booking Received!</div>
                <p className="success-desc" style={{marginTop:"0.8rem"}}>Thank you — Dhanush's team will contact you within 24 hours.</p>
                <div className="success-tamil">பறை – கலையும் . கல்வியும்</div>
                <button className="btn btn-ghost" style={{marginTop:"1.5rem"}} onClick={closeModal} onMouseEnter={H} onMouseLeave={L}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}