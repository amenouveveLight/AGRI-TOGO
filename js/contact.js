/* ═══════════════════════════════════════════════════════════
   MENU MOBILE
   ═══════════════════════════════════════════════════════════ */
document.getElementById('menuToggle').addEventListener('click', function() {
  const nav = document.getElementById('navLinks');
  if (nav.style.display === 'flex') {
    nav.style.display = '';
    nav.style.cssText = '';
  } else {
    nav.style.display = 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '56px';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.flexDirection = 'column';
    nav.style.background = '#1a3c1a';
    nav.style.padding = '16px 32px';
    nav.style.gap = '12px';
    nav.style.zIndex = '99';
  }
});

/* ═══════════════════════════════════════════════════════════
   NEWSLETTER
   ═══════════════════════════════════════════════════════════ */
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button');
  const original = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-check"></i>';
  btn.style.background = '#2e5c2e';
  setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 2000);
});

/* ═══════════════════════════════════════════════════════════
   FORMULAIRE DE CONTACT
   ═══════════════════════════════════════════════════════════ */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

const champs = {
  prenom: document.getElementById('prenom'),
  nom: document.getElementById('nom'),
  email: document.getElementById('email'),
  notes: document.getElementById('notes')
};

function afficherErreur(champId, message) {
  const errDiv = document.getElementById('err-' + champId);
  const wrapper = champs[champId].closest('.input-wrapper');
  if (errDiv) { errDiv.textContent = message; errDiv.classList.add('visible'); }
  if (wrapper) wrapper.classList.add('error');
}

function effacerErreur(champId) {
  const errDiv = document.getElementById('err-' + champId);
  const wrapper = champs[champId].closest('.input-wrapper');
  if (errDiv) errDiv.classList.remove('visible');
  if (wrapper) wrapper.classList.remove('error');
}

Object.keys(champs).forEach(id => {
  if (champs[id]) champs[id].addEventListener('input', () => effacerErreur(id));
});

form.addEventListener('submit', function (event) {
  event.preventDefault();

  let estValide = true;

  if (champs.nom.value.trim() === '') {
    afficherErreur('nom', 'Le nom de famille est obligatoire.');
    estValide = false;
  } else {
    effacerErreur('nom');
  }

  const emailValeur = champs.email.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValeur)) {
    afficherErreur('email', 'Veuillez saisir une adresse email valide.');
    estValide = false;
  } else {
    effacerErreur('email');
  }

  if (champs.notes.value.trim() === '') {
    afficherErreur('notes', 'Ce champ est obligatoire.');
    estValide = false;
  } else {
    effacerErreur('notes');
  }

  if (!estValide) return; // on arrête ici s'il y a une erreur

  // Animation de chargement + succès
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours…';

  setTimeout(() => {
    form.style.display = 'none';
    const successContact = document.getElementById('successContact');
    successContact.classList.add('show');

    // Le message de succès ne reste affiché que 5 secondes
    setTimeout(() => {
      successContact.classList.remove('show');
      form.style.display = '';
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';
    }, 5000);
  }, 800);
});


/* ═══════════════════════════════════════════════════════════
   MODAL ADHÉSION
   ═══════════════════════════════════════════════════════════ */
(function() {
  const overlay = document.getElementById('modalOverlay');
  const openBtn = document.getElementById('btnOpenAdhesion');
  const closeBtn = document.getElementById('modalClose');
  const body    = document.getElementById('modalBody');

  openBtn.addEventListener('click', () => overlay.classList.add('active'));
  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('active'); });

  const form   = document.getElementById('adhesionForm');
  const nom    = document.getElementById('adh-nom');
  const email  = document.getElementById('adh-email');
  const tel    = document.getElementById('adh-tel');
  const type   = document.getElementById('adh-type');
  const zone   = document.getElementById('adh-zone');
  const msg    = document.getElementById('adh-msg');
  const btn    = document.getElementById('btnAdhesionSubmit');
  const success = document.getElementById('successAdhesion');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRegex   = /^[\d\s\+\-\(\)]{7,20}$/;

  function setErr(wrapId, errId, show) {
    document.getElementById(wrapId).classList.toggle('error', show);
    document.getElementById(errId).classList.toggle('show', show);
  }

  nom.addEventListener('blur', () => setErr('wrap-adh-nom', 'err-adh-nom', nom.value.trim() === ''));
  nom.addEventListener('input', () => setErr('wrap-adh-nom', 'err-adh-nom', false));

  email.addEventListener('blur', () => setErr('wrap-adh-email', 'err-adh-email', !emailRegex.test(email.value.trim())));
  email.addEventListener('input', () => setErr('wrap-adh-email', 'err-adh-email', false));

  tel.addEventListener('blur', () => setErr('wrap-adh-tel', 'err-adh-tel', !telRegex.test(tel.value.trim()) || tel.value.trim().length < 7));
  tel.addEventListener('input', () => setErr('wrap-adh-tel', 'err-adh-tel', false));

  type.addEventListener('blur', () => setErr('wrap-adh-type', 'err-adh-type', type.value === ''));
  type.addEventListener('change', () => setErr('wrap-adh-type', 'err-adh-type', false));

  zone.addEventListener('blur', () => setErr('wrap-adh-zone', 'err-adh-zone', zone.value === ''));
  zone.addEventListener('change', () => setErr('wrap-adh-zone', 'err-adh-zone', false));

  msg.addEventListener('blur', () => setErr('wrap-adh-msg', 'err-adh-msg', msg.value.trim() === ''));
  msg.addEventListener('input', () => setErr('wrap-adh-msg', 'err-adh-msg', false));

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let ok = true;
    if (nom.value.trim() === '')   { setErr('wrap-adh-nom',   'err-adh-nom',   true); ok = false; }
    if (!emailRegex.test(email.value.trim())) { setErr('wrap-adh-email', 'err-adh-email', true); ok = false; }
    if (!telRegex.test(tel.value.trim()) || tel.value.trim().length < 7) { setErr('wrap-adh-tel', 'err-adh-tel', true); ok = false; }
    if (type.value === '')         { setErr('wrap-adh-type',  'err-adh-type',  true); ok = false; }
    if (zone.value === '')         { setErr('wrap-adh-zone',  'err-adh-zone',  true); ok = false; }
    if (msg.value.trim() === '')   { setErr('wrap-adh-msg',   'err-adh-msg',   true); ok = false; }
    if (!ok) return;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours…';
    setTimeout(() => {
      form.style.display = 'none';
      success.classList.add('show');

      // Le message de succès ne reste affiché que 5 secondes
      setTimeout(() => {
        success.classList.remove('show');
        form.style.display = '';
        form.reset();
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Soumettre ma demande';
      }, 5000);
    }, 800);
  });
})();