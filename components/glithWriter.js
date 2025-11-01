/**
 * Асинхронная функция глитч-печати одной строки
 * @param {HTMLElement} element - элемент, куда печатаем
 * @param {string} text - текст для печати
 * @param {object} options - { speed, glitchSpeed, randomChars }
 * @returns {Promise} - резолвится, когда строка напечатана
 */
export function glitchWriter(element, text, options = {}) {
  const randomChars =
    options.randomChars || '_)(;.,:%№!"^~<>}{|[]?/@$&*+=-';
  const speed = options.speed || 50;
  const glitchSpeed = options.glitchSpeed || 30;

  return new Promise(resolve => {
    let i = 0;

    function printNext() {
      if (i >= text.length) {
        resolve();
        return;
      }

      let count = 0;
      const maxGlitches = 3 + Math.floor(Math.random() * 5);

      const glitchInterval = setInterval(() => {
        element.textContent =
          text.slice(0, i) +
          randomChars.charAt(
            Math.floor(Math.random() * randomChars.length)
          );

        count++;
        if (count >= maxGlitches) {
          clearInterval(glitchInterval);
          element.textContent = text.slice(0, i + 1);
          i++;
          setTimeout(printNext, speed);
        }
      }, glitchSpeed);
    }

    printNext();
  });
}