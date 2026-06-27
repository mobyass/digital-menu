const btns = document.querySelectorAll('.cat-btn');
const sections = document.querySelectorAll('.menu-section');
const nav = document.querySelector('.cat-nav');

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.cat;
    if (cat === 'all') {
      window.scrollTo({ top: document.querySelector('#menu').offsetTop - nav.offsetHeight, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(`.menu-section[data-cat="${cat}"]`);
    if (target) {
      const offset = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 24;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// Met le bouton actif à jour en scrollant
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cat = entry.target.dataset.cat;
      btns.forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => observer.observe(sec));
