//Функкция выдачи случайного числа из заданного диапазона, включая начальное и конечное значение
const ALERT_SHOW_TIME = 5000;


const getRandomInteger = (startOfRange, endOfRange) => {

  //Проверка границ диапазона на то, что они не отрицательные и начало больше конца
  if(startOfRange < 0 || endOfRange < 0 || startOfRange >= endOfRange) {
    throw new Error('Неверные значения границ диапазона, введите заново');
  }

  startOfRange = Math.ceil(startOfRange);
  endOfRange = Math.floor(endOfRange);
  return Math.floor(Math.random() * (endOfRange - startOfRange + 1)) + startOfRange;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

//Проверка на нажатие Escape
const isEscapeKey = (evt) => (evt.key === 'Escape');

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, isEscapeKey, debounce, showAlert};
