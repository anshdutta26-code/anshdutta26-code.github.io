(() => {
  const body = document.body;
  const btn = document.querySelector('.menu-btn');
  const menu = document.querySelector('.mobile-menu');

  // Keep the Blogs section visible in the primary navigation across legacy pages
  // without forcing a markup rewrite on every existing page.
  const ensureBlogsLink = (nav) => {
    if (!nav || nav.querySelector('a[href="/blogs/"]')) return;
    const link = document.createElement('a');
    link.href = '/blogs/';
    link.textContent = 'Blogs';
    if (window.location.pathname.startsWith('/blogs/')) link.classList.add('active');
    const contact = nav.querySelector('a[href="/contact/"]');
    if (contact) nav.insertBefore(link, contact);
    else nav.appendChild(link);
  };
  ensureBlogsLink(document.querySelector('.site-nav'));
  ensureBlogsLink(menu);

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

  // Footer "Let's Connect" menu. It exists on every page except Contact.
  const connectTrigger = document.querySelector('.connect-trigger');
  const connectPopover = document.querySelector('.connect-popover');
  if (connectTrigger && connectPopover) {
    const setConnectOpen = (open) => {
      connectPopover.classList.toggle('is-open', open);
      connectPopover.setAttribute('aria-hidden', String(!open));
      connectTrigger.setAttribute('aria-expanded', String(open));
    };
    connectTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      setConnectOpen(!connectPopover.classList.contains('is-open'));
    });
    connectPopover.addEventListener('click', e => e.stopPropagation());
    document.addEventListener('click', () => setConnectOpen(false));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setConnectOpen(false); });
  }
})();

// Optional GA4 loader: activate by setting window.PORTFOLIO_CONFIG.gaMeasurementId to your G-XXXXXXXXXX ID.
(function(){
  const id=window.PORTFOLIO_CONFIG&&window.PORTFOLIO_CONFIG.gaMeasurementId;
  if(!id||!/^G-[A-Z0-9]+$/i.test(id)) return;
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){dataLayer.push(arguments)};
  gtag('js',new Date());
  gtag('config',id,{anonymize_ip:true});
  const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);document.head.appendChild(s);
})();
