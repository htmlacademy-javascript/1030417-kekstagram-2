import {onEscapeKey, onEnterKey} from './util.js';
import { isValid } from './validation.js';

const fileUploader = document.querySelector('.img-upload__input');
const photoEdit = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');

fileUploader.addEventListener('change', (evt) => {
  evt.preventDefault();
  changeUploadedPhoto();
});

const closeOnEscape = (evt) => {
  if (onEscapeKey(evt)) {
    closeForm();
  }
};

const closeOnEnter = (evt) => {
  if (onEnterKey(evt)) {
    closeForm();
  }
};

const closeOnClick = (evt) => {
  evt.preventDefault();
  closeForm();
}

form.addEventListener('submit', (evt) => {
  const valid = isValid()
  if (!valid) {
    evt.preventDefault();
  }
});

const changeUploadedPhoto = (photo) => {
  photoEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeOnClick);
  document.addEventListener('keydown', closeOnEscape);
  closeFormButton.addEventListener('keydown', closeOnEnter);
}

const closeForm = () => {
  photoEdit.classList.add('hidden');
  closeFormButton.removeEventListener('click', closeOnClick);
  closeFormButton.removeEventListener('click', closeOnEnter);
  document.removeEventListener('keydown', closeOnEscape);
  document.body.classList.remove('modal-open');
  form.reset();
}
