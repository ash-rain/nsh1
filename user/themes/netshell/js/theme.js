/* NetShell Theme - Interactive Effects */
document.addEventListener('DOMContentLoaded', () => {

  /* --- Scroll-triggered nav styling --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* --- Reveal on scroll --- */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* --- Mobile menu toggle --- */
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        const offset = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* --- Animated counter --- */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 60));
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current + suffix;
        }, 25);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => countObserver.observe(el));

  /* --- Terminal typing effect --- */
  const terminalLines = document.querySelectorAll('.terminal__line[data-type]');
  terminalLines.forEach((line, i) => {
    const text = line.dataset.type;
    line.innerHTML = '<span class="terminal__prompt">$ </span><span class="terminal__typed"></span>';
    const typed = line.querySelector('.terminal__typed');
    setTimeout(() => {
      let charIdx = 0;
      const typeInterval = setInterval(() => {
        if (charIdx < text.length) {
          typed.textContent += text[charIdx];
          charIdx++;
        } else {
          clearInterval(typeInterval);
          if (i === terminalLines.length - 1) {
            typed.insertAdjacentHTML('afterend', '<span class="terminal__cursor"></span>');
          }
        }
      }, 40);
    }, i * 1500 + 1000);
  });

});
