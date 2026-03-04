// ============================================
// FIREBASE SETUP
// ============================================
import { initializeApp }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getDatabase, ref, set, get, onValue, runTransaction
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey:            "AIzaSyCdbtCNYY-NJK6zNRhUe6Sduz31R8Q3XtA",
  authDomain:        "sadaqah-jariyah-cac9b.firebaseapp.com",
  databaseURL:       "https://sadaqah-jariyah-cac9b-default-rtdb.firebaseio.com",
  projectId:         "sadaqah-jariyah-cac9b",
  storageBucket:     "sadaqah-jariyah-cac9b.firebasestorage.app",
  messagingSenderId: "744079593545",
  appId:             "1:744079593545:web:1491548dad4c207cb12f98"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// ============================================
// JUZ DATA
// ============================================
const juzData = [
  { number:  1, name: "الجزء 1",  range: "الفاتحة (1-7) → البقرة (1-141)" },
  { number:  2, name: "الجزء 2",  range: "البقرة (142-252)" },
  { number:  3, name: "الجزء 3",  range: "البقرة (253) → آل عمران (92)" },
  { number:  4, name: "الجزء 4",  range: "آل عمران (93) → النساء (23)" },
  { number:  5, name: "الجزء 5",  range: "النساء (24-147)" },
  { number:  6, name: "الجزء 6",  range: "النساء (148) → المائدة (81)" },
  { number:  7, name: "الجزء 7",  range: "المائدة (82) → الأنعام (110)" },
  { number:  8, name: "الجزء 8",  range: "الأنعام (111) → الأعراف (87)" },
  { number:  9, name: "الجزء 9",  range: "الأعراف (88) → الأنفال (40)" },
  { number: 10, name: "الجزء 10", range: "الأنفال (41) → التوبة (92)" },
  { number: 11, name: "الجزء 11", range: "التوبة (93) → هود (5)" },
  { number: 12, name: "الجزء 12", range: "هود (6) → يوسف (52)" },
  { number: 13, name: "الجزء 13", range: "يوسف (53) → إبراهيم (52)" },
  { number: 14, name: "الجزء 14", range: "الحجر (1) → النحل (128)" },
  { number: 15, name: "الجزء 15", range: "الإسراء (1) → الكهف (74)" },
  { number: 16, name: "الجزء 16", range: "الكهف (75) → طه (135)" },
  { number: 17, name: "الجزء 17", range: "الأنبياء (1) → الحج (78)" },
  { number: 18, name: "الجزء 18", range: "المؤمنون (1) → الفرقان (20)" },
  { number: 19, name: "الجزء 19", range: "الفرقان (21) → النمل (55)" },
  { number: 20, name: "الجزء 20", range: "النمل (56) → العنكبوت (45)" },
  { number: 21, name: "الجزء 21", range: "العنكبوت (46) → الأحزاب (30)" },
  { number: 22, name: "الجزء 22", range: "الأحزاب (31) → يس (27)" },
  { number: 23, name: "الجزء 23", range: "يس (28) → الزمر (31)" },
  { number: 24, name: "الجزء 24", range: "الزمر (32) → فصلت (46)" },
  { number: 25, name: "الجزء 25", range: "فصلت (47) → الجاثية (37)" },
  { number: 26, name: "الجزء 26", range: "الأحقاف (1) → الذاريات (30)" },
  { number: 27, name: "الجزء 27", range: "الذاريات (31) → الحديد (29)" },
  { number: 28, name: "الجزء 28", range: "المجادلة (1) → التحريم (12)" },
  { number: 29, name: "الجزء 29", range: "الملك (1) → المرسلات (50)" },
  { number: 30, name: "الجزء 30", range: "النبأ (1) → الناس (6)" }
];

// ============================================
// STATE
// No personal data — anonymous counting only
// ============================================
let myClaimedJuz = parseInt(localStorage.getItem('myClaimedJuz')) || null;
let takenJuz     = {};  // { juzNumber: { count: N } }

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {

  // ── Intro button ──────────────────────────
  const introOverlay = document.querySelector('.intro-overlay');
  const introButton  = document.querySelector('.intro-button');
  if (introButton) {
    introButton.addEventListener('click', () => {
      introOverlay.style.transition    = 'opacity 1s ease, transform 1s ease';
      introOverlay.style.opacity       = '0';
      introOverlay.style.transform     = 'scale(1.05)';
      introOverlay.style.pointerEvents = 'none';
      setTimeout(() => { introOverlay.style.display = 'none'; }, 1000);
    });
  }

  // ── Smooth scroll ─────────────────────────
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById(this.getAttribute('href').substring(1))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Section fade-in ───────────────────────
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'dua') animateDuaCards();
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('section').forEach(s => sectionObs.observe(s));

  function animateDuaCards () {
    document.querySelectorAll('.dua-card').forEach((c, i) =>
      setTimeout(() => c.classList.add('animate-in'), i * 150)
    );
  }

  // ============================================
  // BUILD JUZ GRID
  // ============================================
  const quranGrid = document.getElementById('quranGrid');
  juzData.forEach(juz => {
    const btn = document.createElement('button');
    btn.className   = 'juz-button';
    btn.dataset.juz = juz.number;
    btn.innerHTML   = buildJuzHTML(juz, null, false);
    quranGrid.appendChild(btn);
  });

  // ── Inner HTML builder ────────────────────
  // Shows count only — NO names, NO locking
  // Multiple users CAN select the same juz
  function buildJuzHTML (juz, info, isMine) {
    const count = info ? (info.count || 0) : 0;
    const badge = count > 0
      ? `<span class="juz-count-badge">اختاره ${count} ${count === 1 ? 'شخص' : 'أشخاص'}</span>`
      : `<span class="juz-count-badge"></span>`;

    if (isMine) {
      return `
        <div style="font-size:1.2rem;font-weight:700;">${juz.name}</div>
        <div style="font-size:0.85rem;line-height:1.6;opacity:0.8;">${juz.range}</div>
        <div style="position:absolute;top:8px;left:8px;background:#4CAF50;color:#fff;
             padding:0.2rem 0.6rem;border-radius:8px;font-size:0.7rem;font-weight:700;">
          ✓ اخترته
        </div>
        <div style="position:absolute;bottom:6px;right:50%;transform:translateX(50%);
             font-size:0.65rem;color:rgba(76,175,80,0.7);white-space:nowrap;">
          انقر للإلغاء
        </div>
        ${badge}`;
    }
    return `
      <div style="font-size:1.2rem;font-weight:700;">${juz.name}</div>
      <div style="font-size:0.85rem;line-height:1.6;opacity:0.85;">${juz.range}</div>
      ${badge}`;
  }

  // ============================================
  // JUZ CLICK HANDLER
  // Multiple users CAN select the same juz
  // A user can only hold ONE selection at a time
  // ============================================
  document.querySelectorAll('.juz-button').forEach(btn => {
    btn.addEventListener('click', function () {
      const n = parseInt(this.dataset.juz);
      if (myClaimedJuz === n) { openCancelModal(n); return; }
      if (myClaimedJuz)       { showNotification('لقد اخترت جزءاً من قبل 🕌'); return; }
      openConfirmModal(n);
    });
  });

  // ============================================
  // MODAL: CONFIRM — YES / NO only, no name
  // ============================================
  function openConfirmModal (juzNumber) {
    const modal   = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmModalTitle');
    const juz     = juzData.find(j => j.number === juzNumber);

    titleEl.textContent = juz.name;
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));

    // Clone to remove stale listeners
    const oldBtn = document.getElementById('confirmYesBtn');
    const newBtn = oldBtn.cloneNode(true);
    oldBtn.parentNode.replaceChild(newBtn, oldBtn);

    newBtn.addEventListener('click', () => {
      closeModal('confirmModal');
      claimJuz(juzNumber);
    });
  }

  // ============================================
  // MODAL: CANCEL
  // ============================================
  function openCancelModal (juzNumber) {
    const modal      = document.getElementById('cancelModal');
    const confirmBtn = document.getElementById('confirmCancelBtn');
    const juz        = juzData.find(j => j.number === juzNumber);

    document.getElementById('cancelModalJuzTitle').textContent = juz.name;
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));

    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    newBtn.addEventListener('click', () => { releaseJuz(juzNumber); closeModal('cancelModal'); });
  }

  function closeModal (id) {
    const m = document.getElementById(id);
    m.classList.remove('show');
    setTimeout(() => { m.style.display = 'none'; }, 420);
  }

  document.getElementById('confirmModalClose')?.addEventListener('click', () => closeModal('confirmModal'));
  document.getElementById('confirmNoBtn')     ?.addEventListener('click', () => closeModal('confirmModal'));
  document.getElementById('cancelModalClose') ?.addEventListener('click', () => closeModal('cancelModal'));
  document.getElementById('keepJuzBtn')       ?.addEventListener('click', () => closeModal('cancelModal'));

  ['confirmModal','cancelModal'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', function (e) {
      if (e.target === this) closeModal(id);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal('confirmModal'); closeModal('cancelModal'); }
  });

  // ============================================
  // CLAIM JUZ — Firebase Transaction
  // No locking — multiple users allowed per juz
  // Only stores: count + timestamp (no identity)
  //
  // Firebase structure:
  //   takenJuz/{n}/count : number  — total selections
  //   takenJuz/{n}/time  : number  — last update timestamp
  // ============================================
  function claimJuz (juzNumber) {
    const juzRef = ref(db, `takenJuz/${juzNumber}`);
    runTransaction(juzRef, current => ({
      count: current ? (current.count || 0) + 1 : 1,
      time:  Date.now()
    }))
    .then(result => {
      if (result.committed) {
        myClaimedJuz = juzNumber;
        localStorage.setItem('myClaimedJuz', juzNumber);
        showNotification('تقبل الله منك 🤍');
      } else {
        showNotification('حدث خطأ، حاول مرة أخرى');
      }
    })
    .catch(() => showNotification('حدث خطأ، حاول مرة أخرى'));
  }

  // ============================================
  // RELEASE JUZ — decrements count
  // ============================================
  function releaseJuz (juzNumber) {
    const juzRef = ref(db, `takenJuz/${juzNumber}`);
    runTransaction(juzRef, current => {
      if (!current) return current;
      const newCount = (current.count || 1) - 1;
      return newCount <= 0 ? null : { count: newCount, time: current.time };
    })
    .then(() => {
      myClaimedJuz = null;
      localStorage.removeItem('myClaimedJuz');
      showNotification('تم إلغاء الاختيار 🔓');
    })
    .catch(() => showNotification('حدث خطأ، حاول مرة أخرى'));
  }

  // ============================================
  // REAL-TIME LISTENER — updates all buttons
  // ============================================
  onValue(ref(db, 'takenJuz'), snapshot => {
    takenJuz = snapshot.val() || {};
    updateCounter();
    renderButtons();
  });

  function renderButtons () {
    document.querySelectorAll('.juz-button').forEach(btn => {
      const n    = parseInt(btn.dataset.juz);
      const juz  = juzData.find(j => j.number === n);
      const info = takenJuz[n] || null;
      const mine = myClaimedJuz === n;

      btn.classList.toggle('selected', mine);
      btn.style.opacity = '1';
      // Disable only when user already holds a DIFFERENT juz
      btn.disabled  = !!myClaimedJuz && !mine;
      btn.innerHTML = buildJuzHTML(juz, info, mine);
    });
  }

  // ============================================
  // PROGRESS COUNTER
  // ============================================
  function updateCounter () {
    const counter = document.getElementById('juzCounter');
    const fill    = document.getElementById('juzProgressFill');
    if (!counter || !fill) return;
    const taken = Object.values(takenJuz).filter(v => v && (v.count || 0) > 0).length;
    const pct   = Math.round((taken / 30) * 100);
    counter.textContent = `${taken} / 30 جزء تم اختياره — ${pct}%`;
    fill.style.width    = pct + '%';
  }

  // ============================================
  // NOTIFICATION
  // ============================================
  const notifEl = document.getElementById('notification');
  let notifTimer;
  function showNotification (msg) {
    const el = notifEl.querySelector('.notification-text');
    if (el) el.innerHTML = `<i class="fas fa-heart"></i> ${msg}`;
    notifEl.classList.add('show');
    clearTimeout(notifTimer);
    notifTimer = setTimeout(() => notifEl.classList.remove('show'), 2800);
  }

  // ============================================
  // SHARE
  // ============================================
  document.getElementById('whatsappBtn')?.addEventListener('click', () => {
    const u = encodeURIComponent(window.location.href);
    const t = encodeURIComponent('شاركنا في ختمة القرآن — صدقة جارية 🤍\n');
    window.open(`https://wa.me/?text=${t}${u}`, '_blank');
  });
  document.getElementById('shareBtn')?.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({ title: 'أجر | Adjer', url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => showNotification('تم نسخ الرابط 🔗'));
    }
  });

  // ============================================
  // TASBIH
  // ============================================
  const tasbihDisplay = document.querySelector('.tasbih-display');
  const tasbihBtn     = document.querySelector('.tasbih-button');
  const resetBtn      = document.querySelector('.reset-button');
  const progFill      = document.querySelector('.progress-fill');
  const MAX           = 100;
  let tasbihCount     = parseInt(localStorage.getItem('tasbihCount')) || 0;
  syncTasbih();

  tasbihBtn.addEventListener('click', function () {
    tasbihCount++;
    localStorage.setItem('tasbihCount', tasbihCount);
    syncTasbih(); playClick();
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = ''; }, 100);
    if (tasbihCount % MAX === 0) showNotification(`🌟 أتممت ${tasbihCount} تسبيحة`);
  });
  resetBtn.addEventListener('click', () => {
    tasbihCount = 0;
    localStorage.setItem('tasbihCount', 0);
    syncTasbih();
  });
  function syncTasbih () {
    tasbihDisplay.textContent = tasbihCount;
    const pct  = (tasbihCount % MAX) / MAX * 100;
    const done = tasbihCount > 0 && tasbihCount % MAX === 0;
    progFill.style.width      = pct + '%';
    progFill.style.background = done ? 'linear-gradient(90deg,#4CAF50,#8BC34A)' : 'linear-gradient(90deg,var(--gold),#ffd700)';
    tasbihDisplay.style.color = done ? '#4CAF50' : 'var(--gold)';
  }
  function playClick () {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(820, ctx.currentTime);
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start(); osc.stop(ctx.currentTime + 0.12);
    } catch (_) {}
  }

  // ============================================
  // GLOBAL WEEKLY COUNTDOWN — FIREBASE
  // Single startDate shared by all users
  // ============================================
  const dayEl  = document.querySelector('.days');
  const hourEl = document.querySelector('.hours');
  const minEl  = document.querySelector('.minutes');
  const secEl  = document.querySelector('.seconds');
  const doneEl = document.querySelector('.completion-message');
  const dispEl = document.querySelector('.countdown-display');
  const cdRef  = ref(db, 'weeklyCountdown/startDate');
  let cdInt    = null;

  get(cdRef).then(snap => {
    let startTs = snap.exists() ? snap.val() : null;
    if (!startTs) { startTs = Date.now(); set(cdRef, startTs); }
    const target = startTs + 7 * 86400000;
    if (Date.now() >= target) {
      const ns = Date.now(); set(cdRef, ns); startCountdown(ns + 7 * 86400000);
    } else { startCountdown(target); }
  }).catch(() => {
    let stored = parseInt(localStorage.getItem('cdTarget'));
    if (!stored || stored <= Date.now()) {
      stored = Date.now() + 7 * 86400000;
      localStorage.setItem('cdTarget', stored);
    }
    startCountdown(stored);
  });

  function startCountdown (target) {
    if (cdInt) clearInterval(cdInt);
    tick(); cdInt = setInterval(tick, 1000);
    function tick () {
      const diff = target - Date.now();
      if (diff <= 0) {
        clearInterval(cdInt);
        dispEl.style.display = 'none'; doneEl.style.display = 'block';
        const ns = Date.now(); set(cdRef, ns).catch(() => {});
        setTimeout(() => {
          doneEl.style.display = 'none'; dispEl.style.display = 'grid';
          startCountdown(ns + 7 * 86400000);
        }, 5000); return;
      }
      dayEl.textContent  = Math.floor(diff / 86400000);
      hourEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2,'0');
      minEl.textContent  = String(Math.floor((diff % 3600000)  / 60000)).padStart(2,'0');
      secEl.textContent  = String(Math.floor((diff % 60000)    / 1000)).padStart(2,'0');
    }
  }

  // ============================================
  // STARS PARALLAX
  // ============================================
  const starsEl = document.querySelector('.stars-container');
  for (let i = 0; i < 100; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.5 + 0.5;
    s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;top:${Math.random()*100}%;`
                    + `animation-delay:${Math.random()*3}s;animation-duration:${Math.random()*3+2}s;`;
    starsEl.appendChild(s);
  }
  document.addEventListener('mousemove', e => {
    starsEl.style.transform = `translate(${e.clientX/window.innerWidth*10}px,${e.clientY/window.innerHeight*10}px)`;
  });

  // ============================================
  // CURSOR HALO
  // ============================================
  const halo = document.querySelector('.cursor-halo');
  document.addEventListener('mousemove', e => {
    halo.style.left = (e.clientX - 20) + 'px';
    halo.style.top  = (e.clientY - 20) + 'px';
    let near = false;
    document.querySelectorAll('button,.nav-link,.dua-card').forEach(el => {
      const r = el.getBoundingClientRect();
      if (Math.hypot(e.clientX-(r.left+r.width/2), e.clientY-(r.top+r.height/2)) < 90) near = true;
    });
    halo.style.transform = near ? 'scale(1.5)' : 'scale(1)';
    halo.style.opacity   = near ? '1' : '0.7';
  });

  // ============================================
  // HAMBURGER MENU
  // z-index: hamburger(1200) > panel(1100) > overlay(1050)
  // ============================================
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu      = document.getElementById('navMenu');
  const navOverlay   = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  const openMenu  = () => {
    hamburgerBtn.classList.add('open');
    navMenu.classList.add('open');
    navOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    hamburgerBtn.classList.remove('open');
    navMenu.classList.remove('open');
    navOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburgerBtn?.addEventListener('click', () =>
    navMenu.classList.contains('open') ? closeMenu() : openMenu()
  );
  navOverlay.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  // ============================================
  // FEEDBACK
  // ============================================
  const starBtns   = document.querySelectorAll('.star-btn');
  const ratingText = document.getElementById('ratingText');
  const fbSubmit   = document.getElementById('feedbackSubmit');
  const fbThanks   = document.getElementById('feedbackThanks');
  const labels     = ['','ممتاز 🌟','جيد جداً','جيد','مقبول','ضعيف'];
  let rating       = 0;

  starBtns.forEach(s => {
    s.addEventListener('mouseenter', function () {
      const v = +this.dataset.value;
      starBtns.forEach(x => x.classList.toggle('hovered', +x.dataset.value >= v));
      ratingText.textContent = labels[v]; ratingText.classList.add('active');
    });
    s.addEventListener('mouseleave', () => {
      starBtns.forEach(x => x.classList.remove('hovered'));
      ratingText.textContent = rating ? labels[rating] : 'اختر تقييمك';
      if (!rating) ratingText.classList.remove('active');
    });
    s.addEventListener('click', function () {
      rating = +this.dataset.value;
      starBtns.forEach(x => x.classList.toggle('selected', +x.dataset.value >= rating));
      ratingText.textContent = labels[rating]; ratingText.classList.add('active');
    });
  });

  fbSubmit?.addEventListener('click', async function () {
    if (!rating) { ratingText.textContent = 'يرجى اختيار تقييم أولاً ⭐'; ratingText.classList.add('active'); return; }
    const URL = 'https://script.google.com/macros/s/AKfycbwHfphB7fh1U9anvF9Y50GcZBXSwsHVs2b2BASvGj8O0Ae47GdS-W2HcaVZQyx694WaAw/exec';
    try {
      fbSubmit.textContent = '...جاري الإرسال'; fbSubmit.disabled = true;
      await fetch(URL, {
        method: 'POST', mode: 'no-cors',
        body: JSON.stringify({
          rating,
          feedback1: document.getElementById('feedback1').value || '—',
          feedback2: document.getElementById('feedback2').value || '—',
          feedback3: document.getElementById('feedback3').value || '—'
        })
      });
      fbSubmit.style.display = 'none'; fbThanks.style.display = 'block';
    } catch {
      fbSubmit.textContent = 'حدث خطأ، حاول مرة أخرى'; fbSubmit.disabled = false;
    }
  });

  console.log('🌟 أجر | Adjer — loaded');
  console.log('🤲 In memory of your beloved father and brother');

});
