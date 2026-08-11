(() => {
  const body = document.body;
  const btn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => body.classList.remove('menu-open')));
  }

  const toast = document.querySelector('.toast');
  function showToast(msg){ if(!toast) return; toast.textContent = msg; toast.classList.add('show'); clearTimeout(window.__toastT); window.__toastT=setTimeout(()=>toast.classList.remove('show'),2200); }
  const links = (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.projectLinks) || {};
  document.querySelectorAll('[data-project]').forEach(a => {
    const key = a.dataset.project;
    if (links[key]) a.href = links[key];
    else a.addEventListener('click', e => { e.preventDefault(); showToast('Case study link is being added.'); });
  });

  document.querySelectorAll('.protected-media').forEach(img => {
    img.draggable = false;
    img.addEventListener('dragstart', e => e.preventDefault());
    img.addEventListener('contextmenu', e => e.preventDefault());
  });
})();
