document.addEventListener('DOMContentLoaded', function() {
  // INTRO OVERLAY
  const introOverlay = document.querySelector('.intro-overlay');
  const introButton = document.querySelector('.intro-button');
  if(introButton) {
    introButton.addEventListener('click', function() {
      introOverlay.classList.add('fade-out');
      setTimeout(()=> introOverlay.style.display='none', 1000);
    });
  }

  // HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  hamburger.addEventListener('click', ()=> navMenu.classList.toggle('active'));

  // SMOOTH SCROLL
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth'});
      if(navMenu.classList.contains('active')) navMenu.classList.remove('active');
    });
  });

  // DUA CARDS ANIMATION
  const duaCards = document.querySelectorAll('.dua-card');
  function animateDuaCards() {
    duaCards.forEach((card,i)=>setTimeout(()=>card.classList.add('animate-in'), i*200));
  }

  // FADE-IN ON SCROLL
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        if(entry.target.id==='dua') animateDuaCards();
      }
    });
  }, {threshold:0.1, rootMargin:'0px 0px -50px 0px'});

  document.querySelectorAll('section').forEach(sec=>observer.observe(sec));
});
