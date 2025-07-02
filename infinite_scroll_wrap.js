
document.addEventListener('DOMContentLoaded', () => {
  function wrapCarousel() {
    const items = Array.from(document.querySelectorAll('.carousel__item'));
    const minPos = Math.min(...items.map(i => parseInt(i.dataset.pos)));
    const maxPos = Math.max(...items.map(i => parseInt(i.dataset.pos)));

    items.forEach(item => {
      const pos = parseInt(item.dataset.pos);
      if (pos > 1) item.dataset.pos = pos - 3;
      if (pos < -1) item.dataset.pos = pos + 3;
    });
  }

  document.getElementById('arrow-left')?.addEventListener('click', () => {
    setTimeout(wrapCarousel, 90);
  });

  document.getElementById('arrow-right')?.addEventListener('click', () => {
    setTimeout(wrapCarousel, 90);
  });

  document.querySelector('.carousel')?.addEventListener('click', () => {
    setTimeout(wrapCarousel, 90);
  });
});
