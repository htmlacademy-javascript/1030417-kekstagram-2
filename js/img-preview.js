const SCALE_STEP = 0.25;
const SCALE_MIN_VALUE = 0.25;
const SCALE_MAX_VALUE = 1;

const scale = document.querySelector('.scale__control--value');
const more = document.querySelector('.scale__control--bigger');
const less = document.querySelector('.scale__control--smaller');
const image = document.querySelector('.img-upload__preview img');


const reduceScale = () => {
  let value = parseInt(scale.value)/100;
  if (value > SCALE_MIN_VALUE) {
    value -= SCALE_STEP;
    image.style.transform = `scale(${value})`;
    scale.value = `${value*100}%`;
  }
}

const increaseScale = () => {
  let value = parseInt(scale.value)/100;
  if (SCALE_MAX_VALUE > value) {
    value += SCALE_STEP;
    image.style.transform = `scale(${value})`;
    scale.value = `${value*100}%`;
  }
}

more.addEventListener('click', increaseScale)
less.addEventListener('click', reduceScale)
