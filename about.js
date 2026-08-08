document.addEventListener('DOMContentLoaded', () => {
  const header     = document.querySelector('header');
  const openBtn    = document.querySelector('.header-icons .menu-open');
  const closeBtn   = document.querySelector('.header-icons .menu-close');
  const navLinks   = document.querySelectorAll('header nav ul li a');

  if (!header || !openBtn || !closeBtn) return;

  function openMenu() {
    header.classList.add('nav-open');
    openBtn.hidden = true;
    closeBtn.hidden = false;
  }

  function closeMenu() {
    header.classList.remove('nav-open');
    openBtn.hidden = false;
    closeBtn.hidden = true;
  }

  openBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Ferme le menu si on clique sur un lien 
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Ferme le menu si l'écran repasse en desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const regionRows   = document.querySelectorAll('.region-row');
  const regionShapes = document.querySelectorAll('.region-shape');
  const cityDots      = document.querySelectorAll('.city-dot');

  // Sélectionner une région 
  function selectRegion(regionName) {
    regionRows.forEach(row => {
      const isMatch = row.dataset.region === regionName;
      row.classList.toggle('active', isMatch);
      row.querySelector('.region-row-head').setAttribute('aria-expanded', isMatch);
      const chevron = row.querySelector('.region-chevron i');
      chevron.classList.toggle('fa-chevron-down', isMatch);
      chevron.classList.toggle('fa-chevron-right', !isMatch);
    });

    regionShapes.forEach(shape => {
      shape.classList.toggle('dimmed', shape.dataset.region !== regionName);
    });

    cityDots.forEach(dot => {
      dot.classList.toggle('inactive-region', dot.dataset.region !== regionName);
    });
  }

  // ─── Clic sur une ligne de la liste ───
  regionRows.forEach(row => {
    row.querySelector('.region-row-head').addEventListener('click', () => {
      selectRegion(row.dataset.region);
    });
  });

  // ─── Clic sur une forme de la carte ───
  regionShapes.forEach(shape => {
    shape.addEventListener('click', () => selectRegion(shape.dataset.region));
    shape.addEventListener('mouseenter', () => shape.classList.add('hovered'));
    shape.addEventListener('mouseleave', () => shape.classList.remove('hovered'));
  });

  // ─── Survol d'un partenaire → activation du point de ville ───
  document.querySelectorAll('.region-partners li').forEach(li => {
    const cityKey = li.dataset.city;
    const dot = document.querySelector(`.city-dot[data-city="${cityKey}"]`);
    if (!dot) return;

    const activate   = () => dot.classList.add('active');
    const deactivate = () => dot.classList.remove('active');

    li.addEventListener('mouseenter', activate);
    li.addEventListener('mouseleave', deactivate);
    li.addEventListener('focus', activate);
    li.addEventListener('blur', deactivate);
  });

  // ─── Clic sur un point de ville → surligne le partenaire correspondant ───
  cityDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const li = document.querySelector(`.region-partners li[data-city="${dot.dataset.city}"]`);
      if (li) {
        selectRegion(dot.dataset.region);
        li.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        li.focus();
      }
    });
  });

  // ─── État initial : Maritime actif ───
  selectRegion('maritime');
});