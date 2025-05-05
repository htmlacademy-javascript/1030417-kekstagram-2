import { NUMBER_OF_PHOTOS } from "./data.js";
import { renderPhotos } from "./render.js";
import { openPopup } from "./popup.js";
import { getRandomPhotos, getPopularPhotos, changeActiveFilter, clearPreviousPhotos } from "./filter.js";

const MESSAGE_CLOSING_TIME = 5000;

const picturesBlock = document.querySelector('.pictures');
const defaultPhotosButton = document.querySelector('#filter-default');
const randomPhotosButton = document.querySelector('#filter-random');
const popularPhotosButton = document.querySelector('#filter-discussed');

const getData = () => {
  return fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка');
      }
      return response.json(); // Возвращаем промис с данными
    });
}

getData()
  .then((photos) => {
    photos = photos.slice(0, NUMBER_OF_PHOTOS);
    renderPhotos(photos);
    picturesBlock.addEventListener('click', (evt) => {
      if (evt.target.closest('.picture')) {
        openPopup(evt, photos);
      }
    });
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    defaultPhotosButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      clearPreviousPhotos()
      changeActiveFilter(evt.target);
      renderPhotos(photos);
    })
    randomPhotosButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      changeActiveFilter(evt.target);
      getRandomPhotos(photos);
    });
    popularPhotosButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      changeActiveFilter(evt.target);
      getPopularPhotos(photos);
    });
  })
  .catch((err) => {
    const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
    const errorMessage = errorTemplate.cloneNode(true);
    document.body.insertAdjacentElement('beforeend', errorMessage);
    setTimeout(() => {
      errorMessage.remove();
    }, MESSAGE_CLOSING_TIME);
  });


