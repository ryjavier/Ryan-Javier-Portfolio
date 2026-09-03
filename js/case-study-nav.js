/* Vertical section bubble nav — scroll spy */
(function initSectionNav() {
  const bubbles = document.querySelectorAll('.section-bubble[data-section]');
  if (!bubbles.length) return;

  const sectionIds = [...bubbles].map((link) => link.dataset.section);

  function updateActiveSection() {
    let current = sectionIds[0] || '';
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    bubbles.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();
})();
