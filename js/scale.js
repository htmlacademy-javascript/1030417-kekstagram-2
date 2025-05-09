import { SCALE_MAX_VALUE, SCALE_MIN_VALUE, SCALE_STEP } from './constants.js';

const scale = document.querySelector('.scale__control--value');
const more = document.querySelector('.scale__control--bigger');
const less = document.querySelector('.scale__control--smaller');
const image = document.querySelector('.img-upload__preview img');

const reduceScale = () => {
  let value = parseInt(scale.value, 10) / 100;
  if (value > SCALE_MIN_VALUE) {
    value -= SCALE_STEP;
    image.style.transform = `scale(${value})`;
    scale.value = `${Number(value) * 100}%`;
  }
};

const increaseScale = () => {
  let value = parseInt(scale.value, 10) / 100;

  if (SCALE_MAX_VALUE > value) {
    value += SCALE_STEP;
    image.style.transform = `scale(${value})`;
    scale.value = `${Number(value) * 100}%`;
  }
};

export const initScale = () => {
  more.addEventListener('click', increaseScale);
  less.addEventListener('click', reduceScale);
};


