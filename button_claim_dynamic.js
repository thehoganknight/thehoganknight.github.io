
document.addEventListener('DOMContentLoaded', () => {
  function updateClaimButtons() {
    document.querySelectorAll('.carousel__item').forEach(item => {
      const pos = item.getAttribute('data-pos');
      const button = item.querySelector('button');

      if (!button) return;

      if (pos === '0') {
        button.textContent = 'Claim';
        button.style.backgroundColor = '#FFD700';
        button.style.color = '#000';
        button.style.fontWeight = 'bold';
      } else {
        button.textContent = 'Scroll';
        button.style.backgroundColor = '#ccc';
        button.style.color = '#333';
        button.style.fontWeight = 'normal';
      }
    });
  }

  updateClaimButtons();

  const hook = () => setTimeout(updateClaimButtons, 100);
  document.getElementById('arrow-left')?.addEventListener('click', hook);
  document.getElementById('arrow-right')?.addEventListener('click', hook);
  document.querySelector('.carousel')?.addEventListener('click', hook);
});
