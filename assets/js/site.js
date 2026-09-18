document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.main-nav a, .site-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const normalizedHref = href.replace(/\\/g, '/');
    const isRoot = currentPath === '' || currentPath === 'index.html';
    const isActive = normalizedHref === currentPath || (isRoot && normalizedHref === 'index.html') || (isRoot && normalizedHref === '../index.html');
    if (isActive) {
      link.classList.add('active');
    }
  });

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const targetId = btn.getAttribute('data-scroll');
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
