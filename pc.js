import { startCursorEl, terminalContainer, preloaderButton, langRadioInputs, stepsKeys } from "./components/constants.js";
import { CustomCursor } from "./components/customCursor.js";
import { glitchWriter } from "./components/glithWriter.js";
import { l10n } from "./components/l10n.js";

// библиотеки через Skypack
import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
import { Application } from 'https://cdn.skypack.dev/@splinetool/runtime@latest';

// регистрация плагина
console.log(gsap, ScrollTrigger); // убедись, что объект не undefined


document.addEventListener('DOMContentLoaded', () => {
    l10n.init('ru');
    gsap.registerPlugin(ScrollTrigger);
});

// === Preloader / Glitch text ===
const container = terminalContainer;
const steps = stepsKeys;
(async () => {
    for (const key of steps) {
        const p = document.createElement('p');
        p.classList.add('preloader__text');
        container.appendChild(p);
        await glitchWriter(p, l10n.get(key), { speed: 10, glitchSpeed: 10 });
    }
    const button = preloaderButton;
    button.classList.remove('hidden');
    glitchWriter(button, l10n.get('PRELOADER_START_BUTTON'), { speed: 10, glitchSpeed: 10 });
})();

// === Custom cursor ===
CustomCursor.init(startCursorEl, {
    hover: 'cursor-hover',
    click: 'cursor-click'
});

// === Language switch ===
langRadioInputs.forEach(input => {
    input.addEventListener('change', (e) => {
        if (e.target.checked) {
            const selectedLang = e.target.value;
            l10n.init(selectedLang.toLowerCase());
        }
    });
});

// === Preloader button click ===
preloaderButton.addEventListener('click', () => {
    window.scrollTo(0, 0);
    document.querySelector('.preloader').classList.add('hidden');
    setInterval(() => {
        CustomCursor.init(document.querySelector('.custom-cursor2'), {
            hover: 'cursor-hover',
            click: 'cursor-click'
        });
    }, 500);
});


// === Spline 3D scene START ===
const startSceneCanvas = document.getElementById('start-scene');
const splineApp = new Application(startSceneCanvas, { transparent: true });
splineApp.load('https://prod.spline.design/XLGNQJMwkcUibkqW/scene.splinecode').then(() => {
    const phoneObj = splineApp.findObjectByName('phone') || splineApp.findObjectByName('Phone');
    const macObj = splineApp.findObjectByName('macbook') || splineApp.findObjectByName('Macbook');
    const screenObj = splineApp.findObjectByName('Screen');

    if (!phoneObj || !macObj || !screenObj) return;

    const deg = (d) => d * Math.PI / 180;

    // --- Телефон ---
    const phoneTween = { x: phoneObj.position.x, y: phoneObj.position.y, z: phoneObj.position.z };

    // --- Мак ---
    const macPos = { x: -2000, y: 0, z: 0 }; // старт: левый бок за экраном
    const macRot = { x: 0, y: deg(90), z: 0 }; // старт: бок к камере
    const screenRot = { x: 0 }; // старт: крышка закрыта

    // Устанавливаем стартовые позиции
    macObj.position.set(macPos.x, macPos.y, macPos.z);
    macObj.rotation.set(macRot.x, macRot.y, macRot.z);

    // Крышка закрыта и привязана к маку
    screenObj.rotation.set(deg(0), 0, 0);
    screenRot.x = deg(0);

    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.start',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true,
            onUpdate: (self) => {
                console.log("Scroll progress:", Math.round(self.progress * 100), "%");
                console.log(macPos, macRot, screenRot);
                
            }
        }
    });

    // --- Телефон: движение ---
    timeline.fromTo(phoneTween,
        { x: phoneObj.position.x, z: phoneObj.position.z },
        {
            x: phoneObj.position.x + 700,
            z: phoneObj.position.z + 400,
            ease: 'power1.out',
            onUpdate: () => phoneObj.position.set(phoneTween.x, phoneTween.y, phoneTween.z)
        },
        0
    );

    // --- Мак: вылет сбоку ---
    timeline.fromTo(macPos,
        { x: -2000, z: 0 },
        { 
            x: 0,
            z: 0,
            ease: 'power1.out',
            onUpdate: () => macObj.position.set(macPos.x, macPos.y, macPos.z)
        },
        0
    );

    // --- Мак: поворот + открытие крышки ---
    timeline.fromTo(macRot,
        { y: macRot.y },
        { 
            y: 0,
            x: deg(30), // наклон при приближении
            ease: 'power1.out',
            onUpdate: () => macObj.rotation.set(macRot.x, macRot.y, macRot.z)
        },
        0.27
    );

    timeline.fromTo(screenRot,
        { x: 0 },      // крышка закрыта
        {
            x: deg(-120), // крышка открывается
            ease: 'power1.out',
            onUpdate: () => screenObj.rotation.set(screenRot.x, 0, 0)
        },
        0.27
    );

    // --- Мак: приближение к камере ---
    timeline.fromTo(macPos,
        { z: macObj.position.z, y: macObj.position.y },
        {
            z: 800,
            y: -75,
            ease: 'power1.out',
            onUpdate: () => macObj.position.set(macPos.x, macPos.y, macPos.z)
        },
        0.55
    );
});