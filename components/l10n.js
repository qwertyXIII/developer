
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
    }
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