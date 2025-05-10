import { MESSAGE_CLOSING_TIME } from './constants.js';

const getRandomIntegerInRange = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  return Math.round(Math.random() * (upper - lower) + lower);
};

const checkForEnter = (evt) => evt.key === 'Enter';

export const showAlert = () => {
  const errorMessage = document.querySelector('#data-error').content.querySelector('.data-error');
  document.body.insertAdjacentElement('beforeend', errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, MESSAGE_CLOSING_TIME);
};

export function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomIntegerInRange,
  checkForEnter
};
