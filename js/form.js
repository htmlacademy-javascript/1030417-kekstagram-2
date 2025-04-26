import {onEscapeKey, onEnterKey} from './util.js';

const fileUploader = document.querySelector('.img-upload__input');
const photoEdit = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

const hashtegRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

// const validHashtag = (value) => {
//   return hashtegRegExp.test(value);
// }

// const pristine = new Pristine(form);
// pristine.addValidator(hashtag, validHashtag, 'Невалидный хештег');

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

const validateForm = (evt) => {
  evt.preventDefault();
}


const changeUploadedPhoto = (photo) => {
  photoEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeOnClick);
  document.addEventListener('keydown', closeOnEscape);
  closeFormButton.addEventListener('keydown', closeOnEnter);
  form.addEventListener('submit', validateForm);
}



const closeForm = () => {
  photoEdit.classList.add('hidden');
  closeFormButton.removeEventListener('click', closeOnClick);
  closeFormButton.removeEventListener('click', closeOnEnter);
  document.removeEventListener('keydown', closeOnEscape);
  form.removeEventListener('submit', validateForm);
  document.body.classList.remove('modal-open');
  form.reset();
}
