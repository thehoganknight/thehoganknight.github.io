document.addEventListener('DOMContentLoaded', () => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  function updateButtons() {
    const items = document.querySelectorAll('.carousel__item');

    items.forEach(item => {
      const pos = item.getAttribute('data-pos');
      const button = item.querySelector('button');
      const span = button?.querySelector('span');

      if (!button || !span) return;

      if (pos === '0') {
        button.classList.remove('swipe');
        button.classList.add('select');
        span.textContent = 'Claim';
        span.style.color = '#003f87';
      } else {
        button.classList.remove('select');
        button.classList.add('swipe');
        span.textContent = isMobile ? 'Scroll' : 'Scroll';
        span.style.color = '#000';
      }
    });
  }

  function rotateCarousel(direction) {
    const items = document.querySelectorAll('.carousel__item');
    const positions = Array.from(items).map(item => parseInt(item.dataset.pos));
    const newPositions = positions.map(pos => {
      let newPos = pos + direction;
      if (newPos > 2) return -2;
      if (newPos < -2) return 2;
      return newPos;
    });

    items.forEach((item, index) => {
      item.dataset.pos = newPositions[index];
    });

    updateButtons();
  }

  updateButtons();

  document.getElementById('arrow-left')?.addEventListener('click', () => rotateCarousel(1));
  document.getElementById('arrow-right')?.addEventListener('click', () => rotateCarousel(-1));

  document.querySelector('.carousel')?.addEventListener('click', e => {
    const item = e.target.closest('.carousel__item');
    if (!item || item.dataset.pos === '0') return;

    const newPos = parseInt(item.dataset.pos);
    const allItems = document.querySelectorAll('.carousel__item');
    allItems.forEach(el => {
      const cur = parseInt(el.dataset.pos);
      let newVal = cur - newPos;
      if (newVal > 2) newVal = -2;
      if (newVal < -2) newVal = 2;
      el.dataset.pos = newVal;
    });

    updateButtons();
  });
});






// ADD: Fresh overlay setup, one overlay reused for all cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.carousel__item .card');

  const overlay = document.createElement('div');
  overlay.classList.add('enlarged-card-overlay');
  overlay.style.display = 'none';
  document.body.appendChild(overlay);

  const cardHTML = (index) => `
    <div class="enlarged-card show">
      <div class="close-btn">&times;</div>
      <div class="description">
        <h2 style="font-family: Helvetica; font-weight: Bold;">Michael & Son Neighbors Special</h2>
        <p style="font-family: Helvetica; font-weight: Normal;">From hose bibs to spot repairs, create a splash this summer and cash in our most popular offer now thru July 3rd. Can not be combined with any other offer.</p>
      </div>
      <div class="call-to-action" style="font-family: Helvetica;">
        <a href="tel:8009486453" class="call-btn">Ready to book? Call us (800) 948-6453</a>
      </div>
    </div>
  `;

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      overlay.innerHTML = cardHTML(index);
      overlay.style.display = 'flex';

      const closeBtn = overlay.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
      });

      overlay.addEventListener('click', (e) => {
        const enlarged = overlay.querySelector('.enlarged-card');
        if (enlarged && !enlarged.contains(e.target)) {
          overlay.style.display = 'none';
        }
      });
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.enlarged-card-overlay') || document.getElementById('enlarged-card-overlay');

  if (!overlay) return;

  document.querySelectorAll('.carousel__item .card').forEach(card => {
    card.addEventListener('click', () => {
      const focusedCard = document.querySelector('.carousel__item[data-pos="0"] .card');
      if (!focusedCard) return;

      const promoID = focusedCard.querySelector('h2')?.id || '';

      
      if (promoID) promoHTML += `<div style="font-family: Helvetica;" class="promo-code-label">Show this code to your service technician: <strong>${promoID}</strong></div>`;

      const desc = overlay.querySelector('.description');
      if (desc && !desc.querySelector('.promo-code-label')) {
        desc.innerHTML += promoHTML;
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.enlarged-card-overlay') || document.getElementById('enlarged-card-overlay');

  if (!overlay) return;

  document.querySelectorAll('.carousel__item .card').forEach(card => {
    card.addEventListener('click', () => {
      const focusedCard = document.querySelector('.carousel__item[data-pos="0"] .card');
      if (!focusedCard) return;

      const promoID = focusedCard.querySelector('h2')?.id || '';


      let promoHTML = '';
      if (promoID) promoHTML += `<div style="font-family: Helvetica;" class="promo-code-label">Present this code to your service technician:  <strong>${promoID}</strong></div>`;

      const desc = overlay.querySelector('.description');
      if (desc && !desc.querySelector('.promo-code-label')) {
        desc.innerHTML += promoHTML;
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.enlarged-card-overlay') || document.getElementById('enlarged-card-overlay');

  if (!overlay) return;

  document.querySelectorAll('.carousel__item .card').forEach(card => {
    card.addEventListener('click', () => {
      const focusedCard = document.querySelector('.carousel__item[data-pos="0"] .card');
      if (!focusedCard) return;

      const promoID = focusedCard.querySelector('h2')?.id || '';
      const desc = overlay.querySelector('.description p');

      if (!desc) return;

      // Promo-specific text
      let customText = '';
      switch (promoID) {
        case 'PLUM100':
          customText = 'Take $100 OFF any main sewer line cleaning and recieve a complimentary camera.';
          break;
        case 'FREE2ND':
          customText = 'Get a FREE second opinion on any plumbing estimate — no strings attached!';
          break;
        case 'TANK300':
          customText = 'Claim $300 OFF on a brand new tankless water heater install!';
          break;
        default:
          customText = '';
      }

      desc.textContent = customText || 'From hose bibs to spot repairs, create a splash this summer and cash in our most popular offer now thru July 3rd. Cannot be combined with any other offer.';
    });
  });
});
