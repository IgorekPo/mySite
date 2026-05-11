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
const layers = document.querySelectorAll('.parallax-layer');
const bg = document.querySelectorAll('.parallax-bg');

function updateParallax(offsetX, offsetY) {
    bg.forEach(bg => {
        bg.style.transform = `scale(1.1) translate(${offsetX * 0.3}px, ${offsetY * 0.3}px)`;
    });

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

if (window.innerWidth > 1024) {
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        updateParallax(x, y);
    });
}

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
        if (window.innerWidth <= 1024) {
            const x = e.gamma * 1.1; 
            const y = (e.beta - 30) *1.1; 
            updateParallax(x, y);
        }
    });
}

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


// SECTION SMOOTH SCROLL ===========================================================

document.querySelectorAll(".panel").forEach((panel) => {
  observer.observe(panel);
});