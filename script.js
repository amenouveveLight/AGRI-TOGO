
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

document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.dot');

  if (!slides.length) return;

  let current = 0;
  let timer   = null;
  const DELAY = 5000; // durée d'affichage de chaque slide (ms)

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current] && dots[current].classList.remove('active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('active');
    dots[current] && dots[current].classList.add('active');
  }

  function next() {
    goTo(current + 1);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(next, DELAY);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  // Clic sur un point = va directement à la slide correspondante
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      const index = parseInt(dot.dataset.index, 10);
      goTo(index);
      startAutoplay(); // relance le minuteur après un choix manuel
    });
  });

  // Pause au survol, reprise à la sortie
  const carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
});


(function() {
  // ─── Références DOM ───────────────────────────────────────────
  const form   = document.getElementById('contactForm');
  const email  = document.getElementById('email');
  const tel    = document.getElementById('tel');
  const notes  = document.getElementById('notes');
  const submitBtn = document.getElementById('submitBtn')

  // ─── Regex ────────────────────────────────────────────────────
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRegex   = /^[\d\s\+\-\(\)]{7,20}$/;

  // ─── Helpers ──────────────────────────────────────────────────
  function setError(input, show) {
    input.classList.toggle('error', show);
    const msg = input.parentElement.nextElementSibling;
    if (msg && msg.classList.contains('error-msg')) {
      msg.style.display = show ? 'block' : 'none';
    }
  }

  function validateEmail() {
    const val = email.value.trim();
    const ok  = emailRegex.test(val);
    setError(email, !ok);
    return ok;
  }

  function validateTel() {
    const val = tel.value.trim();
    const ok  = telRegex.test(val) && val.length >= 7;
    setError(tel, !ok);
    return ok;
  }

  function validateNotes() {
    const ok = notes.value.trim().length > 0;
    setError(notes, !ok);
    return ok;
  }

  // ─── Écouteurs en temps réel ──────────────────────────────────
  email.addEventListener('blur', validateEmail);
  email.addEventListener('input', () => setError(email, false));

  tel.addEventListener('blur', validateTel);
  tel.addEventListener('input', () => setError(tel, false));

  notes.addEventListener('blur', validateNotes);
  notes.addEventListener('input', () => setError(notes, false));

  // ─── Soumission ───────────────────────────────────────────────
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const vEmail = validateEmail();
    const vTel   = validateTel();
    const vNotes = validateNotes();

    if (!vEmail) { email.focus(); return; }
    if (!vTel)   { tel.focus();   return; }
    if (!vNotes) { notes.focus(); return; }

    // Simulation d'envoi
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    setTimeout(() => {
      alert('Formulaire envoyé avec succès !');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer';
    }, 800);
  });
})();

