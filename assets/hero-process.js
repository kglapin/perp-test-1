(() => {
  'use strict';

  const shell = document.querySelector('[data-home-process-hero]');
  if (!shell) return;

  const hero = shell.querySelector('.hero-process');
  const result = shell.querySelector('[data-home-result-reveal]');
  const divider = shell.querySelector('[data-home-divider]');
  const stateLabel = shell.querySelector('[data-home-state-label]');
  const stateBar = shell.querySelector('[data-home-state-bar]');
  const steps = [...shell.querySelectorAll('.hero-process-steps li')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  const labels = ['POMIAR', 'UKŁAD', 'MONTAŻ', 'EFEKT'];

  const renderProgress = (progress) => {
    const value = Math.max(0, Math.min(1, progress));
    const reveal = 100 - value * 100;
    const activeIndex = Math.min(steps.length - 1, Math.floor(value * steps.length));

    if (result) result.style.clipPath = `inset(0 0 0 ${reveal}%)`;
    if (divider) divider.style.left = `${reveal}%`;
    if (stateBar) stateBar.style.transform = `scaleX(${value})`;
    if (stateLabel) stateLabel.textContent = `${labels[activeIndex]} / ${String(Math.round(value * 100)).padStart(2, '0')}%`;

    steps.forEach((step, index) => step.classList.toggle('is-active', index === activeIndex));
    document.body.classList.toggle('is-process-hero-active', value < 0.995);
  };

  const startIntro = () => {
    if (!gsap || reduced || hero.dataset.introStarted === 'true') return;
    hero.dataset.introStarted = 'true';

    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .from('.hero-process-title span > b', { yPercent: 112, duration: 1.05, stagger: 0.1 }, 0)
      .from('.hero-process-kicker', { y: 26, opacity: 0, duration: 0.72 }, 0.18)
      .from('.hero-process-support, .hero-process-cta', { y: 32, opacity: 0, duration: 0.8, stagger: 0.08 }, 0.36)
      .from('.hero-process-steps li, .hero-process-state', { y: 18, opacity: 0, duration: 0.62, stagger: 0.045 }, 0.54)
      .from('.hero-process-image--work img', { scale: 1.22, duration: 1.5, ease: 'power3.out' }, 0);
  };

  renderProgress(0);

  if (!gsap || !ScrollTrigger || reduced) {
    const updateFallback = () => {
      const rect = shell.getBoundingClientRect();
      const distance = Math.max(1, shell.offsetHeight - window.innerHeight);
      renderProgress(Math.max(0, Math.min(1, -rect.top / distance)));
    };
    updateFallback();
    window.addEventListener('scroll', updateFallback, { passive: true });
    return;
  }

  const waitForLoader = () => {
    if (!document.body.classList.contains('is-loading')) {
      startIntro();
      return;
    }
    const observer = new MutationObserver(() => {
      if (!document.body.classList.contains('is-loading')) {
        observer.disconnect();
        startIntro();
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
  };

  waitForLoader();

  ScrollTrigger.create({
    trigger: shell,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.55,
    invalidateOnRefresh: true,
    onUpdate: (self) => renderProgress(self.progress),
    onEnter: () => document.body.classList.add('is-process-hero-active'),
    onEnterBack: () => document.body.classList.add('is-process-hero-active'),
    onLeave: () => document.body.classList.remove('is-process-hero-active')
  });

  gsap.to('.hero-process-image--work img', {
    yPercent: 7,
    scale: 1.12,
    ease: 'none',
    scrollTrigger: { trigger: shell, start: 'top top', end: 'bottom bottom', scrub: true }
  });

  gsap.fromTo('.hero-process-image--result img',
    { yPercent: -4, scale: 1.12 },
    {
      yPercent: 4,
      scale: 1.04,
      ease: 'none',
      scrollTrigger: { trigger: shell, start: 'top top', end: 'bottom bottom', scrub: true }
    }
  );

  gsap.to('.hero-process-copy', {
    yPercent: 7,
    opacity: 0.28,
    ease: 'none',
    scrollTrigger: { trigger: shell, start: '55% top', end: 'bottom bottom', scrub: true }
  });
})();
