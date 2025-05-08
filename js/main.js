import { getData } from './api.js';
import { initFilters } from './filter.js';
import { renderPhotos } from './render.js';
import { showAlert } from './util.js';
import './form.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    initFilters(photos);
  })
  .catch(() => {
    showAlert();
  });


