// WeCompound — main.js

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
});

/* ========== PRELOADER — Counter Animation ========== */
var preloaderAnimationDone = false;
var windowLoaded = false;

function initPreloader() {
  const preloader = document.querySelector('.preloader');
  if (!preloader) { onReady(); return; }

  const counter = preloader.querySelector('.preloader__counter');

  // Init Vanta as soon as window loads (independent of animation)
  window.addEventListener('load', () => {
    windowLoaded = true;
    initVanta();
    // If animation already finished while waiting for load, dismiss now
    if (preloaderAnimationDone) dismissPreloader(preloader);
  });

  // Start the counter animation immediately — don't wait for window.load
  if (counter) runCounterAnimation(preloader, counter);
  else dismissPreloader(preloader);
}

function runCounterAnimation(preloader, counter) {
  var cursor = preloader.querySelector('.preloader__cursor');

  // 2 cursor blinks (1s) + 0.5s hold with cursor visible, then start counting
  if (cursor) {
    setTimeout(function() {
      cursor.style.animation = 'none';
      cursor.style.opacity = '1';
    }, 1000);
  }
  setTimeout(function() {
    counter.textContent = '1';
    if (cursor) cursor.remove();

    // Phase A: 1→10 over 733ms (snappy, deliberate — 1.5x faster)
    // Phase B: 10→1,000,000 over 1.0s (explosive)
    var phaseA = 733;
    var phaseB = 1000;
    var start = performance.now();
    var lastDisplay = -1;

    function tick(now) {
      var elapsed = now - start;
      var value;

      if (elapsed < phaseA) {
        var p = elapsed / phaseA;
        value = Math.max(1, Math.floor(1 + 9 * Math.pow(p, 2.5)));
      } else if (elapsed < phaseA + phaseB) {
        var p = (elapsed - phaseA) / phaseB;
        value = Math.floor(10 + 999990 * Math.pow(p, 5));
      } else {
        counter.textContent = 'Compound';
        preloaderAnimationDone = true;
        // Only dismiss if window has loaded (so GSAP/Vanta are ready)
        setTimeout(function() {
          if (windowLoaded) {
            dismissPreloader(preloader);
          } else {
            // Window hasn't loaded yet — wait for it
            window.addEventListener('load', function() {
              dismissPreloader(preloader);
            });
          }
        }, 300);
        return;
      }

      if (value !== lastDisplay) {
        counter.textContent = value.toLocaleString();
        lastDisplay = value;
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, 1500);
}

function dismissPreloader(preloader) {
  preloader.classList.add('is-done');
  preloader.addEventListener('transitionend', function() {
    preloader.remove();
  }, { once: true });
  setTimeout(function() { if (document.contains(preloader)) preloader.remove(); }, 600);
  onReady();
}

var __appStarted = false;
function onReady() {
  if (__appStarted) return;
  __appStarted = true;
  initApp();
}

function initApp() {
  initLenis();
  initGSAP();
  // Vanta already initialized in preloader phase — skip if already running
  if (!window.__vantaEffect) initVanta();
  initBarba();
  initMobileMenu();
  initStickyCta();
  initCountUp();
  initProjectPanels();
  initDynamicYear();
  initScrollToTop();
  initLogoOSpin();

  // Safety net: force hero elements visible if GSAP animations stall
  setTimeout(() => {
    document.querySelectorAll('.hero__title, .hero__title .word, .hero .eyebrow, .hero__sub, .hero__actions, .page-hero .eyebrow, .page-hero__title, .page-hero__sub').forEach(el => {
      if (getComputedStyle(el).opacity === '0') {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
    });
  }, 1500);
}

/* ========== LENIS SMOOTH SCROLL ========== */
function initLenis() {
  if (typeof Lenis === 'undefined') return;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  window.__lenis = lenis;

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ========== GSAP SCROLL ANIMATIONS ========== */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Hero word-by-word reveal (home page only)
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    const words = text.split(' ');
    heroTitle.innerHTML = words.map(w => '<span class="word" style="display:inline-block">' + w + '</span>').join(' ');

    gsap.to('.hero .eyebrow', {
      opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 0,
    });

    gsap.to('.hero__title .word', {
      opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power2.out', delay: 0.15,
    });

    gsap.to('.hero__sub, .hero__actions', {
      opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.6,
    });
  }

  // Page hero fade-in (non-home pages: services, work, contact)
  const pageHero = document.querySelector('.page-hero');
  if (pageHero) {
    gsap.to('.page-hero .eyebrow, .page-hero__title, .page-hero__sub', {
      opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.1,
    });
  }

  // Section entrance animations
  const sections = document.querySelectorAll(
    '.founder, .services-overview, .stats-strip, .featured-work, .cta-banner, .service-detail, .contact-section, .portfolio-section'
  );

  sections.forEach(section => {
    const children = section.querySelectorAll('.container > *, .founder__inner > *, .service-detail__inner > *, .contact-grid > *, .cta-banner__inner > *');
    if (children.length === 0) return;

    gsap.from(children, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  });

  // Card stagger animations
  const cardGroups = document.querySelectorAll('.bento-grid, .work-grid, .project-grid');
  cardGroups.forEach(group => {
    const cards = group.children;
    gsap.from(cards, {
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      scale: 0.97,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
    });
  });
}

/* ========== VANTA.JS HERO BACKGROUND ========== */
function initVanta() {
  if (typeof VANTA === 'undefined') return;
  const el = document.getElementById('vanta-bg');
  if (!el) return;

  // Destroy existing instance if re-initializing after Barba transition
  if (window.__vantaEffect) {
    window.__vantaEffect.destroy();
  }

  window.__vantaEffect = VANTA.NET({
    el: el,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x22c55e,
    backgroundColor: 0x010102,
    points: 8.00,
    maxDistance: 22.00,
    spacing: 18.00,
    showDots: true,
  });
}

/* ========== BARBA.JS PAGE TRANSITIONS ========== */
function initBarba() {
  if (typeof barba === 'undefined') return;

  // Create progress bar if it doesn't exist
  if (!document.querySelector('.barba-progress')) {
    const progressBar = document.createElement('div');
    progressBar.className = 'barba-progress';
    progressBar.innerHTML = '<div class="barba-progress__bar"></div>';
    document.body.appendChild(progressBar);
  }

  barba.init({
    preventRunning: true,
    transitions: [{
      name: 'fade',
      leave(data) {
        const bar = document.querySelector('.barba-progress__bar');
        if (bar && typeof gsap !== 'undefined') {
          gsap.to(bar, { scaleX: 1, duration: 0.3, ease: 'power2.out' });
        }
        return new Promise(resolve => {
          if (typeof gsap !== 'undefined') {
            gsap.to(data.current.container, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.inOut',
              onComplete: resolve,
            });
          } else {
            resolve();
          }
        });
      },
      enter(data) {
        const bar = document.querySelector('.barba-progress__bar');

        // Reset scroll
        window.scrollTo(0, 0);
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });

        return new Promise(resolve => {
          if (typeof gsap !== 'undefined') {
            gsap.from(data.next.container, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.inOut',
              onComplete: () => {
                if (bar) gsap.to(bar, { scaleX: 0, duration: 0.2, ease: 'power2.in' });
                resolve();
              },
            });
          } else {
            resolve();
          }
        });
      },
      after() {
        // Kill old ScrollTriggers and re-init everything
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.getAll().forEach(t => t.kill());
        }
        initGSAP();
        initVanta();
        initCountUp();
        initProjectPanels();
        initStickyCta();
        initDynamicYear();
        initScrollToTop();
        updateActiveNav();
      }
    }]
  });
}

function updateActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    link.classList.remove('nav__link--active');
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('nav__link--active');
    }
  });
}

/* ========== MOBILE MENU ========== */
function initMobileMenu() {
  const hamburger = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu__overlay');
  const closeBtn = document.querySelector('.mobile-menu__close');
  if (!hamburger || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';

    // Stagger link animation
    const links = menu.querySelectorAll('.mobile-menu__link');
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(links,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
      );
    }
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* ========== STICKY MOBILE CTA ========== */
function initStickyCta() {
  const stickyCta = document.querySelector('.sticky-cta');
  const hero = document.querySelector('.hero, .page-hero');
  if (!stickyCta || !hero) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        stickyCta.classList.add('is-visible');
      } else {
        stickyCta.classList.remove('is-visible');
      }
    });
  }, { threshold: 0 });

  observer.observe(hero);
}

/* ========== COUNT-UP ANIMATION ========== */
function initCountUp() {
  const counters = document.querySelectorAll('.stat__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ========== PROJECT PANELS (Work page) ========== */
function initProjectPanels() {
  const cards = document.querySelectorAll('.project-card[data-project]');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.dataset.project;
      const panel = document.getElementById(projectId + '-panel');
      if (!panel) return;

      // Close any other open panel
      document.querySelectorAll('.project-panel.is-open').forEach(p => {
        if (p !== panel) p.classList.remove('is-open');
      });

      // Toggle this panel
      panel.classList.toggle('is-open');

      // Scroll into view if opening
      if (panel.classList.contains('is-open')) {
        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  });

  // Close buttons inside panels
  document.querySelectorAll('.project-panel__close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.closest('.project-panel').classList.remove('is-open');
    });
  });
}

/* ========== DYNAMIC YEAR ========== */
function initDynamicYear() {
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ========== SCROLL TO TOP ========== */
function initScrollToTop() {
  // Don't create duplicate buttons
  if (document.querySelector('.scroll-top')) return;

  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 16V4M4 10l6-6 6 6"/></svg>';
  document.body.appendChild(btn);

  const hero = document.querySelector('.hero, .page-hero');
  if (hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        btn.classList.toggle('is-visible', !entry.isIntersecting);
      });
    }, { threshold: 0 });
    observer.observe(hero);
  }

  btn.addEventListener('click', () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ========== LOGO 'O' DIGIT SPIN ========== */
function initLogoOSpin() {
  var logo = document.querySelector('.nav__logo span');
  if (!logo) return;

  // Wrap the two 'o's in Compound with spans
  logo.innerHTML = logo.textContent.replace(/o/g, function(match, offset) {
    return '<span class="logo-o" data-o="true">o</span>';
  });

  var oSpans = logo.querySelectorAll('.logo-o');
  if (oSpans.length < 2) return;

  // Lock each 'o' span to its exact measured width so digits never shift surrounding letters
  oSpans.forEach(function(span) {
    var w = span.getBoundingClientRect().width;
    span.style.width = w + 'px';
  });

  function spinO(el) {
    var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var i = 0;
    var speed = 60;

    el.classList.add('is-digit');
    var interval = setInterval(function() {
      el.textContent = digits[i];
      i++;
      if (i >= digits.length) {
        clearInterval(interval);
        setTimeout(function() {
          el.textContent = 'o';
          el.classList.remove('is-digit');
        }, 80);
      }
    }, speed);
  }

  function triggerCycle() {
    // Spin first 'o'
    spinO(oSpans[0]);

    // Spin second 'o' 0.5-1s later
    var secondDelay = 100 + Math.random() * 900;
    setTimeout(function() {
      spinO(oSpans[1]);
    }, secondDelay);

    // Schedule next cycle: 10-20s from now
    var nextCycle = 10000 + Math.random() * 10000;
    setTimeout(triggerCycle, nextCycle);
  }

  // Start first cycle after a short delay
  setTimeout(triggerCycle, 2000);
}
