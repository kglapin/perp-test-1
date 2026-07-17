(() => {
  'use strict';

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const q = (selector, scope = document) => scope.querySelector(selector);
  const qa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  if (!gsap || reduced) return;
  if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const videoHero = q('[data-video-hero]');
  if (videoHero) {
    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro
      .from('.demo-header', { yPercent: -100, opacity: 0, duration: .9 })
      .from('.hero-kicker', { y: 24, opacity: 0, duration: .7 }, '-=.45')
      .from('.kinetic-title b', { yPercent: 110, rotate: 2, duration: 1.15, stagger: .11 }, '-=.55')
      .from('.video-bottom-copy', { y: 24, opacity: 0, duration: .75 }, '-=.5')
      .from('.shot-list span, .video-measure', { opacity: 0, x: 18, duration: .55, stagger: .06 }, '-=.55');

    gsap.to('.hero-video', {
      scale: 1.18,
      yPercent: 5,
      ease: 'none',
      scrollTrigger: { trigger: videoHero, start: 'top top', end: 'bottom top', scrub: 1.2 }
    });
    gsap.to('.video-copy', {
      yPercent: -16,
      opacity: .3,
      ease: 'none',
      scrollTrigger: { trigger: videoHero, start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.scan-line', { left: '72%', duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    const shots = qa('.shot-list span');
    let active = 0;
    window.setInterval(() => {
      shots.forEach((item, index) => item.classList.toggle('is-active', index === active));
      active = (active + 1) % shots.length;
    }, 1900);
  }

  const collageHero = q('[data-collage-hero]');
  if (collageHero) {
    const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
    intro
      .from('.demo-header', { yPercent: -100, opacity: 0, duration: .85 })
      .from('.collage-copy .hero-kicker', { y: 18, opacity: 0, duration: .6 }, '-=.35')
      .from('.collage-copy h1', { y: 48, opacity: 0, duration: 1 }, '-=.35')
      .from('.collage-image--main', { clipPath: 'inset(100% 0 0 0)', scale: 1.08, duration: 1.25 }, '-=.75')
      .from('.collage-image--detail', { x: -70, y: -40, opacity: 0, rotate: -4, duration: .85 }, '-=.65')
      .from('.collage-image--process', { x: 70, y: 40, opacity: 0, rotate: 4, duration: .85 }, '-=.78')
      .from('.collage-lead, .collage-bottom, .floating-coordinate, .collage-cross', { opacity: 0, y: 18, duration: .6, stagger: .06 }, '-=.52');

    const root = q('[data-depth-root]');
    const layers = qa('[data-depth]', root);
    const move = (event) => {
      const rect = root.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - .5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - .5) * 2;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth || 1);
        gsap.to(layer, { x: x * 14 * depth, y: y * 10 * depth, rotateY: x * 1.5, rotateX: -y * 1.2, duration: .9, ease: 'power3.out', overwrite: true });
      });
    };
    const reset = () => layers.forEach((layer) => gsap.to(layer, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: 1.2, ease: 'power3.out' }));
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', reset);

    layers.forEach((layer, index) => {
      gsap.to(layer, {
        yPercent: index % 2 ? -14 : 9,
        ease: 'none',
        scrollTrigger: { trigger: collageHero, start: 'top top', end: 'bottom top', scrub: 1.1 }
      });
    });
    gsap.to('.collage-copy', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: { trigger: collageHero, start: 'top top', end: 'bottom top', scrub: 1 }
    });
  }

  const processRoot = q('[data-process-hero]');
  if (processRoot && ScrollTrigger) {
    const result = q('[data-result-reveal]');
    const divider = q('[data-divider]');
    const label = q('[data-state-label]');
    const bar = q('[data-state-bar]');
    const steps = qa('.process-steps li');

    gsap.timeline({ defaults: { ease: 'power4.out' } })
      .from('.demo-header', { yPercent: -100, opacity: 0, duration: .85 })
      .from('.process-copy .hero-kicker', { y: 18, opacity: 0, duration: .6 }, '-=.35')
      .from('.process-copy h1', { y: 50, opacity: 0, duration: 1 }, '-=.4')
      .from('.process-copy > p:last-child, .process-steps, .process-state', { opacity: 0, y: 20, duration: .7, stagger: .08 }, '-=.45');

    ScrollTrigger.create({
      trigger: processRoot,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        const percent = Math.round(p * 100);
        result.style.clipPath = `inset(0 0 0 ${100 - percent}%)`;
        divider.style.left = `${percent}%`;
        label.textContent = p < .92 ? `PROCES / ${String(percent).padStart(2, '0')}%` : 'EFEKT / 100%';
        bar.style.transform = `scaleX(${p})`;
        const step = Math.min(3, Math.floor(p * 4));
        steps.forEach((item, index) => item.classList.toggle('is-active', index === step));
      }
    });

    gsap.to('.process-copy', {
      xPercent: -7,
      opacity: .45,
      ease: 'none',
      scrollTrigger: { trigger: processRoot, start: 'top top', end: 'bottom bottom', scrub: 1 }
    });
  }
})();
