(()=>{
  const proof=document.querySelector('.proof-strip');
  if(!proof) return;

  proof.innerHTML=`
    <div class="proof-strip__layout">
      <div class="proof-strip__intro">
        <span class="eyebrow" data-index="01">Working standard</span>
        <h2>Four checkpoints before the work is complete.</h2>
        <p>These are the practical controls that keep the job understandable from survey through to handover — separate from the customer feedback above.</p>
      </div>
      <div class="proof-strip__grid">
        <div class="proof-strip__item"><span class="proof-strip__n">01</span><strong>Survey before specification</strong><span>The building is assessed before an insulation approach is proposed.</span><i class="proof-strip__icon fa-solid fa-magnifying-glass" aria-hidden="true"></i></div>
        <div class="proof-strip__item"><span class="proof-strip__n">02</span><strong>Ventilation considered</strong><span>Airflow and moisture strategy form part of the decision, not an afterthought.</span><i class="proof-strip__icon fa-solid fa-wind" aria-hidden="true"></i></div>
        <div class="proof-strip__item"><span class="proof-strip__n">03</span><strong>Written scope</strong><span>The area, preparation and intended system should be clear before installation.</span><i class="proof-strip__icon fa-solid fa-file-lines" aria-hidden="true"></i></div>
        <div class="proof-strip__item"><span class="proof-strip__n">04</span><strong>Handover documentation</strong><span>The finished job should be understandable after the installers leave.</span><i class="proof-strip__icon fa-solid fa-clipboard-check" aria-hidden="true"></i></div>
      </div>
    </div>`;

  const renumberKickers=()=>{
    [...document.querySelectorAll('.eyebrow[data-index]')].forEach((el,index)=>{
      el.dataset.index=String(index).padStart(2,'0');
    });
  };
  renumberKickers();
  requestAnimationFrame(renumberKickers);
})();