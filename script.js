// ============================================
// FIREBASE SETUP
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, set, onValue }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdbtCNYY-NJK6zNRhUe6Sduz31R8Q3XtA",
  authDomain: "sadaqah-jariyah-cac9b.firebaseapp.com",
  databaseURL: "https://sadaqah-jariyah-cac9b-default-rtdb.firebaseio.com", // ← your real URL
  projectId: "sadaqah-jariyah-cac9b",
  storageBucket: "sadaqah-jariyah-cac9b.firebasestorage.app",
  messagingSenderId: "744079593545",
  appId: "1:744079593545:web:1491548dad4c207cb12f98"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// ============================================
// SADAQAH JARIYAH - JAVASCRIPT
// In Memory of Beloved Father & Brother
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // JUZ DATA - All 30 Juz with exact Arabic format
  // ============================================
  const juzData = [
    { number: 1,  name: "الجزء 1",  range: "الفاتحة (من الآية 1 إلى الآية 7) → البقرة (من الآية 1 إلى الآية 141)",  start: "سورة الفاتحة، الآية 1",  end: "سورة البقرة، الآية 141" },
    { number: 2,  name: "الجزء 2",  range: "البقرة (من الآية 142 إلى الآية 252)",                                    start: "سورة البقرة، الآية 142",  end: "سورة البقرة، الآية 252" },
    { number: 3,  name: "الجزء 3",  range: "البقرة (من الآية 253 إلى آل عمران (من الآية 92)",                        start: "سورة البقرة، الآية 253",  end: "سورة آل عمران، الآية 92" },
    { number: 4,  name: "الجزء 4",  range: "آل عمران (من الآية 93 إلى النساء (من الآية 23)",                         start: "سورة آل عمران، الآية 93", end: "سورة النساء، الآية 23" },
    { number: 5,  name: "الجزء 5",  range: "النساء (من الآية 24 إلى الآية 147)",                                     start: "سورة النساء، الآية 24",   end: "سورة النساء، الآية 147" },
    { number: 6,  name: "الجزء 6",  range: "النساء (من الآية 148 إلى المائدة (من الآية 81)",                         start: "سورة النساء، الآية 148",  end: "سورة المائدة، الآية 81" },
    { number: 7,  name: "الجزء 7",  range: "المائدة (من الآية 82 إلى الأنعام (من الآية 110)",                        start: "سورة المائدة، الآية 82",  end: "سورة الأنعام، الآية 110" },
    { number: 8,  name: "الجزء 8",  range: "الأنعام (من الآية 111 إلى الأعراف (من الآية 87)",                        start: "سورة الأنعام، الآية 111", end: "سورة الأعراف، الآية 87" },
    { number: 9,  name: "الجزء 9",  range: "الأعراف (من الآية 88 إلى الأنفال (من الآية 40)",                         start: "سورة الأعراف، الآية 88",  end: "سورة الأنفال، الآية 40" },
    { number: 10, name: "الجزء 10", range: "الأنفال (من الآية 41 إلى التوبة (من الآية 92)",                          start: "سورة الأنفال، الآية 41",  end: "سورة التوبة، الآية 92" },
    { number: 11, name: "الجزء 11", range: "التوبة (من الآية 93 إلى هود (من الآية 5)",                               start: "سورة التوبة، الآية 93",   end: "سورة هود، الآية 5" },
    { number: 12, name: "الجزء 12", range: "هود (من الآية 6 إلى يوسف (من الآية 52)",                                 start: "سورة هود، الآية 6",       end: "سورة يوسف، الآية 52" },
    { number: 13, name: "الجزء 13", range: "يوسف (من الآية 53 إلى إبراهيم (من الآية 52)",                            start: "سورة يوسف، الآية 53",     end: "سورة إبراهيم، الآية 52" },
    { number: 14, name: "الجزء 14", range: "الحجر (من الآية 1 إلى النحل (من الآية 128)",                             start: "سورة الحجر، الآية 1",     end: "سورة النحل، الآية 128" },
    { number: 15, name: "الجزء 15", range: "الإسراء (من الآية 1 إلى الكهف (من الآية 74)",                            start: "سورة الإسراء، الآية 1",   end: "سورة الكهف، الآية 74" },
    { number: 16, name: "الجزء 16", range: "الكهف (من الآية 75 إلى طه (من الآية 135)",                               start: "سورة الكهف، الآية 75",    end: "سورة طه، الآية 135" },
    { number: 17, name: "الجزء 17", range: "الأنبياء (من الآية 1 إلى الحج (من الآية 78)",                            start: "سورة الأنبياء، الآية 1",  end: "سورة الحج، الآية 78" },
    { number: 18, name: "الجزء 18", range: "المؤمنون (من الآية 1 إلى الفرقان (من الآية 20)",                         start: "سورة المؤمنون، الآية 1",  end: "سورة الفرقان، الآية 20" },
    { number: 19, name: "الجزء 19", range: "الفرقان (من الآية 21 إلى النمل (من الآية 55)",                           start: "سورة الفرقان، الآية 21",  end: "سورة النمل، الآية 55" },
    { number: 20, name: "الجزء 20", range: "النمل (من الآية 56 إلى العنكبوت (من الآية 45)",                          start: "سورة النمل، الآية 56",    end: "سورة العنكبوت، الآية 45" },
    { number: 21, name: "الجزء 21", range: "العنكبوت (من الآية 46 إلى الأحزاب (من الآية 30)",                        start: "سورة العنكبوت، الآية 46", end: "سورة الأحزاب، الآية 30" },
    { number: 22, name: "الجزء 22", range: "الأحزاب (من الآية 31 إلى يس (من الآية 27)",                              start: "سورة الأحزاب، الآية 31",  end: "سورة يس، الآية 27" },
    { number: 23, name: "الجزء 23", range: "يس (من الآية 28 إلى الزمر (من الآية 31)",                                start: "سورة يس، الآية 28",       end: "سورة الزمر، الآية 31" },
    { number: 24, name: "الجزء 24", range: "الزمر (من الآية 32 إلى فصلت (من الآية 46)",                              start: "سورة الزمر، الآية 32",    end: "سورة فصلت، الآية 46" },
    { number: 25, name: "الجزء 25", range: "فصلت (من الآية 47 إلى الجاثية (من الآية 37)",                            start: "سورة فصلت، الآية 47",     end: "سورة الجاثية، الآية 37" },
    { number: 26, name: "الجزء 26", range: "الأحقاف (من الآية 1 إلى الذاريات (من الآية 30)",                         start: "سورة الأحقاف، الآية 1",   end: "سورة الذاريات، الآية 30" },
    { number: 27, name: "الجزء 27", range: "الذاريات (من الآية 31 إلى الحديد (من الآية 29)",                         start: "سورة الذاريات، الآية 31", end: "سورة الحديد، الآية 29" },
    { number: 28, name: "الجزء 28", range: "المجادلة (من الآية 1 إلى التحريم (من الآية 12)",                         start: "سورة المجادلة، الآية 1",  end: "سورة التحريم، الآية 12" },
    { number: 29, name: "الجزء 29", range: "الملك (من الآية 1 إلى المرسلات (من الآية 50)",                           start: "سورة الملك، الآية 1",     end: "سورة المرسلات، الآية 50" },
    { number: 30, name: "الجزء 30", range: "النبأ (من الآية 1 إلى الناس (من الآية 6)",                               start: "سورة النبأ، الآية 1",     end: "سورة الناس، الآية 6" }
  ];

  // ============================================
  // INTRO OVERLAY
  // ============================================
  const introOverlay = document.querySelector('.intro-overlay');
  const introButton  = document.querySelector('.intro-button');

  if (introButton) {
    introButton.addEventListener('click', function() {
      introOverlay.classList.add('fade-out');
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 1000);
    });
  }

  // ============================================
  // SMOOTH SCROLL NAVIGATION
  // ============================================
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId      = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // FADE-IN ON SCROLL
  // ============================================
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'dua') animateDuaCards();
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => observer.observe(section));

  // ============================================
  // DUA CARDS ANIMATION
  // ============================================
  function animateDuaCards() {
    const cards = document.querySelectorAll('.dua-card');
    cards.forEach((card, index) => {
      setTimeout(() => card.classList.add('animate-in'), index * 200);
    });
  }

  // ============================================
  // QURAN JUZ SYSTEM — FIREBASE REALTIME SYNC
  // Each Juz can be claimed by ONE person
  // Others can still pick remaining Juz freely
  // ============================================
  const quranGrid    = document.querySelector('.quran-grid');
  const notification = document.getElementById('notification');

  // myClaimedJuz = the juz number THIS browser user already claimed (stored locally)
  let myClaimedJuz = parseInt(localStorage.getItem('myClaimedJuz')) || null;

  // takenJuz = object of all claimed Juz from Firebase e.g. { "3": true, "7": true }
  let takenJuz = {};

  // Generate all 30 juz buttons
  juzData.forEach(juz => {
    const button = document.createElement('button');
    button.className   = 'juz-button';
    button.dataset.juz = juz.number;
    button.innerHTML   = `
      <div style="font-size:1.5rem;font-weight:bold;margin-bottom:0.5rem;">${juz.name}</div>
      <div style="font-size:1rem;line-height:1.6;opacity:0.9;">${juz.range}</div>
    `;
    quranGrid.appendChild(button);
  });

  // Click handler — each user can only claim ONE juz
  document.querySelectorAll('.juz-button').forEach(button => {
    button.addEventListener('click', function() {
      const juzNumber = parseInt(this.dataset.juz);

      // User already claimed a juz
      if (myClaimedJuz) {
        if (myClaimedJuz === juzNumber) {
          showNotification('لقد اخترت هذا الجزء بالفعل 🤍');
        } else {
          showNotification('لقد اخترت جزءاً من قبل، لا يمكنك تغييره 🕌');
        }
        return;
      }

      // This juz is already taken by someone else
      if (takenJuz[juzNumber]) {
        showNotification('هذا الجزء محجوز من شخص آخر 🕌');
        return;
      }

      // ✅ Claim this juz in Firebase
      const juzRef = ref(db, 'takenJuz/' + juzNumber);
      set(juzRef, true).then(() => {
        myClaimedJuz = juzNumber;
        localStorage.setItem('myClaimedJuz', juzNumber);
        showNotification('تقبل الله منك 🤍');
      });
    });
  });

  // ============================================
  // 🔴 REAL-TIME LISTENER — watches ALL juz
  // Updates every user's screen instantly
  // ============================================
  const allJuzRef = ref(db, 'takenJuz');

  onValue(allJuzRef, (snapshot) => {
    takenJuz = snapshot.val() || {};

    // Re-render all buttons based on current state
    document.querySelectorAll('.juz-button').forEach(btn => {
      const n   = parseInt(btn.dataset.juz);
      const juz = juzData.find(j => j.number === n);

      if (myClaimedJuz === n) {
        // 🟢 THIS user's selected juz — green
        btn.classList.add('selected');
        btn.classList.remove('taken');
        btn.disabled      = true;
        btn.style.opacity = '1';
        btn.innerHTML = `
          <div style="font-size:1.5rem;font-weight:bold;margin-bottom:0.5rem;">${juz.name}</div>
          <div style="font-size:1rem;line-height:1.6;opacity:0.9;">${juz.range}</div>
          <div style="position:absolute;top:10px;left:10px;background:#4CAF50;color:white;padding:0.4rem 0.8rem;border-radius:15px;font-size:0.8rem;font-weight:bold;">جزؤك ✓</div>
        `;
      } else if (takenJuz[n]) {
        // 🔴 Taken by someone else — dimmed and locked
        btn.classList.remove('selected');
        btn.classList.add('taken');
        btn.disabled      = true;
        btn.style.opacity = '0.4';
        btn.innerHTML = `
          <div style="font-size:1.5rem;font-weight:bold;margin-bottom:0.5rem;">${juz.name}</div>
          <div style="font-size:1rem;line-height:1.6;">${juz.range}</div>
          <div style="position:absolute;top:10px;left:10px;background:#e74c3c;color:white;padding:0.4rem 0.8rem;border-radius:15px;font-size:0.8rem;font-weight:bold;">محجوز 🔒</div>
        `;
      } else {
        // ⚪ Available — show normally
        btn.classList.remove('selected', 'taken');
        btn.style.opacity = '1';
        // Disable only if THIS user already claimed something
        btn.disabled = !!myClaimedJuz;
        btn.innerHTML = `
          <div style="font-size:1.5rem;font-weight:bold;margin-bottom:0.5rem;">${juz.name}</div>
          <div style="font-size:1rem;line-height:1.6;opacity:0.9;">${juz.range}</div>
        `;
      }
    });
  });

  function showNotification(message) {
    const notifText = notification.querySelector('.notification-text');
    if (notifText && message) notifText.textContent = message;
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 2500);
  }

  // ============================================
  // TASBIH COUNTER — kept in localStorage
  // ============================================
  const tasbihDisplay = document.querySelector('.tasbih-display');
  const tasbihButton  = document.querySelector('.tasbih-button');
  const resetButton   = document.querySelector('.reset-button');
  const progressFill  = document.querySelector('.progress-fill');
  const maxCount      = 100;
  let tasbihCount     = parseInt(localStorage.getItem('tasbihCount')) || 0;

  updateTasbihDisplay();

  tasbihButton.addEventListener('click', function() {
    tasbihCount++;
    localStorage.setItem('tasbihCount', tasbihCount);
    updateTasbihDisplay();
    playClickSound();
    this.style.transform = 'scale(0.95)';
    setTimeout(() => { this.style.transform = ''; }, 100);
  });

  resetButton.addEventListener('click', function() {
    tasbihCount = 0;
    localStorage.setItem('tasbihCount', tasbihCount);
    updateTasbihDisplay();
  });

  function updateTasbihDisplay() {
    tasbihDisplay.textContent = tasbihCount;
    const percentage = (tasbihCount / maxCount) * 100;
    progressFill.style.width = percentage + '%';
    if (tasbihCount >= maxCount) {
      progressFill.style.background = 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)';
      tasbihDisplay.style.color     = '#4CAF50';
    } else {
      progressFill.style.background = 'linear-gradient(90deg, var(--gold) 0%, #ffd700 100%)';
      tasbihDisplay.style.color     = 'var(--gold)';
    }
  }

  function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator   = audioContext.createOscillator();
    const gainNode     = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  // ============================================
  // WEEKLY COUNTDOWN TIMER
  // ============================================
  const dayDisplay        = document.querySelector('.days');
  const hourDisplay       = document.querySelector('.hours');
  const minuteDisplay     = document.querySelector('.minutes');
  const secondDisplay     = document.querySelector('.seconds');
  const completionMessage = document.querySelector('.completion-message');
  const countdownDisplay  = document.querySelector('.countdown-display');

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  targetDate.setHours(0, 0, 0, 0);

  function updateCountdown() {
    const now        = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      countdownDisplay.style.display  = 'none';
      completionMessage.style.display = 'block';
      return;
    }

    const days    = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    dayDisplay.textContent    = days;
    hourDisplay.textContent   = hours.toString().padStart(2, '0');
    minuteDisplay.textContent = minutes.toString().padStart(2, '0');
    secondDisplay.textContent = seconds.toString().padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============================================
  // PARALLAX STARS
  // ============================================
  const starsContainer = document.querySelector('.stars-container');
  const numStars       = 100;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement('div');
    star.className              = 'star';
    star.style.width            = Math.random() * 3 + 'px';
    star.style.height           = star.style.width;
    star.style.left             = Math.random() * 100 + '%';
    star.style.top              = Math.random() * 100 + '%';
    star.style.animationDelay   = Math.random() * 3 + 's';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    starsContainer.appendChild(star);
  }

  document.addEventListener('mousemove', function(e) {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    starsContainer.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
  });

  // ============================================
  // GLOWING CURSOR HALO
  // ============================================
  const cursorHalo = document.querySelector('.cursor-halo');

  document.addEventListener('mousemove', function(e) {
    cursorHalo.style.left = (e.clientX - 20) + 'px';
    cursorHalo.style.top  = (e.clientY - 20) + 'px';

    let nearInteractive = false;
    document.querySelectorAll('button, .nav-link, .dua-card').forEach(element => {
      const rect     = element.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(e.clientX - (rect.left + rect.width  / 2), 2) +
        Math.pow(e.clientY - (rect.top  + rect.height / 2), 2)
      );
      if (distance < 100) {
        nearInteractive            = true;
        cursorHalo.style.transform = 'scale(1.5)';
        cursorHalo.style.opacity   = '1';
      }
    });

    if (!nearInteractive) {
      cursorHalo.style.transform = 'scale(1)';
      cursorHalo.style.opacity   = '0.7';
    }
  });

  // ============================================
  // FEEDBACK SECTION
  // ============================================
  const starBtns       = document.querySelectorAll('.star-btn');
  const ratingText     = document.getElementById('ratingText');
  const feedbackSubmit = document.getElementById('feedbackSubmit');
  const feedbackThanks = document.getElementById('feedbackThanks');
  const ratingLabels = ['', 'ممتاز 🌟', 'جيد جداً', 'جيد', 'مقبول', 'ضعيف'];
  let selectedRating   = 0;

  starBtns.forEach(star => {
    star.addEventListener('mouseenter', function() {
      const val = parseInt(this.dataset.value);
      starBtns.forEach(s => s.classList.toggle('hovered', parseInt(s.dataset.value) >= val));
      ratingText.textContent = ratingLabels[val];
      ratingText.classList.add('active');
    });

    star.addEventListener('mouseleave', function() {
      starBtns.forEach(s => s.classList.remove('hovered'));
      ratingText.textContent = selectedRating ? ratingLabels[selectedRating] : 'اختر تقييمك';
      if (!selectedRating) ratingText.classList.remove('active');
    });

    star.addEventListener('click', function() {
      selectedRating = parseInt(this.dataset.value);
      starBtns.forEach(s => s.classList.toggle('selected', parseInt(s.dataset.value) >= selectedRating));
      ratingText.textContent = ratingLabels[selectedRating];
      ratingText.classList.add('active');
    });
  });

  if (feedbackSubmit) {
    feedbackSubmit.addEventListener('click', function() {
      if (!selectedRating) {
        ratingText.textContent = 'يرجى اختيار تقييم أولاً ⭐';
        ratingText.classList.add('active');
        return;
      }
      feedbackSubmit.style.display = 'none';
      feedbackThanks.style.display = 'block';
    });
  }if (feedbackSubmit) {
    feedbackSubmit.addEventListener('click', async function() {
      if (!selectedRating) {
        ratingText.textContent = 'يرجى اختيار تقييم أولاً ⭐';
        ratingText.classList.add('active');
        return;
      }

      // 👇 Your Google Apps Script URL
      const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwHfphB7fh1U9anvF9Y50GcZBXSwsHVs2b2BASvGj8O0Ae47GdS-W2HcaVZQyx694WaAw/exec';

      const data = {
        rating:    selectedRating,
        feedback1: document.getElementById('feedback1').value || '—',
        feedback2: document.getElementById('feedback2').value || '—',
        feedback3: document.getElementById('feedback3').value || '—'
      };

      try {
        feedbackSubmit.textContent = '...جاري الإرسال';
        feedbackSubmit.disabled    = true;

        await fetch(SHEET_URL, {
          method: 'POST',
          mode:   'no-cors',
          body:   JSON.stringify(data)
        });

        feedbackSubmit.style.display = 'none';
        feedbackThanks.style.display = 'block';

      } catch (error) {
        feedbackSubmit.textContent = 'حدث خطأ، حاول مرة أخرى';
        feedbackSubmit.disabled    = false;
      }
    });
  }
https://script.google.com/macros/s/AKfycb.../exec

  // ============================================
  // PREVENT WHITE FLASH ON LOAD
  // ============================================
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 100);

  console.log('🌟 Sadaqah Jariyah Website Loaded - Firebase Connected');
  console.log('🤲 In memory of your beloved father and brother');

});
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});
