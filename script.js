window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');

  // Ждем завершения анимации (например, 2 секунды, как в CSS)
  setTimeout(() => {
    loader.style.display = 'none';
    content.style.display = 'block';
  }, 3000); 
});