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

   
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-check"></i>';
      btn.style.background = '#2e5c2e';
      setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 2000);
    });


    (function() {
      const track = document.getElementById('carouselTrack');
      const slides = track.children;
      const dots = document.querySelectorAll('.carousel-dot');
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      let current = 0;
      const total = slides.length;

      function goTo(index) {
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        current = index;
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
      }

      prevBtn.addEventListener('click', () => goTo(current - 1));
      nextBtn.addEventListener('click', () => goTo(current + 1));
      dots.forEach(dot => {
        dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index)));
      });

      setInterval(() => goTo(current + 1), 5000);
    })();


    (function() {
      const filterBtns = document.querySelectorAll('.filter-btn');
      const products = document.querySelectorAll('.product-card');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const filter = this.dataset.filter;

          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          products.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
              card.classList.remove('hidden');
            } else {
              card.classList.add('hidden');
            }
          });
        });
      });
    })();