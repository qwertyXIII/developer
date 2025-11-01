// ===============================
// CustomCursor.js
// ===============================

export const CustomCursor = (() => {
    let cursor = null;
    let stateClasses = {}; // { hover: 'className', click: 'className' }
    let animationFrameId = null;

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    let afterX = 0;
    let afterY = 0;

    const defaultSpeed = 0.15;
    const afterSpeed = 0.4;

    // обработчики
    let onClick = null;
    let onRelease = null;
    let onHoverIn = null;
    let onHoverOut = null;
    let onMouseMove = null;

    function animateCursor() {
        if (!cursor) return;

        posX += (mouseX - posX) * defaultSpeed;
        posY += (mouseY - posY) * defaultSpeed;

        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0) translate(-50%, -50%)`;

        // Плавное движение ::after
        const computedStyle = getComputedStyle(cursor, '::after');
        if (computedStyle && computedStyle.content && computedStyle.content !== 'none') {
            afterX += (posX - afterX) * afterSpeed;
            afterY += (posY - afterY) * afterSpeed;
            cursor.style.setProperty('--after-x', `${afterX - posX}px`);
            cursor.style.setProperty('--after-y', `${afterY - posY}px`);
        }

        animationFrameId = requestAnimationFrame(animateCursor);
    }

    function ensureCursorVisible(el) {
        if (!el) return;
        Object.assign(el.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '9999',
            pointerEvents: 'none',
            display: 'block',
            willChange: 'transform',
        });
    }

    return {
        /**
         * Инициализация курсора
         * @param {HTMLElement} newCursor — элемент курсора
         * @param {object} states — { hover, click }
         */
        init(newCursor, states = {}) {
            if (!newCursor) return;

            // Убираем старый курсор, если есть
            this.destroy();

            cursor = newCursor;
            stateClasses = states;

            ensureCursorVisible(cursor);

            document.body.style.cursor = 'none';

            // Движение мыши
            onMouseMove = (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            };
            document.addEventListener('mousemove', onMouseMove);

            // Клики
            onClick = () => {
                if (stateClasses.click) cursor.classList.add(stateClasses.click);
            };
            onRelease = () => {
                if (stateClasses.click) cursor.classList.remove(stateClasses.click);
            };
            document.addEventListener('mousedown', onClick);
            document.addEventListener('mouseup', onRelease);

            // Hover
            onHoverIn = () => {
                if (stateClasses.hover) cursor.classList.add(stateClasses.hover);
            };
            onHoverOut = () => {
                if (stateClasses.hover) cursor.classList.remove(stateClasses.hover);
            };

            // Навешиваем hover только на интерактивные элементы
            document.querySelectorAll('a, button, .hover-target, input, textarea').forEach((el) => {
                el.addEventListener('mouseenter', onHoverIn);
                el.addEventListener('mouseleave', onHoverOut);
            });

            animationFrameId = requestAnimationFrame(animateCursor);
        },

        /**
         * Удаление курсора и восстановление стандартного
         */
        destroy() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }

            if (onMouseMove) document.removeEventListener('mousemove', onMouseMove);
            if (onClick) document.removeEventListener('mousedown', onClick);
            if (onRelease) document.removeEventListener('mouseup', onRelease);

            document.querySelectorAll('a, button, .hover-target, input, textarea').forEach((el) => {
                if (onHoverIn) el.removeEventListener('mouseenter', onHoverIn);
                if (onHoverOut) el.removeEventListener('mouseleave', onHoverOut);
            });

            onMouseMove = null;
            onClick = null;
            onRelease = null;
            onHoverIn = null;
            onHoverOut = null;

            if (cursor) cursor.style.display = 'none';
            cursor = null;

            document.body.style.cursor = '';
        },
    };
})();