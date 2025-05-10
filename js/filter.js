import { renderPhotos } from './render.js';
import { FILTERS } from './constants.js';
import { debounce } from './util.js';

const form = document.querySelector('.img-filters__form');

let localPhotos;

const debouncedRender = debounce(renderPhotos);

const changeActiveFilter = (target) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  target.classList.add('img-filters__button--active');
};

const getRandomPhotos = () => [...localPhotos].sort(() => Math.random() - 0.5).slice(0, 10);

const sortByCommentsAmmount = (a, b) => {
  const photoA = a.comments.length;
  const photoB = b.comments.length;

  return photoB - photoA;
};

const getPopularPhotos = () => localPhotos.slice().sort(sortByCommentsAmmount);

const filtersActions = {
  [FILTERS.DEFAULT]: () => localPhotos,
  [FILTERS.DISCUSSED]: getPopularPhotos,
  [FILTERS.RANDOM]: getRandomPhotos
};

export const enableFilters = (photos) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  localPhotos = [...photos];
};

form.addEventListener('click', ({ target }) => {
  const button = target.closest('.img-filters__button');
  if (button) {
    changeActiveFilter(target);
    debouncedRender(filtersActions[target.id]());
  }

});

export { getRandomPhotos, getPopularPhotos, changeActiveFilter };
