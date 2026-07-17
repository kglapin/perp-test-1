(() => {
  'use strict';

  const doc = document.documentElement;
  const body = document.body;
  const gsap = window.gsap;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const desktopQuery = window.matchMedia('(min-width: 801px)');

  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (start, end, progress) => start + (end - start) * progress;

  const year = q('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const header = q('[data-header]');
  const globalProgress = q('.scroll-progress span');
  const menuButton = q('.menu-toggle');
  const menu = q('.menu-overlay');
  const menuLinks = qa('.menu-overlay a');
  const form = q('[data-demo-form]');

  const heroShell = q('[data-home-process-hero]');
  const heroResult = q('[data-home-result-reveal]', heroShell || document);
  const heroDivider = q('[data-home-divider]', heroShell || document);
  const heroStateLabel = q('[data-home-state-label]', heroShell || document);
  const heroStateBar = q('[data-home-state-bar]', heroShell || document);
  const heroSteps = qa('.hero-process-steps li', heroShell || document);
  const heroWorkImage = q('.hero-process-image--work img', heroShell || document);
  const heroResultImage = q('.hero-process-image--result img', heroShell || document);
  const heroCopy = q('.hero-process-copy', heroShell || document);
  const heroLabels = ['POMIAR', 'UKŁAD', 'MONTAŻ', 'EFEKT'];

  const precisionStory = q('.precision-story');
  const precisionSteps = qa('.precision-step');
  const precisionSurface = q('.precision-surface');
  const laserLine = q('.laser-line');
  const precisionMarker = q('.precision-marker');
  const tileB = q('.tile-b');
  const tileC = q('.tile-c');

  const servicesStage = q('[data-horizontal]');
  const servicesTrack = q('.services-track');
  const serviceImages = qa('.service-panel--image img');
  let servicesDistance = 0;
  let measuredViewportHeight = window.innerHeight;
  let lastViewportWidth = window.innerWidth;

  const processList = q('.process-list');
  const processLine = q('.process-line span');
  const processSteps = qa('.process-step');
  const parallaxItems = qa('[data-parallax]');

  let frameRequested = false;
  let observersStarted = false;

  const setMenu = (open) => {
    body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-hidden', String(!open));

    if (!menu) return;

    if (gsap && !reducedMotion) {
      if (open) {
        gsap.set(menu, { autoAlpha: 1 });
        gsap.fromTo(
          '.menu-overlay nav a',
          { yPercent: 105, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.05, ease: 'power4.out' }
        );
      } else {
        gsap.to(menu, { autoAlpha: 0, duration: 0.28, ease: 'power2.out' });
      }
    } else {
      menu.style.visibility = open ? 'visible' : 'hidden';
      menu.style.opacity = open ? '1' : '0';
    }
  };

  menuButton?.addEventListener('click', () => setMenu(!body.classList.contains('menu-open')));
  menuLinks.forEach((link) => link.addEventListener('click', () => setMenu(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = q('.form-status', form);
    if (status) {
      status.textContent = 'Formularz jest wersją demonstracyjną. Przed publikacją podłącz docelowy endpoint i politykę prywatności.';
    }
  });

  const measureServices = () => {
    if (!servicesStage || !servicesTrack) return;

    if (!desktopQuery.matches) {
      servicesDistance = 0;
      servicesStage.style.height = '';
      servicesTrack.style.transform = '';
      serviceImages.forEach((image) => {
        image.style.transform = '';
      });
      return;
    }

    measuredViewportHeight = window.innerHeight;
    servicesDistance = Math.max(0, servicesTrack.scrollWidth - window.innerWidth);
    servicesStage.style.height = `${Math.ceil(measuredViewportHeight + servicesDistance)}px`;
  };

  const renderHero = () => {
    if (!heroShell) return;

    const rect = heroShell.getBoundingClientRect();
    const distance = Math.max(1, heroShell.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / distance);
    const reveal = 100 - progress * 100;
    const activeIndex = Math.min(heroSteps.length - 1, Math.floor(progress * Math.max(1, heroSteps.length)));

    if (heroResult) heroResult.style.clipPath = `inset(0 0 0 ${reveal}%)`;
    if (heroDivider) heroDivider.style.left = `${reveal}%`;
    if (heroStateBar) heroStateBar.style.transform = `scaleX(${progress})`;
    if (heroStateLabel && heroLabels[activeIndex]) {
      heroStateLabel.textContent = `${heroLabels[activeIndex]} / ${String(Math.round(progress * 100)).padStart(2, '0')}%`;
    }

    heroSteps.forEach((step, index) => step.classList.toggle('is-active', index === activeIndex));

    const heroIsActive = rect.top <= 0 && rect.bottom > window.innerHeight * 0.02;
    body.classList.toggle('is-process-hero-active', heroIsActive);

    if (!reducedMotion) {
      if (heroWorkImage) {
        heroWorkImage.style.transform = `translate3d(0, ${progress * 5}%, 0) scale(${1.08 + progress * 0.035})`;
      }
      if (heroResultImage) {
        heroResultImage.style.transform = `translate3d(0, ${lerp(-3, 3, progress)}%, 0) scale(${lerp(1.12, 1.04, progress)})`;
      }
      if (heroCopy) {
        const fade = progress < 0.55 ? 1 : lerp(1, 0.3, clamp((progress - 0.55) / 0.45));
        heroCopy.style.opacity = String(fade);
        heroCopy.style.transform = `translate3d(0, ${progress * 4}%, 0)`;
      }
    }
  };

  const renderPrecision = () => {
    if (!precisionStory || !precisionSteps.length) return;

    const rect = precisionStory.getBoundingClientRect();
    const distance = Math.max(1, precisionStory.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / distance);
    const activeIndex = Math.min(precisionSteps.length - 1, Math.floor(progress * precisionSteps.length));

    precisionSteps.forEach((step, index) => step.classList.toggle('is-active', index === activeIndex));

    if (reducedMotion) return;

    let laserPosition = 42;
    if (progress < 0.28) {
      laserPosition = lerp(42, 58, progress / 0.28);
    } else if (progress < 0.58) {
      laserPosition = 58;
    } else if (progress < 0.82) {
      laserPosition = lerp(58, 26, (progress - 0.58) / 0.24);
    } else {
      laserPosition = 26;
    }

    if (laserLine) laserLine.style.left = `${laserPosition}%`;
    if (precisionSurface) {
      const scale = progress < 0.5 ? lerp(1, 0.94, progress / 0.5) : lerp(0.94, 1.03, (progress - 0.5) / 0.5);
      const rotateY = progress < 0.5 ? lerp(-5, 5, progress / 0.5) : lerp(5, -7, (progress - 0.5) / 0.5);
      const rotateX = progress < 0.5 ? lerp(3, -2, progress / 0.5) : lerp(-2, 4, (progress - 0.5) / 0.5);
      const gap = lerp(3, 8, clamp(progress / 0.55));
      precisionSurface.style.gap = `${gap}px`;
      precisionSurface.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    }
    if (precisionMarker) {
      precisionMarker.style.transform = `translate3d(${lerp(0, -130, clamp(progress / 0.65))}px, ${lerp(0, 90, clamp(progress / 0.65))}px, 0)`;
    }
    const tileColor = progress > 0.52 ? '#d2ccc2' : '';
    if (tileB) tileB.style.backgroundColor = tileColor;
    if (tileC) tileC.style.backgroundColor = tileColor;
  };

  const renderServices = () => {
    if (!servicesStage || !servicesTrack || !desktopQuery.matches) return;

    const rect = servicesStage.getBoundingClientRect();
    const distance = Math.max(1, servicesStage.offsetHeight - measuredViewportHeight);
    const progress = clamp(-rect.top / distance);
    const x = -servicesDistance * progress;

    servicesTrack.style.transform = `translate3d(${x}px, 0, 0)`;

    if (!reducedMotion) {
      serviceImages.forEach((image) => {
        const panel = image.closest('.service-panel');
        if (!panel) return;
        const panelRect = panel.getBoundingClientRect();
        const panelProgress = clamp((window.innerWidth - panelRect.left) / (window.innerWidth + panelRect.width));
        image.style.transform = `translate3d(${lerp(-7, 7, panelProgress)}%, 0, 0) scale(1.08)`;
      });
    }
  };

  const renderParallax = () => {
    if (reducedMotion) return;

    parallaxItems.forEach((element) => {
      const image = q('img', element);
      if (!image || element.closest('.hero-process-shell')) return;

      const rect = element.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      const amount = Number(element.dataset.parallax || 0.08) * 100;
      const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
      image.style.transform = `translate3d(0, ${lerp(-amount / 2, amount / 2, progress)}%, 0) scale(1.08)`;
    });
  };

  const renderProcess = () => {
    if (processList && processLine) {
      const rect = processList.getBoundingClientRect();
      const start = window.innerHeight * 0.65;
      const total = Math.max(1, rect.height);
      const progress = clamp((start - rect.top) / total);
      processLine.style.transform = `scaleY(${progress})`;
    }

    processSteps.forEach((step) => {
      const rect = step.getBoundingClientRect();
      const active = rect.top < window.innerHeight * 0.68 && rect.bottom > window.innerHeight * 0.38;
      step.classList.toggle('is-active', active);
    });
  };

  const renderChrome = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 32);

    if (globalProgress) {
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      globalProgress.style.transform = `scaleX(${clamp(window.scrollY / max)})`;
    }
  };

  const renderFrame = () => {
    frameRequested = false;
    renderChrome();
    renderHero();
    renderPrecision();
    renderServices();
    renderParallax();
    renderProcess();
  };

  const requestFrame = () => {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(renderFrame);
  };

  const setupRevealObservers = () => {
    if (observersStarted) return;
    observersStarted = true;

    const textItems = qa('.reveal-up, .reveal-lines').filter((item) => !item.closest('.services-head'));
    const imageItems = qa('.image-reveal-scroll');

    if (!gsap || reducedMotion || !('IntersectionObserver' in window)) {
      textItems.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      imageItems.forEach((item) => {
        item.style.clipPath = 'inset(0 0 0 0)';
      });
      return;
    }

    gsap.set(textItems, { opacity: 0, y: 28 });
    gsap.set(imageItems, { clipPath: 'inset(0 0 100% 0)' });

    const textObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        gsap.to(entry.target, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform' });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const image = q('img', entry.target);
        gsap.to(entry.target, { clipPath: 'inset(0 0 0% 0)', duration: 1.05, ease: 'power4.inOut' });
        if (image) gsap.fromTo(image, { scale: 1.16 }, { scale: 1.08, duration: 1.25, ease: 'power3.out' });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

    textItems.forEach((item) => textObserver.observe(item));
    imageItems.forEach((item) => imageObserver.observe(item));
  };

  const setupPointerEffects = () => {
    const cursor = q('.cursor-dot');
    if (!cursor || !gsap || !window.matchMedia('(pointer:fine)').matches) return;

    let visible = false;
    window.addEventListener('pointermove', (event) => {
      if (!visible) {
        visible = true;
        gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }
      gsap.to(cursor, { x: event.clientX, y: event.clientY, duration: 0.2, ease: 'power3.out' });
    }, { passive: true });

    qa('a, button, summary').forEach((element) => {
      element.addEventListener('pointerenter', () => gsap.to(cursor, { scale: 4.2, opacity: 0.45, duration: 0.22 }));
      element.addEventListener('pointerleave', () => gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.22 }));
    });

    qa('.magnetic').forEach((element) => {
      element.addEventListener('pointermove', (event) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(element, { x: x * 0.16, y: y * 0.16, duration: 0.3, ease: 'power3.out' });
      });
      element.addEventListener('pointerleave', () => {
        gsap.to(element, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' });
      });
    });
  };

  const animateHeroIntro = (delay = 0) => {
    if (!gsap || reducedMotion) return;

    gsap.timeline({ delay, defaults: { ease: 'power4.out' } })
      .from('.hero-process-title span > b', { yPercent: 112, duration: 0.95, stagger: 0.09 }, 0)
      .from('.hero-process-title em', { y: 30, opacity: 0, duration: 0.8 }, 0.2)
      .from('.hero-process-kicker', { y: 24, opacity: 0, duration: 0.65 }, 0.18)
      .from('.hero-process-support, .hero-process-cta', { y: 28, opacity: 0, duration: 0.72, stagger: 0.08 }, 0.34)
      .from('.hero-process-steps li, .hero-process-state', { y: 16, opacity: 0, duration: 0.55, stagger: 0.04 }, 0.5);
  };

  const startPage = (animateHero = true) => {
    measureServices();
    setupRevealObservers();
    setupPointerEffects();
    if (animateHero) animateHeroIntro();
    requestFrame();
    body.classList.add('is-page-ready');
  };

  const loader = q('.page-loader');
  const loaderCount = q('.loader-count');
  const hasSeenLoader = sessionStorage.getItem('milimetr-loader') === '1';

  if (!loader || hasSeenLoader || !gsap || reducedMotion) {
    loader?.remove();
    body.classList.remove('is-loading');
    startPage(true);
  } else {
    body.classList.add('is-loading');
    const counter = { value: 0 };

    measureServices();

    gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        sessionStorage.setItem('milimetr-loader', '1');
        loader.remove();
        body.classList.remove('is-loading');
        startPage(false);
      }
    })
      .to(counter, {
        value: 100,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (loaderCount) loaderCount.textContent = String(Math.round(counter.value)).padStart(3, '0');
        }
      }, 0)
      .from('.loader-grid span', { scaleX: 0, duration: 0.65, stagger: { amount: 0.4, from: 'random' } }, 0)
      .from('.loader-word', { yPercent: 105, opacity: 0, duration: 0.72 }, 0.1)
      .to('.loader-word', { yPercent: -105, opacity: 0, duration: 0.6 }, 1)
      .to('.loader-grid span', { scaleX: 0, transformOrigin: 'right center', duration: 0.62, stagger: { amount: 0.3, from: 'random' } }, 0.98)
      .to(loader, { autoAlpha: 0, duration: 0.22 }, 1.4)
      .add(() => animateHeroIntro(0), 1.05);
  }

  window.addEventListener('scroll', requestFrame, { passive: true });

  window.addEventListener('resize', () => {
    const currentWidth = window.innerWidth;
    const widthChanged = Math.abs(currentWidth - lastViewportWidth) > 2;

    if (widthChanged) {
      lastViewportWidth = currentWidth;
      measureServices();
    }

    requestFrame();
  }, { passive: true });

  desktopQuery.addEventListener?.('change', () => {
    measureServices();
    requestFrame();
  });

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      measureServices();
      requestFrame();
    }).catch(() => {});
  }

  window.addEventListener('load', () => {
    measureServices();
    requestFrame();
  }, { once: true });
})();
