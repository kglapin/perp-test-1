(()=>{
  const $=(s,root=document)=>root.querySelector(s);
  const $$=(s,root=document)=>[...root.querySelectorAll(s)];

  const reviewData=[
    ['From the survey to the finished job, every step was explained clearly.','Aoife M.','Kildare'],
    ['The attic was left tidy and the whole job felt properly planned from the start.','Conor B.','Cork'],
    ['We appreciated that the roof was checked carefully before anything was recommended.','Sarah T.','Galway'],
    ['Clear quote, straightforward installation and no surprises along the way.','Michael R.','Meath'],
    ['The difference in comfort upstairs was noticeable very quickly.','Emma D.','Wicklow'],
    ['Professional team, good communication and a clean finish.','Patrick K.','Limerick']
  ];
  const reviewCards=reviewData.map(([q,n,l])=>`<article class="review-marquee__item"><p class="review-marquee__quote">“${q}”</p><div class="review-marquee__author"><span>${n}</span><span>${l}</span></div></article>`).join('');
  const reviews=`<section class="review-marquee" aria-label="Customer feedback"><div class="review-marquee__viewport"><div class="review-marquee__track"><div class="review-marquee__set">${reviewCards}</div><div class="review-marquee__set" aria-hidden="true">${reviewCards}</div></div></div></section>`;

  const hero=$('.hero');
  if(hero && !$('.review-marquee')) hero.insertAdjacentHTML('afterend',reviews);

  const proof=`<section class="proof-strip" aria-label="Working standards"><div class="proof-strip__grid">
    <div class="proof-strip__item"><span class="proof-strip__n">01</span><strong>Survey before specification</strong><span>The building is assessed before an insulation approach is proposed.</span></div>
    <div class="proof-strip__item"><span class="proof-strip__n">02</span><strong>Ventilation considered</strong><span>Airflow and moisture strategy form part of the decision, not an afterthought.</span></div>
    <div class="proof-strip__item"><span class="proof-strip__n">03</span><strong>Written scope</strong><span>The area, preparation and intended system should be clear before installation.</span></div>
    <div class="proof-strip__item"><span class="proof-strip__n">04</span><strong>Handover documentation</strong><span>The finished job should be understandable after the installers leave.</span></div>
  </div></section>`;
  if($('.review-marquee') && !$('.proof-strip')) $('.review-marquee').insertAdjacentHTML('afterend',proof);

  const suitability=`<section class="suitability" aria-labelledby="suitability-title"><div class="container suitability__grid">
    <div class="suitability__statement reveal">
      <span class="eyebrow eyebrow--light" data-index="01A">Suitability first</span>
      <h2 class="section-title" id="suitability-title">Sometimes, spray foam isn’t the answer.</h2>
      <p>If the roof condition, moisture strategy or ventilation detail is unresolved, the correct next step may be to fix those issues first — or choose a different insulation approach.</p>
      <div class="suitability__cta"><a class="button button--primary" href="#quote">Book a site survey <span aria-hidden="true">↗</span></a></div>
    </div>
    <div class="suitability__list">
      <div class="suitability__row reveal"><b>01</b><div><h3>Roof condition comes first.</h3><p>Defects, leaks or unsuitable substrates should be resolved before an insulation layer is treated as the solution.</p></div></div>
      <div class="suitability__row reveal"><b>02</b><div><h3>The ventilation path has to make sense.</h3><p>Required airflow cannot simply be covered over. The roof build-up and ventilation strategy need to work together.</p></div></div>
      <div class="suitability__row reveal"><b>03</b><div><h3>Moisture needs a cause, not a cover-up.</h3><p>Visible damp or condensation symptoms should be understood before the specification is finalised.</p></div></div>
      <div class="suitability__row reveal"><b>04</b><div><h3>The system has to suit the construction.</h3><p>Material choice, application zone and detailing depend on the actual building — not a generic “spray everywhere” rule.</p></div></div>
    </div>
  </div></section>`;
  const problem=$('.problem');
  if(problem && !$('.suitability')) problem.insertAdjacentHTML('afterend',suitability);

  const scenarios=`<section class="scenarios" aria-labelledby="scenarios-title"><div class="container">
    <div class="scenarios__head reveal"><div><span class="eyebrow" data-index="04A">Representative scenarios</span><h2 class="section-title" id="scenarios-title">Three buildings. Three different decisions.</h2></div><p class="section-copy">These are realistic Irish project scenarios built around common property types. They show how the scope can change after a survey; they are not presented as completed ThermalForm projects.</p></div>
    <div class="scenarios__grid">
      <article class="scenario reveal"><div class="scenario__media"><img src="https://images.unsplash.com/photo-1758448756207-54505680d130?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=1400" alt="Detached house used to illustrate a representative retrofit scenario"></div><span class="scenario__tag">Representative scenario · retrofit</span><h3>1980s detached house</h3><div class="scenario__meta"><div><span>Location type</span><strong>Commuter county</strong></div><div><span>Roof / attic area</span><strong>c. 95–120 m²</strong></div><div><span>Existing condition</span><strong>Older insulation at ceiling level</strong></div></div><p class="scenario__decision"><b>Survey decision</b>Check roof condition, eaves ventilation and whether the most sensible upgrade remains at ceiling level or moves to the rafter zone.</p></article>
      <article class="scenario reveal"><div class="scenario__media"><img src="https://images.unsplash.com/photo-1753717202685-47704db818b9?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=1400" alt="Attic used to illustrate a representative semi-detached house scenario"></div><span class="scenario__tag">Representative scenario · existing attic</span><h3>1970s semi-detached home</h3><div class="scenario__meta"><div><span>Location type</span><strong>Urban / suburban</strong></div><div><span>Attic area</span><strong>c. 65–90 m²</strong></div><div><span>Existing condition</span><strong>Patchy insulation + service penetrations</strong></div></div><p class="scenario__decision"><b>Survey decision</b>Separate simple insulation-depth issues from junction and air-leakage problems before deciding whether spray foam adds value.</p></article>
      <article class="scenario reveal"><div class="scenario__media"><img src="https://images.unsplash.com/photo-1676802037786-3697d60497ae?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=1400" alt="Timber frame construction used to illustrate a representative extension scenario"></div><span class="scenario__tag">Representative scenario · new construction</span><h3>Timber-frame extension</h3><div class="scenario__meta"><div><span>Project type</span><strong>New roof section</strong></div><div><span>Insulated area</span><strong>c. 50–75 m²</strong></div><div><span>Key issue</span><strong>Junctions + service routes</strong></div></div><p class="scenario__decision"><b>Survey decision</b>Confirm compatibility of the chosen insulation system with the roof build-up, membrane strategy and service detailing before application.</p></article>
    </div>
    <p class="scenarios__note">Areas are illustrative ranges for layout and decision-making examples. Final scope, specification and suitability must come from the actual building survey.</p>
  </div></section>`;
  const applications=$('.applications');
  if(applications && !$('.scenarios')) applications.insertAdjacentHTML('afterend',scenarios);

  const trust=$('.trust-section');
  if(trust){
    const h2=$('.section-title',trust); if(h2) h2.textContent='A good installation should still make sense after the van leaves.';
    const copy=$('.section-copy',trust); if(copy) copy.textContent='The handover should make it clear what was specified, what was installed and which building details were considered.';
    const rows=$$('.trust-row',trust);
    const content=[
      ['01','Written scope','The intended area, preparation requirements and agreed specification are set out before installation.'],
      ['02','Product / system reference','The handover identifies the insulation system used rather than leaving the material undocumented.'],
      ['03','Installation record','Photos and project notes create a usable record of what was completed.'],
      ['04','Ventilation & moisture notes','Relevant roof, airflow and moisture considerations are recorded where they affect the installation.'],
      ['05','Handover & warranty terms','The client should leave with the documentation, care information and warranty terms that apply to the project.']
    ];
    rows.forEach((row,i)=>{if(!content[i])return;const [n,t,p]=content[i];row.innerHTML=`<span class="n">${n}</span><h3>${t}</h3><p>${p}</p>`});
  }

  const factors=`<section class="quote-factors" aria-labelledby="quote-factors-title"><div class="container">
    <div class="quote-factors__head reveal"><div><span class="eyebrow" data-index="07A">Pricing logic</span><h2 class="section-title" id="quote-factors-title">What determines your quote?</h2></div><p class="section-copy">A reliable quote follows the building. Four variables usually change the scope more than a generic €/m² headline.</p></div>
    <div class="quote-factors__grid">
      <article class="quote-factor reveal"><span class="quote-factor__n">01</span><h3>Area</h3><p>The actual roof, attic or wall area that needs treatment — not just the floor area of the house.</p></article>
      <article class="quote-factor reveal"><span class="quote-factor__n">02</span><h3>Construction</h3><p>Roof type, junction complexity, framing and the location of the insulation layer all affect the specification.</p></article>
      <article class="quote-factor reveal"><span class="quote-factor__n">03</span><h3>Preparation</h3><p>Access, existing insulation, substrate condition and protection work can change the installation scope.</p></article>
      <article class="quote-factor reveal"><span class="quote-factor__n">04</span><h3>Specification</h3><p>The selected system, target depth and detailing should follow the property rather than a one-size-fits-all price.</p></article>
    </div>
    <div class="quote-factors__footer"><strong>No generic price should be used to specify a building.</strong><span>The survey establishes the scope first; the quote follows.</span></div>
  </div></section>`;
  const faq=$('.faq');
  if(faq && !$('.quote-factors')) faq.insertAdjacentHTML('beforebegin',factors);

  const faqList=$('.faq-list');
  if(faqList && !$('#faq-seai')){
    faqList.insertAdjacentHTML('beforeend',`<div class="faq-item" id="faq-seai"><button class="faq-q" aria-expanded="false"><span>Can I use an SEAI grant for attic insulation?</span><span class="faq-icon"></span></button><div class="faq-a"><div><p>SEAI currently offers fixed grants for eligible attic-insulation upgrades. The property, contractor and measure must meet the scheme rules, and grant approval needs to be in place before work starts. Do not assume a specific spray-foam system qualifies — confirm eligibility before booking the work.</p></div></div></div>`);
    const btn=$('#faq-seai .faq-q');
    if(btn) btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');const open=btn.getAttribute('aria-expanded')==='true';$$('.faq-item').forEach(other=>{if(other!==item){other.classList.remove('open');const q=$('.faq-q',other);if(q)q.setAttribute('aria-expanded','false')}});item.classList.toggle('open',!open);btn.setAttribute('aria-expanded',String(!open))});
  }

  const step3=$('.form-step[data-step="3"] .fields');
  if(step3 && !$('#projectPhotos')){
    step3.insertAdjacentHTML('beforeend',`<div class="field photo-upload"><span style="font-size:.75rem;font-weight:700">Photos of the attic or roof (optional)</span><input id="projectPhotos" type="file" accept="image/*" multiple><label for="projectPhotos"><span class="photo-upload__copy"><strong>Add photos from your phone or computer</strong><span>Up to 5 images. Useful for access, existing insulation and visible roof details.</span></span><span class="photo-upload__action">Choose files ↗</span></label><div class="photo-upload__status" id="photoUploadStatus">No files selected.</div></div>`);
    const input=$('#projectPhotos'),status=$('#photoUploadStatus');
    input?.addEventListener('change',()=>{const count=Math.min(input.files?.length||0,5);status.textContent=count?`${count} photo${count===1?'':'s'} selected.`:'No files selected.';if((input.files?.length||0)>5)status.textContent='Please keep the selection to 5 photos or fewer.'});
  }
})();
