//LOADER ===========================================================


window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');

  setTimeout(() => {
    loader.style.display = 'none';
    content.style.display = 'block';
  }, 4000); 
});

// ===========================================================
const layers = document.querySelectorAll('.parallax-layer');
const bg = document.querySelector('.parallax-bg');

// Функция для обновления позиций
function updateParallax(offsetX, offsetY) {
    // Двигаем фон (коэффициент 0.2 для мягкости)
    bg.style.transform = `scale(1.1) translate(${offsetX * 0.3}px, ${offsetY * 0.3}px)`;

    layers.forEach(layer => {
        const speed = layer.getAttribute('data-speed');
        const x = (offsetX * speed) / 5;
        const y = (offsetY * speed) / 5;

        if (layer.classList.contains('layer-laptop')) {
            layer.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
        } else {
            layer.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

// 1. Движение мышью (Десктоп)
if (window.innerWidth > 1024) {
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        updateParallax(x, y);
    });
}

// 2. Движение гироскопом (Мобильные 320px-425px)
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
        // gamma: наклон влево-вправо (-90 до 90)
        // beta: наклон вперед-назад (-180 до 180)
        if (window.innerWidth <= 1024) {
            const x = e.gamma * 1.5; // Чувствительность
            const y = (e.beta - 45) * 1.5; // 45 градусов - среднее положение в руках
            updateParallax(x, y);
        }
    });
}

// Запрос разрешения для iOS 13+
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.body.addEventListener('click', function() {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    console.log("Доступ к гироскопу разрешен");
                }
            })
            .catch(console.error);
    }, { once: true });
}