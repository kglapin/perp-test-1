(()=>{
  const hero=document.querySelector('.hero');
  if(!hero||hero.querySelector('.hero-ripple-layer')) return;
  const button=[...hero.querySelectorAll('a.button')].find(a=>/book a free site survey/i.test(a.textContent||''));
  if(!button) return;

  button.classList.add('hero-survey-cta');
  const layer=document.createElement('div');
  layer.className='hero-ripple-layer';
  layer.setAttribute('aria-hidden','true');
  layer.innerHTML='<span class="hero-ripple"></span>'.repeat(6);
  hero.insertBefore(layer,hero.firstChild);

  const positionRipple=()=>{
    const heroRect=hero.getBoundingClientRect();
    const btnRect=button.getBoundingClientRect();
    const x=btnRect.left-heroRect.left+btnRect.width/2;
    const y=btnRect.top-heroRect.top+btnRect.height/2;

    const rx=btnRect.width/2;
    const ry=btnRect.height/2;
    const corners=[[0,0],[heroRect.width,0],[0,heroRect.height],[heroRect.width,heroRect.height]];
    const scaleToCorner=Math.max(...corners.map(([cx,cy])=>{
      const dx=(cx-x)/rx;
      const dy=(cy-y)/ry;
      return Math.hypot(dx,dy);
    }));

    layer.style.setProperty('--ripple-x',`${x}px`);
    layer.style.setProperty('--ripple-y',`${y}px`);
    layer.style.setProperty('--ripple-w',`${btnRect.width}px`);
    layer.style.setProperty('--ripple-h',`${btnRect.height}px`);
    layer.style.setProperty('--ripple-scale',(scaleToCorner*.96).toFixed(3));
  };

  positionRipple();
  window.addEventListener('load',positionRipple);
  window.addEventListener('resize',positionRipple,{passive:true});
  if('ResizeObserver' in window){
    const ro=new ResizeObserver(positionRipple);
    ro.observe(button);
    ro.observe(hero);
  }
})();
