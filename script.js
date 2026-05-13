//LOADER ===========================================================


window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');

  setTimeout(() => {
    loader.style.display = 'none';
    content.style.display = 'block';
  }, 4000); 
});

// PARALAX - HERRO ===========================================================

const layers = document.querySelectorAll('.herro-layer');
const btn = document.getElementById('activate-gyro');

function updateParallax(offsetX, offsetY) {
    layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed'));
        
        // Рассчитываем смещение в пикселях (интенсивность 60px)
        const xMove = offsetX * speed * 120;
        const yMove = offsetY * speed * 120;

        layer.style.transform = `translate3d(${xMove}px, ${yMove}px, 0)`;
    });
}

// --- ЛОГИКА ДЛЯ ПК (МЫШЬ) ---
window.addEventListener('mousemove', (e) => {
    // Получаем координаты мыши относительно центра окна
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    updateParallax(x, y);
});

// --- ЛОГИКА ДЛЯ МОБИЛЬНЫХ (ГИРОСКОП) ---
function handleOrientation(event) {
    // gamma: влево/вправо (-90 до 90)
    // beta: вперед/назад (-180 до 180)
    
    let x = event.gamma / 45; // Нормализуем к диапазону ~ -1 до 1
    let y = (event.beta - 45) / 45; // 45 градусов — естественный наклон в руках

    // Ограничиваем значения для стабильности
    x = Math.max(Math.min(x, 1), -1);
    y = Math.max(Math.min(y, 1), -1);

    updateParallax(x, y);
}

// Проверка разрешений для мобильных устройств
if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // Это iOS (нужно нажать кнопку для разрешения)
        btn.style.display = 'block';
        btn.onclick = () => {
            DeviceOrientationEvent.requestPermission()
                .then(state => {
                    if (state === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                        btn.style.display = 'none';
                    }
                })
                .catch(console.error);
        };
    } else {
        // Это Android или старая iOS (включаем сразу)
        window.addEventListener('deviceorientation', handleOrientation);
    }
}

// BURGER MENU ===========================================================

const burgerMenu = document.querySelector ('.header__burger');
const headerMenu = document.querySelector ('.header__links');

burgerMenu.addEventListener('click' , ()=>{
   burgerMenu.classList.toggle ('active');
   headerMenu.classList.toggle ('active');
})

const menuLinks = document.querySelectorAll ('.header__link');

menuLinks.forEach (link =>{
   link.addEventListener('click',()=>{
   burgerMenu.classList.remove ('active');
   headerMenu.classList.remove ('active');
   })
})

document.addEventListener ('click' , (e)=>{
   if (headerMenu.classList.contains ('active') && !headerMenu.contains(e.target) && !burgerMenu.contains(e.target)){
         burgerMenu.classList.remove ('active');
   headerMenu.classList.remove ('active');
   }
})
// ======================================================================

