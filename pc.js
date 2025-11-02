import { startCursorEl, terminalContainer, preloaderButton, langRadioInputs, stepsKeys } from "./components/constants.js";
import { CustomCursor } from "./components/customCursor.js";
import { glitchWriter } from "./components/glithWriter.js";
import { l10n } from "./components/l10n.js";

// библиотеки через Skypack
import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
import { Application } from 'https://cdn.skypack.dev/@splinetool/runtime@latest';

gsap.registerPlugin(ScrollTrigger);
document.addEventListener('DOMContentLoaded', () => {
  l10n.init('ru');
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


// === 3D scene START ===
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
  const macPos = { x: -2000, y: 0, z: -500 }; // старт: левый бок за экраном
  const macRot = { x: 0, y: deg(90), z: 0 }; // старт: бок к камере
  const screenRot = { x: 0 }; // старт: крышка закрыта

  // Устанавливаем стартовые позиции
  macObj.position.set(macPos.x, macPos.y, macPos.z);
  macObj.rotation.set(macRot.x, macRot.y, macRot.z);

  // Крышка закрыта и привязана к маку
  screenObj.rotation.set(deg(0), 0, 0);
  screenRot.x = deg(0);

  console.log(document.querySelector('.start').offsetHeight);
  
  const startBG3dSceneTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.start',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      markers: true
    }
  });

  // Телефон: движение
  startBG3dSceneTimeline.fromTo(phoneTween,
    { x: phoneObj.position.x +100, z: phoneObj.position.z -200 },
    {
      x: phoneObj.position.x + 700,
      z: phoneObj.position.z + 400,
      ease: 'power1.out',
      onUpdate: () => phoneObj.position.set(phoneTween.x, phoneTween.y, phoneTween.z)
    },
    0
  );
  // Мак: вылет сбоку
  startBG3dSceneTimeline.fromTo(macPos,
    { x: -2000, z: -500 },
    {
      x: 0,
      z: -300,
      ease: 'power1.out',
      onUpdate: () => macObj.position.set(macPos.x, macPos.y, macPos.z)
    },
    0
  );
  // Мак: поворот + открытие крышки
  startBG3dSceneTimeline.fromTo(macRot,
    { y: macRot.y },
    {
      y: 0,
      x: deg(30), // наклон при приближении
      ease: 'power1.out',
      onUpdate: () => macObj.rotation.set(macRot.x, macRot.y, macRot.z)
    },
    0.27
  );
  startBG3dSceneTimeline.fromTo(screenRot,
    { x: 0 },      // крышка закрыта
    {
      x: deg(-120), // крышка открывается
      ease: 'power1.out',
      onUpdate: () => screenObj.rotation.set(screenRot.x, 0, 0)
    },
    0.27
  );
  // Мак: приближение к камере
  startBG3dSceneTimeline.fromTo(macPos,
    { z: -300, y: macObj.position.y },
    {
      z: 900,
      y: -75,
      ease: 'power1.out',
      onUpdate: () => macObj.position.set(macPos.x, macPos.y, macPos.z)
    },
    0.55
  );
  startBG3dSceneTimeline.fromTo(macPos,
    { z: 900 },
    {
      z: 900,
      ease: 'power1.out',
      onUpdate: () => macObj.position.set(macPos.x, macPos.y, macPos.z)
    },
    1
  );
});

// 2d obj on scene
gsap.to('#start-title', {
  x: '30vw',
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.start__screen_1',
    start: 'top top',
    end: () => `bottom top+=${0.7 * window.innerHeight}`,
    scrub: 1
  }
});
gsap.to('#start-subtitle', {
  x: '30vw',
  opacity: 0,
  ease: 'none',
  scrollTrigger: {
    trigger: '.start__screen_1',
    start: 'top+=10 top',
    end: () => `bottom top+=${0.7 * window.innerHeight}`,
    scrub: 1
  }
});
gsap.fromTo('.start__scroll-spoiler',
  { y: 0, x: '-50%', opacity: 1 },
  { 
    y: 20,
    x: '-50%',
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.start__screen_1',
      start: 'top top',
      end: () => `bottom top+=${0.7 * window.innerHeight}`,
      scrub: 1
    }
  }
);

// DEVELOPING BLOCK
const blocks = document.querySelectorAll('.developing__block');
blocks.forEach(block => {
  gsap.set(block, { y: 100, opacity: 0, x: 0 });
});
blocks.forEach((block, i) => {
  const direction = block.classList.contains('right') ? 1 : -1;
  ScrollTrigger.create({
    trigger: block,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(block, {
        y: 0,
        opacity: 1,
        ease: 'power1.out',
        duration: 0.7,
        delay: i * 0.2
      });
    },
    onLeaveBack: () => {
      gsap.to(block, {
        y: 100,
        opacity: 0,
        ease: 'power1.out',
        duration: 0.7,
        delay: i * 0.2
      });
    }
  });
  ScrollTrigger.create({
    trigger: block,
    start: 'top 30%',
    end: 'top 30%',
    scrub: 0.5,
    onUpdate: (self) => {
      gsap.to(block, {
        y: 0,
        x: 200 * direction * self.progress,
        opacity: 1 - self.progress,
        overwrite: 'auto'
      });
    }
  });
});

// CREATE BLOCK
// переключение сцен
ScrollTrigger.create({
  trigger: ".start__screen_4",
  start: "top 80%",
  end: "top 50%",
  onEnter: () => {
    document.querySelector("#start-scene")?.classList.add("hidden");
    document.querySelector("#create-scene")?.classList.remove("hidden");
  },
  onLeaveBack: () => {
    document.querySelector("#start-scene")?.classList.remove("hidden");
    document.querySelector("#create-scene")?.classList.add("hidden");
  }
});
gsap.set(".create__card", { x: "100vw" });
gsap.to(".create__card", {
  x: 0,
  ease: "elastic.out(0.5, 0.9)",
  duration: 1.6,
  stagger: {
    each: 0.2,
    from: "start",
  },
  scrollTrigger: {
    trigger: ".start__screen_4",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
const cards = gsap.utils.toArray(".create__card");
gsap.timeline({
  scrollTrigger: {
    trigger: ".start__screen_5",
    start: "top 80%",
    end: "top -50%",
    scrub: 2,
  }
})
.to(cards, {
  yPercent: -100,
  opacity: 0,
  stagger: 0.15,
  ease: "none"
});
