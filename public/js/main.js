/**
 * PORTFÓLIO - SCRIPT PRINCIPAL
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. CONFIGURAÇÕES GERAIS E INTERFACE --- */

    /* Animação Lógica da Teia */
    const canvas = document.getElementById('canvas-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 40; // Quantidade de pontos

    function init() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2
            });
        }
    }
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100, // Quantidade de pontos (ajuste para densidade)
      "density": { "enable": true, "value_area": 800 }
    },
    "color": { "value": "#888888" }, // Cor neutra que se adapta a fundos claros/escuros
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": { "enable": false }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": { "enable": false }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#888888", // Cor das linhas da teia
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2, // Velocidade tecnológica suave
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "window", // Detecta o mouse no site inteiro
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab" // Cria a conexão quando o mouse passa perto
      },
      "onclick": { "enable": true, "mode": "push" },
      "resize": true
    },
    "modes": {
      "grab": { "distance": 200, "line_linked": { "opacity": 1 } },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(56, 189, 248, 0.5)"; // Cor das partículas (accent-blue)
        ctx.strokeStyle = "rgba(56, 189, 248, 0.1)"; // Cor das linhas

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            // Rebater nas bordas
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Desenhar linhas entre partículas próximas
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', init);
    init();
    draw();
});

    /* Animação de Digitação (Typewriter) ao entrar na tela */
    const typeTextElement = document.querySelector('.type-text');

    const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Reinicia a animação ao entrar na tela (opcional) ou apenas inicia
            entry.target.style.animationPlayState = 'running';
        }
    });
        }, { threshold: 1.0
    });

        if (typeTextElement) {
    typeTextElement.style.animationPlayState = 'paused'; // Começa pausada
    typeObserver.observe(typeTextElement);
}
    
    // Efeito de Header ao Rolar
    const header = document.querySelector('.header');
    const handleHeaderScroll = () => {
        if (window.scrollY > 80) {
            header.style.padding = "10px 0";
            header.style.background = "rgba(11, 15, 26, 0.98)";
            header.style.borderBottom = "1px solid var(--accent-blue)";
        } else {
            header.style.padding = "15px 0";
            header.style.background = "rgba(11, 15, 26, 0.85)";
            header.style.borderBottom = "1px solid rgba(255, 255, 255, 0.05)";
        }
    };

    // Interatividade no Hero (Hover Glow)
    const heroTexts = document.querySelectorAll('.hover-char');
    heroTexts.forEach(text => {
        text.addEventListener('mouseenter', () => text.style.filter = "drop-shadow(0 0 12px var(--accent-blue))");
        text.addEventListener('mouseleave', () => text.style.filter = "none");
    });


    /* --- 2. NAVEGAÇÃO E SCROLL --- */

    // Scroll Suave para links do Menu
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });


    /* --- 3. LÓGICA DOS CARROSSEIS --- */

    const setupCarousel = (trackSelector, prevBtnSelector, nextBtnSelector, wrapperSelector) => {
        const track = document.querySelector(trackSelector);
        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);
        const wrapper = document.querySelector(wrapperSelector);

        if (!track || !prevBtn || !nextBtn || !wrapper) return;

        const items = Array.from(track.children);
        let index = 0;

        const update = () => {
    if (!items.length || items[0].offsetWidth === 0) return; // Evita erro de cálculo zero
    const itemWidth = items[0].offsetWidth + 20; 
    track.style.transform = `translateX(-${index * itemWidth}px)`;
};

        nextBtn.addEventListener('click', () => {
            const visibleItems = Math.round(wrapper.offsetWidth / items[0].offsetWidth);
            index = (index >= items.length - visibleItems) ? 0 : index + 1;
            update();
        });

        prevBtn.addEventListener('click', () => {
            const visibleItems = Math.round(wrapper.offsetWidth / items[0].offsetWidth);
            index = (index <= 0) ? items.length - visibleItems : index - 1;
            update();
        });

        // Retorna a função de update para ser usada no resize global
        return update;
    };

    // Inicialização dos carrosséis
    const updateTestimonials = setupCarousel('.testimonials-track', '.prev-btn', '.next-btn', '.testimonials-wrapper');
    const updateCerts = setupCarousel('.cert-track', '.prev-cert', '.next-cert', '.cert-wrapper');
    const updateProjects = setupCarousel('.projects-track', '.prev-proj', '.next-proj', '.projects-wrapper');


    /* --- 4. ANIMAÇÕES DE REVELAÇÃO (INTERSECTION OBSERVER) --- */

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const elementsToReveal = document.querySelectorAll('#sobre, .about-content, .cert-card, .repo-card, .section-title, .testimonial-card');

    elementsToReveal.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
        revealObserver.observe(el);
    });

    // CSS Injetado para animação de revelação
    const style = document.createElement('style');
    style.innerHTML = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);


    /* --- 5. EVENTOS GLOBAIS (SCROLL E RESIZE) --- */

    window.addEventListener('scroll', handleHeaderScroll);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Atualiza todos os carrosséis após redimensionar
            if (updateTestimonials) updateTestimonials();
            if (updateCerts) updateCerts();
            if (updateProjects) updateProjects();
        }, 200);
    });