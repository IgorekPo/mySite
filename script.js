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

burger.addEventListener('click', () => {
   burger.classList.toggle('active');
   
});

// ============================================================