// Menu hamburger mobile
    document.getElementById('menuToggle').addEventListener('click', function() {
      const nav = document.getElementById('navLinks');
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.position = 'absolute';
      nav.style.top = '56px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.flexDirection = 'column';
      nav.style.background = '#1a3c1a';
      nav.style.padding = '16px 32px';
      nav.style.gap = '12px';
      nav.style.zIndex = '99';
    });

    // Newsletter
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      btn.style.background = '#2e5c2e';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 2000);
    });