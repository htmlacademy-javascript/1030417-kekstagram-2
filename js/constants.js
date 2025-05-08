export const FILTERS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};
export const FILTERS_SETTINGS = {
  'chrome': {
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1
  },
  'sepia': {
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1
  },
  'marvin': {
    range: { min: 0, max: 100 },
    step: 1,
    start: 100
  },
  'phobos': {
    range: { min: 0, max: 3 },
    step: 0.1,
    start: 3
  },
  'heat': {
    range: { min: 1, max: 3 },
    step: 0.1,
    start: 3
  },
  'none': {
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1
  },
};
export const RANDOM_PHOTOS_COUNT = 10;
export const SCALE_MIN_VALUE = 0.25;
export const SCALE_MAX_VALUE = 1;
export const SCALE_STEP = 0.25;
export const COMMENTS_STEP = 5;
export const MESSAGE_CLOSING_TIME = 5000;
export const HASTAG_FORMULA = /^#[a-zа-яё0-9]{1,19}$/i;
export const MAX_HASHTAG_COUNT = 5;
export const MAX_DESCRIPTION = 140;

