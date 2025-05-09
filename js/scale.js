import { SCALE_MAX_VALUE, SCALE_MIN_VALUE, SCALE_STEP, SCALE_FACTOR, SCALE_MULTIPLIER } from './constants.js';

const scale = document.querySelector('.scale__control--value');
const more = document.querySelector('.scale__control--bigger');
const less = document.querySelector('.scale__control--smaller');
const image = document.querySelector('.img-upload__preview img');

const reduceScale = () => {
  let value = parseInt(scale.value, 10) * SCALE_FACTOR;
  if (value > SCALE_MIN_VALUE) {
    value -= SCALE_STEP;
    image.style.transform = `scale(${value})`;
    scale.value = `${Number(value) * SCALE_MULTIPLIER}%`;
  }
};

const increaseScale = () => {
  let value = parseInt(scale.value, 10) * SCALE_FACTOR;

  if (SCALE_MAX_VALUE > value) {
    value += SCALE_STEP;
    image.style.transform = `scale(${value})`;
    scale.value = `${Number(value) * SCALE_MULTIPLIER}%`;
  }
};

export const initScale = () => {
  more.addEventListener('click', increaseScale);
  less.addEventListener('click', reduceScale);
};


