const effectField = document.querySelector('.effect-level__value');
const effects = document.querySelectorAll('.effects__radio');
const sliderValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');
let currentEffect = 'none';

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 1 },
  start: 0,
  step: 0.1,
  connect: 'lower'
});

const updateSlider = (effect) => {
  switch (effect) {
    case 'chrome':
    case 'sepia':
      sliderElement.noUiSlider.updateOptions({
        range: { min: 0, max: 1 },
        step: 0.1,
        start: 0
      });
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: { min: 0, max: 100 },
        step: 1,
        start: 0
      });
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: { min: 0, max: 3 },
        step: 0.1,
        start: 0
      });
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: { min: 1, max: 3 },
        step: 0.1,
        start: 1
      });
      break;
    case 'none':
    default:
      sliderElement.noUiSlider.updateOptions({
        range: { min: 0, max: 1 },
        step: 0.1,
        start: 0
      });
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
  sliderValue.value = value;
  applyFilter(value);
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
