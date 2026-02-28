/* ================================ VARIABLES ================================ */
:root {
  --gold: #ffd700;
  --primary: #4CAF50;
  --bg-overlay: rgba(0,0,0,0.6);
  --font-main: 'Cairo', sans-serif;
}

/* ================================ RESET ================================ */
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: var(--font-main); line-height:1.5; color:#fff; background:#111; }

/* ================================ INTRO OVERLAY ================================ */
.intro-overlay {
  position:fixed;
  top:0; left:0;
  width:100%; height:100%;
  display:flex; flex-direction:column; justify-content:center; align-items:center;
  text-align:center;
  background: url('صدقة/background.jpg') no-repeat center center/cover;
  z-index:1000;
  transition: opacity 1s ease;
}

.intro-overlay.fade-out { opacity:0; }

.quran-verse { font-size:1.8rem; font-weight:bold; margin-bottom:1rem; }
.quran-translation { font-size:1.2rem; margin-bottom:2rem; }
.intro-button { padding:0.8rem 2rem; font-size:1.2rem; border:none; cursor:pointer; background:var(--primary); border-radius:10px; color:#fff; }

/* ================================ NAVIGATION ================================ */
.nav {
  position:fixed; top:0; left:0; width:100%; display:flex; justify-content:space-between; align-items:center;
  padding:1rem 2rem; background:rgba(0,0,0,0.7); z-index:999;
}
.nav .logo span { margin-left:0.5rem; font-weight:bold; font-size:1.2rem; }
.hamburger { display:none; flex-direction:column; cursor:pointer; gap:5px; }
.hamburger span { width:25px; height:3px; background:#fff; border-radius:3px; }

.nav-menu { display:flex; gap:2rem; list-style:none; }
.nav-menu li a { color:#fff; text-decoration:none; font-weight:600; }

/* ================================ SECTIONS ================================ */
.section-title { font-size:1.5rem; margin:2rem 0 1rem; text-align:center; }
.quran-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(150px,1fr)); gap:1rem; padding:1rem; }

/* ================================ DUA CARDS ================================ */
.dua-cards { display:grid; grid-template-columns:repeat(auto-fit, minmax(250px,1fr)); gap:1rem; padding:1rem; }
.dua-card { background:rgba(255,255,255,0.05); padding:1rem; border-radius:10px; opacity:0; transform:translateY(20px); transition: all 0.6s ease; }
.dua-card.animate-in { opacity:1; transform:translateY(0); }

/* ================================ TASBIH ================================ */
.tasbih-container { display:flex; flex-direction:column; align-items:center; gap:1rem; margin:2rem 0; }
.progress-bar { width:80%; height:20px; background:#333; border-radius:10px; overflow:hidden; }
.progress-fill { height:100%; width:0%; background:linear-gradient(90deg, var(--gold) 0%, #ffd700 100%); transition:width 0.3s ease; }

/* ================================ FEEDBACK ================================ */
.feedback-container { display:flex; flex-direction:column; gap:1rem; padding:1rem; color:#fff; }
.feedback-textarea { width:100%; min-height:80px; padding:0.5rem; border-radius:10px; border:none; }

/* ================================ FOOTER ================================ */
footer { text-align:center; padding:1.5rem; background:#000; }

/* ================================ MEDIA ================================ */
@media (max-width:768px) {
  .hamburger { display:flex; }
  .nav-menu { display:none; flex-direction:column; gap:1rem; background:rgba(0,0,0,0.9); position:absolute; top:100%; left:0; width:100%; padding:1rem; }
  .nav-menu.active { display:flex; }
}
