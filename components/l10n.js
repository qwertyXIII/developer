
const dict = {
  PRELOADER_START_BUTTON: {
    ru: 'СТАРТ',
    en: 'START'
  },
  PRELOADER_INIT_SYSTEMS: {
    ru: 'Инициализация систем...',
    en: 'Initializing systems...'
  },
  PRELOADER_CHECK_FILES: {
    ru: 'Проверка целостности файлов...',
    en: 'Checking file integrity...'
  },
  PRELOADER_UPDATE_SCRIPTS: {
    ru: 'Обновление скриптов...',
    en: 'Updating scripts...'
  },
  PRELOADER_CONNECT_SERVER: {
    ru: 'Подключение к серверу...',
    en: 'Connecting to server...'
  },
  PRELOADER_SYNC_TIME: {
    ru: 'Синхронизация времени...',
    en: 'Synchronizing time...'
  },
  PRELOADER_OPTIMIZE_CODE: {
    ru: 'Оптимизация кода...',
    en: 'Optimizing code...'
  },
  PRELOADER_LOAD_UI: {
    ru: 'Загрузка пользовательского интерфейса...',
    en: 'Loading user interface...'
  },
  PRELOADER_RUN_PROCESSES: {
    ru: 'Запуск фоновых процессов...',
    en: 'Running background processes...'
  },
  PRELOADER_SCAN_MEMORY: {
    ru: 'Сканирование памяти...',
    en: 'Scanning memory...'
  },
  PRELOADER_INIT_TERMINAL: {
    ru: 'Инициализация терминального интерфейса...',
    en: 'Initializing terminal interface...'
  },
  PRELOADER_LOADING_COMPLETE: {
    ru: 'Загрузка завершена.',
    en: 'Loading complete.'
  },
  START_TITLE: {
    ru: 'РАЗРАБОТКА',
    en: 'DEVELOPING'
  },
  START_SUBTITLE: {
    ru: 'Лендингов, сторитейлингов, ботов с ИИ',
    en: 'Landings, storytalings, bots with AI'
  },
  START_SCROLL_SPOILER: {
    ru: 'Листайте страницу вверх',
    en: 'Scroll up the page'
  }, START_TEXT_ABOUT_SITES_TITLE: {
    ru: 'Лендинги и веб-сцены',
    en: 'Landing Pages & Web Scenes'
  },
  START_TEXT_ABOUT_SITES_TEXT: {
    ru: 'Создаю не просто лендинги, а целые веб-сцены с продуманной 3D визуализацией и интерактивными элементами. Ваши страницы будут отлично выглядеть как на мобильных устройствах, так и на больших мониторах, создавая эффект погружения для каждого посетителя.',
    en: 'I create not just landing pages, but complete web scenes with carefully designed 3D visuals and interactive elements. Your pages will look stunning on both mobile devices and large desktop screens, providing an immersive experience for every visitor.'
  },
  START_TEXT_ABOUT_STORYTALING_TITLE: {
    ru: 'Сторителлинг на сайте',
    en: 'Website Storytelling'
  },
  START_TEXT_ABOUT_STORYTALING_TEXT: {
    ru: 'Я создаю сайты, которые рассказывают истории. Каждая страница выстроена так, чтобы сразу захватывать внимание пользователя и вести его через уникальный визуальный и интерактивный опыт, превращая обычное посещение сайта в незабываемое впечатление.',
    en: 'I craft websites that tell stories. Each page is designed to immediately capture the user’s attention and guide them through a unique visual and interactive journey, turning an ordinary site visit into a memorable experience.'
  },
  START_TEXT_ABOUT_BOTS_TITLE: {
    ru: 'ИИ-помощники и автоматизация',
    en: 'AI Assistants & Automation'
  },
  START_TEXT_ABOUT_BOTS_TEXT: {
    ru: 'Создаю интеллектуальных ИИ-ассистентов, которые берут на себя рутинные задачи, помогают составлять расписание, напоминания, автоматизируют рабочие процессы и ускоряют взаимодействие с клиентами. Это гибкие цифровые помощники, работающие круглосуточно и экономящие ваше время.',
    en: 'I develop intelligent AI assistants that handle routine tasks, manage schedules and reminders, automate workflows, and streamline client interactions. These are flexible digital helpers that work 24/7 and save your time.'
  },
  // === CREATE CARDS TEXTS ===
  CARD_WEB_BG: {
    ru: 'Доменое имя',
    en: 'Domain name'
  },
  CARD_WEB_TEXT: {
    ru: 'Помогаю выбрать и зарегистрировать доменное имя, настроить DNS и разместить сайт на надёжном хостинге. Ваш проект появляется в сети быстро и без лишних хлопот.',
    en: 'I help select and register a domain name, configure DNS, and deploy your site on a reliable hosting. Your project goes online quickly and hassle-free.'
  },

  CARD_SERVER_BG: {
    ru: 'Конфигурация',
    en: 'Configuration'
  },
  CARD_SERVER_TEXT: {
    ru: 'Настраиваю сайт так, чтобы он был полностью функционален: подключение аналитики, формы обратной связи, интеграции с сервисами.',
    en: 'I configure the site to be fully functional: analytics setup, contact forms, service integrations.'
  },

  CARD_SUPPORT_BG: {
    ru: 'Поддержка',
    en: 'Support'
  },
  CARD_SUPPORT_TEXT: {
    ru: 'Обеспечиваю сопровождение сайта после запуска: обновления, исправления ошибок, оптимизация скорости и безопасности. Вы спокойно развиваете бизнес, пока сайт работает без сбоев.',
    en: 'I provide ongoing site support after launch: updates, bug fixes, speed and security optimization. You can focus on growing your business while your site runs smoothly.'
  },


};

export const l10n = (() => {
  let currentLang = 'ru';

  return {
    init(lang) {
      currentLang = lang || currentLang;
      this.initDOM();
    },

    initDOM() {
      document.querySelectorAll('[l10n]').forEach(el => {
        const key = el.getAttribute('l10n');
        const text = dict[key]?.[currentLang] || key; // если ключа нет — вставляем имя
        el.textContent = text;
      });
    },

    get(key) {
      return dict[key]?.[currentLang] || key;
    },

    addTranslations(newDict) {
      Object.assign(dict, newDict);
      this.initDOM();
    }
  };
})();