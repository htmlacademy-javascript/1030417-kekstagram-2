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

const checkForNoEffects = () => {
  const selectedEffect = document.querySelector('input[name="effect"]:checked');
  if (selectedEffect && selectedEffect.value === 'none') {
    sliderBox.classList.add('hidden');
  } else {
    sliderBox.classList.remove('hidden');
  }
};

const updateSlider = (effect) => {
  sliderElement.noUiSlider.updateOptions(FILTERS_SETTINGS[effect]);
};

const applyFilter = (value) => {
  const { style, unit } = FILTERS_SETTINGS[currentEffect];
  image.style.filter = `${style}(${value}${unit})`;
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

export { updateSlider, resetEffect, checkForNoEffects };
