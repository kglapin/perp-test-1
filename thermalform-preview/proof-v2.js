(()=>{
  const proof=document.querySelector('.proof-strip');
  if(!proof)return;

  const grid=proof.querySelector('.proof-strip__grid');
  if(grid&&!proof.querySelector('.proof-strip__layout')){
    const layout=document.createElement('div');
    layout.className='proof-strip__layout';
    const intro=document.createElement('div');
    intro.className='proof-strip__intro';
    intro.innerHTML='<span class="eyebrow" data-index="01">Working standard</span><h2>Four checkpoints before the work is complete.</h2><p>These are the practical controls that keep the job understandable from survey through to handover — separate from the customer feedback above.</p>';
    proof.insertBefore(layout,grid);
    layout.append(intro,grid);
  }

  const iconClasses=['fa-magnifying-glass','fa-wind','fa-file-lines','fa-clipboard-check'];
  [...proof.querySelectorAll('.proof-strip__item')].forEach((item,index)=>{
    if(item.querySelector('.proof-strip__icon'))return;
    const icon=document.createElement('i');
    icon.className=`proof-strip__icon fa-solid ${iconClasses[index]||'fa-check'}`;
    icon.setAttribute('aria-hidden','true');
    item.appendChild(icon);
  });

  const renumberKickers=()=>{
    [...document.querySelectorAll('.eyebrow[data-index]')].forEach((el,index)=>{
      el.dataset.index=String(index).padStart(2,'0');
    });
  };
  renumberKickers();
  requestAnimationFrame(renumberKickers);
})();

(()=>{
  if(!document.querySelector('link[data-hero-ripple]')){
    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href='hero-ripple.css?v=2';
    link.dataset.heroRipple='true';
    document.head.appendChild(link);
  }
  if(!document.querySelector('script[data-hero-ripple]')){
    const script=document.createElement('script');
    script.src='hero-ripple.js?v=2';
    script.dataset.heroRipple='true';
    document.body.appendChild(script);
  }
})();