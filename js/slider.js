import { FILTERS_SETTINGS } from './constants.js';

const effects = document.querySelectorAll('.effects__radio');
const sliderValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');
const sliderBox = document.querySelector('.img-upload__effect-level');
let currentEffect = 'none';

noUiSlider.create(sliderElement, {
  ...FILTERS_SETTINGS['none'],
  connect: 'lower'
});

sliderBox.classList.add('hidden');

const updateSlider = (effect) => {
  switch (effect) {
    case 'chrome':
    case 'sepia':
      sliderElement.noUiSlider.updateOptions(FILTERS_SETTINGS['chrome']);
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions(FILTERS_SETTINGS['marvin']);
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions(FILTERS_SETTINGS['phobos']);
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions(FILTERS_SETTINGS['heat']);
      break;
    case 'none':
    default:
      sliderElement.noUiSlider.updateOptions(FILTERS_SETTINGS['none']);
      break;
  }
};

const applyFilter = (value) => {
  switch (currentEffect) {
    case 'chrome':
      image.style.filter = `grayscale(${value})`;
      break;
    case 'sepia':
      image.style.filter = `sepia(${value})`;
      break;
    case 'marvin':
      image.style.filter = `invert(${value}%)`;
      break;
    case 'phobos':
      image.style.filter = `blur(${value}px)`;
      break;
    case 'heat':
      image.style.filter = `brightness(${value})`;
      break;
    case 'none':
    default:
      image.style.filter = '';
      break;
  }
};

sliderElement.noUiSlider.on('update', (value) => {
  const cleanValue = String(Number(value[0]));
  sliderValue.value = cleanValue;
  applyFilter(cleanValue);
});

effects.forEach((input) => {
  input.addEventListener('change', () => {
    currentEffect = input.value;
    updateSlider(currentEffect);
    sliderElement.classList.remove('hidden');
    if (currentEffect === 'none') {
      document.querySelector('.effect-level').classList.add('hidden');
      image.style.filter = '';
    } else {
      document.querySelector('.effect-level').classList.remove('hidden');
    }
  });
});

const resetEffect = () => {
  sliderElement.value = '';
  applyFilter('none');
  updateSlider('none');
  sliderBox.classList.add('hidden');
};

export { updateSlider, resetEffect };
