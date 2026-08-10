(() => {
  const cfg = window.PORTFOLIO_CONFIG || {};
  const menuBtn = document.querySelector('.menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click',()=>{const open=mobileMenu.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
    mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
  }
  const backdrop = document.querySelector('.modal-backdrop');
  const close = document.querySelector('.close-modal');
  function openModal(){ if(backdrop){backdrop.classList.add('open');document.body.style.overflow='hidden';} }
  function closeModal(){ if(backdrop){backdrop.classList.remove('open');document.body.style.overflow='';} }
  document.querySelectorAll('[data-connect]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();openModal();}));
  if(close) close.addEventListener('click',closeModal);
  if(backdrop) backdrop.addEventListener('click',e=>{if(e.target===backdrop) closeModal();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});
  const links={whatsapp:cfg.whatsapp,instagram:cfg.instagram};
  Object.entries(links).forEach(([k,v])=>{
    document.querySelectorAll(`[data-connect-link="${k}"]`).forEach(a=>{
      if(v){
        a.href=v;
        a.classList.remove('connect-unavailable');
        a.removeAttribute('aria-disabled');
        a.target='_blank';
        a.rel='noopener noreferrer';
      }else{
        a.href='#';
        a.classList.add('connect-unavailable');
        a.setAttribute('aria-disabled','true');
        a.addEventListener('click',e=>{
          e.preventDefault();
          alert('Instagram link is being updated. Please connect with me on WhatsApp for now.');
        });
      }
    });
  });
  document.querySelectorAll('[data-project-key]').forEach(a=>{
    const key=a.getAttribute('data-project-key');const url=cfg.projectLinks && cfg.projectLinks[key];
    if(url){a.href=url;a.target='_blank';a.rel='noopener noreferrer';}
    else{a.href='#';a.classList.add('pending');a.addEventListener('click',e=>{e.preventDefault();alert('Case study link will be added before final launch.');});}
  });
})();
