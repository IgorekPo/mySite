window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');

  setTimeout(() => {
    loader.style.display = 'none';
    content.style.display = 'block';
  }, 4000); 
});


//  BURGER ===================================================

const burger = document.querySelector('.header__burger');
const headerLinks = document.querySelector('.header__links');

burger.addEventListener('click', () => {
   burger.classList.toggle('active');
   headerLinks.classList.toggle('active');
});

document.addEventListener('click', (e) => {
   if (!burger.contains(e.target) && !headerLinks.contains(e.target)) {
      burger.classList.remove('active');
      headerLinks.classList.remove('active');
   }
});
// ============================================================