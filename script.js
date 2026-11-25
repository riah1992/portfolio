const revealItems = document.querySelectorAll('.reveal');

const copyEmailButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('#copy-status');

if (copyEmailButton && copyStatus) {
  copyEmailButton.hidden = false;
  copyEmailButton.addEventListener('click', async () => {
    copyEmailButton.disabled = true;
    copyStatus.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(copyEmailButton.dataset.email);
      copyStatus.textContent = '이메일 주소가 복사되었습니다.';
    } catch {
      copyStatus.textContent = '자동 복사가 되지 않았어요. 위 이메일 주소를 길게 누르거나 선택해 복사해주세요.';
    } finally {
      copyEmailButton.disabled = false;
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
