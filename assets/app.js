(() => {
  'use strict';

  const doc = document.documentElement;
  const body = document.body;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  q('[data-year]').textContent = new Date().getFullYear();

  const header = q('[data-header]');
  const progress = q('.scroll-progress span');

  const updateChrome = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 32);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const value = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = `scaleX(${value})`;
    }
  };

  updateChrome();
  window.addEventListener('scroll', updateChrome, { passive: true });

  const menuButton = q('.menu-toggle');
  const menu = q('.menu-overlay');
  const menuLinks = qa('.menu-overlay a');

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-hidden', String(!open));

    if (gsap && !prefersReduced) {
      if (open) {
        gsap.set(menu, { autoAlpha: 1 });
        gsap.fromTo('.menu-overlay nav a',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: 'power4.out' }
        );
      } else {
        gsap.to(menu, { autoAlpha: 0, duration: 0.35, ease: 'power2.out' });
      }
    } else if (menu) {
      menu.style.visibility = open ? 'visible' : 'hidden';
      menu.style.opacity = open ? '1' : '0';
    }
  };

  menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });

  const form = q('[data-demo-form]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = q('.form-status', form);
    if (status) {
      status.textContent = 'Formularz jest wersją demonstracyjną. Przed publikacją podłącz docelowy endpoint i politykę prywatności.';
    }
  });

  if (!gsap || !ScrollTrigger || prefersReduced) {
    body.classList.remove('is-loading');
    q('.page-loader')?.remove();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  body.classList.add('is-loading');

  const loader = q('.page-loader');
  const loaderCount = q('.loader-count');
  const hasSeenLoader = sessionStorage.getItem('milimetr-loader') === '1';
  const counter = { value: 0 };
  if (hasSeenLoader && loader) {
    loader.remove();
    body.classList.remove('is-loading');
  }

  const loadTimeline = gsap.timeline({
    defaults: { ease: 'power3.inOut' },
    onComplete: () => {
      body.classList.remove('is-loading');
      sessionStorage.setItem('milimetr-loader', '1');
      loader?.remove();
      ScrollTrigger.refresh();
    }
  });

  if (!hasSeenLoader) loadTimeline
    .to(counter, {
      value: 100,
      duration: 1.05,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (loaderCount) loaderCount.textContent = String(Math.round(counter.value)).padStart(3, '0');
      }
    }, 0)
    .from('.loader-grid span', { scaleX: 0, duration: 0.7, stagger: { amount: 0.45, from: 'random' } }, 0)
    .from('.loader-word', { yPercent: 110, opacity: 0, duration: 0.8 }, 0.12)
    .to('.loader-word', { yPercent: -110, opacity: 0, duration: 0.65 }, 1.05)
    .to('.loader-grid span', { scaleX: 0, transformOrigin: 'right center', duration: 0.7, stagger: { amount: 0.35, from: 'random' } }, 1.02)
    .to(loader, { autoAlpha: 0, duration: 0.25 }, 1.48)
    .from('.hero-line > span', { yPercent: 110, duration: 1.1, stagger: 0.1, ease: 'power4.out' }, 1.08)
    .from('.hero .eyebrow, .hero-bottom', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, 1.28)
    .from('.hero-media', { clipPath: 'inset(100% 0 0 0)', duration: 1.2, ease: 'power4.inOut' }, 1.05)
    .from('.hero-media img', { scale: 1.28, duration: 1.5, ease: 'power3.out' }, 1.05);

  const splitForReveal = (element) => {
    if (element.dataset.split === 'true') return;
    const nodes = [...element.childNodes];
    element.innerHTML = '';
    const line = document.createElement('span');
    line.className = 'reveal-line';
    nodes.forEach((node) => line.appendChild(node));
    const inner = document.createElement('span');
    while (line.firstChild) inner.appendChild(line.firstChild);
    line.appendChild(inner);
    element.appendChild(line);
    element.dataset.split = 'true';
  };

  qa('.reveal-lines').forEach((element) => {
    splitForReveal(element);
    gsap.from(q('.reveal-line > span', element), {
      yPercent: 105,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: { trigger: element, start: 'top 84%', once: true }
    });
  });

  gsap.set('.reveal-line', { display: 'block', overflow: 'hidden', paddingBottom: '0.06em' });
  gsap.set('.reveal-line > span', { display: 'block' });

  qa('.reveal-up').forEach((element) => {
    if (element.closest('.hero')) return;
    gsap.from(element, {
      y: 38,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: { trigger: element, start: 'top 88%', once: true }
    });
  });

  qa('.image-reveal-scroll').forEach((element) => {
    const image = q('img', element);
    gsap.fromTo(element,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.2,
        ease: 'power4.inOut',
        scrollTrigger: { trigger: element, start: 'top 86%', once: true }
      }
    );
    if (image) {
      gsap.from(image, {
        scale: 1.18,
        duration: 1.45,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 86%', once: true }
      });
    }
  });

  gsap.to('.hero-media', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  gsap.to('.hero-title', {
    yPercent: 13,
    opacity: 0.18,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: '35% top', end: 'bottom top', scrub: true }
  });

  qa('[data-parallax]').forEach((element) => {
    const image = q('img', element);
    if (!image || element.closest('.hero')) return;
    const amount = Number(element.dataset.parallax || 0.08) * 100;
    gsap.fromTo(image, { yPercent: -amount / 2 }, {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  const precisionSteps = qa('.precision-step');
  const tiles = qa('.precision-surface .tile');
  const precisionTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.precision-story',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const index = Math.min(precisionSteps.length - 1, Math.floor(self.progress * precisionSteps.length));
        precisionSteps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === index));
      }
    }
  });

  precisionTimeline
    .to('.laser-line', { left: '58%', duration: 1 })
    .to('.precision-surface', { gap: 8, rotateY: 5, rotateX: -2, scale: 0.94, duration: 1 })
    .to('.precision-marker', { x: -130, y: 90, duration: 1 }, '<')
    .to('.laser-line', { left: '26%', duration: 1 })
    .to('.tile-b, .tile-c', { backgroundColor: '#d2ccc2', duration: 1 }, '<')
    .to('.precision-surface', { rotateY: -7, rotateX: 4, scale: 1.03, duration: 1 });

  const horizontal = q('[data-horizontal]');
  const horizontalTrack = q('.services-track');
  const mm = gsap.matchMedia();

  mm.add('(min-width: 801px)', () => {
    if (!horizontal || !horizontalTrack) return;
    const getDistance = () => horizontalTrack.scrollWidth - window.innerWidth;
    const tween = gsap.to(horizontalTrack, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: horizontal,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.65,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    qa('.service-panel--image img').forEach((image) => {
      gsap.fromTo(image, { xPercent: -8 }, {
        xPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: image.closest('.service-panel'),
          containerAnimation: tween,
          start: 'left right',
          end: 'right left',
          scrub: true
        }
      });
    });
  });

  const processLine = q('.process-line span');
  if (processLine) {
    gsap.to(processLine, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.process-list', start: 'top 65%', end: 'bottom 65%', scrub: true }
    });
  }

  qa('.process-step').forEach((step) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 67%',
      end: 'bottom 45%',
      toggleClass: 'is-active'
    });
  });

  const cursor = q('.cursor-dot');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    let visible = false;
    window.addEventListener('pointermove', (event) => {
      if (!visible) {
        visible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.22, ease: 'power3.out' });
    });

    qa('a, button, summary').forEach((element) => {
      element.addEventListener('pointerenter', () => gsap.to(cursor, { scale: 4.2, opacity: 0.45, duration: 0.25 }));
      element.addEventListener('pointerleave', () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.25 }));
    });
  }

  if (window.matchMedia('(pointer:fine)').matches) {
    qa('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * 0.18, y: y * 0.18, duration: 0.35, ease: 'power3.out' });
      });
      element.addEventListener('pointerleave', () => {
        gsap.to(element, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });
      });
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
