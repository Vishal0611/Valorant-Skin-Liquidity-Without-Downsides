// ===== Header scrolled state + reading progress bar =====
(function () {
  const header = document.getElementById('site-header');
  const progress = document.getElementById('progress');
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 8);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Active TOC via IntersectionObserver (scroll-spy) =====
(function () {
  const links = Array.from(document.querySelectorAll('.toc a'));
  if (!links.length) return;
  const map = {};
  links.forEach((a) => {
    const id = a.getAttribute('href').slice(1);
    const sec = document.getElementById(id);
    if (sec) map[id] = a;
  });
  const sections = Object.keys(map).map((id) => document.getElementById(id));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove('active'));
          const a = map[e.target.id];
          if (a) a.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );
  sections.forEach((s) => io.observe(s));
})();

// ===== Quiet reveal on scroll (subtle; respects reduced-motion) =====
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.06 }
  );
  els.forEach((el) => io.observe(el));
})();
