import { getRandomIntegerInRange, getRandomArrayElement } from "./util.js";
import { renderPhotos } from "./render.js";

const RANDOM_PHOTOS_COUNT = 10;

const defaultPhotosButton = document.querySelector('#filter-default');
const randomPhotosButton = document.querySelector('#filter-random');
const popularPhotosButton = document.querySelector('#filter-discussed');
const picturesBlock = document.querySelector('.pictures');

const clearPreviousPhotos = () => {
  document.querySelectorAll('.picture').forEach(picture => picture.remove());
}

const changeActiveFilter = (target) => {
  document.querySelectorAll('.img-filters__button').forEach(button => button.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
}

const getRandomPhotos = (photos) => {
  let selectedPhotos = [];
  for (let i = 0; i < RANDOM_PHOTOS_COUNT; i++) {
    let selectedPhoto = getRandomArrayElement(photos);
    while (selectedPhotos.some(item => item === selectedPhoto)) {
      selectedPhoto = getRandomArrayElement(photos);
    }
    selectedPhotos.push(selectedPhoto);
  }
  clearPreviousPhotos();
  renderPhotos(selectedPhotos);
}

const sortByCommentsAmmount = (a, b) => {
  const photoA = a.comments.length;
  const photoB = b.comments.length;

  return photoB - photoA;
}

const getPopularPhotos = (photos) => {
  const selectedPhotos = photos.slice().sort(sortByCommentsAmmount);
  clearPreviousPhotos();
  renderPhotos(selectedPhotos)
}

export {getRandomPhotos, getPopularPhotos, changeActiveFilter, clearPreviousPhotos}
