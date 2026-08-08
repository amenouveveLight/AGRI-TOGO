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
    (function() {
      const form   = document.getElementById('contactForm');
      const email  = document.getElementById('email');
      const tel    = document.getElementById('tel');
      const notes  = document.getElementById('notes');
      const btn    = document.getElementById('submitBtn');
      const success = document.getElementById('successContact');

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const telRegex   = /^[\d\s\+\-\(\)]{7,20}$/;

      function setErr(wrapId, errId, show) {
        document.getElementById(wrapId).classList.toggle('error', show);
        document.getElementById(errId).classList.toggle('show', show);
      }
      function validateEmail() {
        const ok = emailRegex.test(email.value.trim());
        setErr('wrap-email', 'err-email', !ok);
        return ok;
      }
      function validateTel() {
        const val = tel.value.trim();
        const ok  = telRegex.test(val) && val.length >= 7;
        setErr('wrap-tel', 'err-tel', !ok);
        return ok;
      }
      function validateNotes() {
        const ok = notes.value.trim().length > 0;
        setErr('wrap-notes', 'err-notes', !ok);
        return ok;
      }

      email.addEventListener('blur', validateEmail);
      email.addEventListener('input', () => setErr('wrap-email', 'err-email', false));
      tel.addEventListener('blur', validateTel);
      tel.addEventListener('input', () => setErr('wrap-tel', 'err-tel', false));
      notes.addEventListener('blur', validateNotes);
      notes.addEventListener('input', () => setErr('wrap-notes', 'err-notes', false));

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const v1 = validateEmail(), v2 = validateTel(), v3 = validateNotes();
        if (!v1) { email.focus(); return; }
        if (!v2) { tel.focus();   return; }
        if (!v3) { notes.focus(); return; }
        btn.disabled = true; btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Envoi en cours…';
        setTimeout(() => {
          form.style.display = 'none';
          success.classList.add('show');
        }, 800);
      });
    })();

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
        }, 800);
      });
    })();