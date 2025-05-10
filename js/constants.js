export const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
export const FILTERS_SETTINGS = {
  'chrome': {
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    style: 'grayscale',
    unit: ''
  },
  'sepia': {
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    style: 'sepia',
    unit: ''
  },
  'marvin': {
    range: { min: 0, max: 100 },
    step: 1,
    start: 100,
    style: 'invert',
    unit: '%'
  },
  'phobos': {
    range: { min: 0, max: 3 },
    step: 0.1,
    start: 3,
    style: 'blur',
    unit: 'px'
  },
  'heat': {
    range: { min: 1, max: 3 },
    step: 0.1,
    start: 3,
    style: 'brightness',
    unit: ''
  },
  'none': {
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1,
    style: '',
    unit: ''
  },
};
export const MESSAGES = {
  success: document.querySelector('#success').content.querySelector('.success'),
  error: document.querySelector('#error').content.querySelector('.error'),
};

export const SCALE_MIN_VALUE = 0.25;
export const SCALE_MAX_VALUE = 1;
export const SCALE_STEP = 0.25;
export const SCALE_FACTOR = 0.01;
export const SCALE_MULTIPLIER = 100;
export const COMMENTS_STEP = 5;
export const MESSAGE_CLOSING_TIME = 5000;
export const HASTAG_FORMULA = /^#[a-zа-яё0-9]{1,19}$/i;
export const MAX_HASHTAG_COUNT = 5;
export const MAX_DESCRIPTION = 140;

