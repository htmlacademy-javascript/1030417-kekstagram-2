import { getData } from './api.js';
import { initFilters } from './filter.js';
import { renderPhotos } from './render.js';
import { showAlert } from './util.js';
import './form.js';

window.addEventListener('load', () => {
  getData()
    .then((photos) => {
      renderPhotos(photos);
      initFilters(photos);
    })
    .catch(() => {
      showAlert();
      throw new Error('Ошибка');
    });
});
