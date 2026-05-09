(() => {
  const root = document.documentElement;

  // Theme toggle with localStorage persistence + system preference
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Nav border on scroll
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Animated stat counters
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1400;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      el.textContent = Math.round(target * ease(t)).toLocaleString();
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // Reveal-on-scroll + counter trigger via IntersectionObserver
  const targets = document.querySelectorAll(
    '.section, .job-card, .skill-card, .contact-link, .hero-stats, .about-points li'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('hero-stats')) {
          counters.forEach(animateCount);
        }
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => io.observe(el));

  // Year stamp in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
