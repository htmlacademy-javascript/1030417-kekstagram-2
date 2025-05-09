import { onEnterKey } from './util.js';
import { isValid } from './validation.js';
import { resetEffect } from './slider.js';
import { initScale } from './scale.js';
import { sendData } from './api.js';
import { MESSAGES } from './constants.js';
import { setEscControl, removeEscControl } from './escControl.js';

const fileUploader = document.querySelector('.img-upload__input');
const photoEdit = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const image = document.querySelector('.img-upload__preview img');
const hashtag = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

initScale();

const canCloseForm = () => !(document.activeElement === hashtag || document.activeElement === description);

const closeForm = () => {
  photoEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  image.style.transform = 'scale(1)';
};

const showMessage = (messageType) => {
  const message = MESSAGES[messageType].cloneNode(true);
  document.body.insertAdjacentElement('beforeend', message);
  message.querySelector(`.${messageType}__button`).addEventListener('click', (evt) => {
    evt.preventDefault();
    message.remove();
    removeEscControl();
  });
  message.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${messageType}__inner`)) {
      message.remove();
      removeEscControl();
    }
  });
  setEscControl(() => {
    message.remove();
  });
};

const closeOnEnter = (evt) => {
  if (onEnterKey(evt)) {
    closeForm();
  }
};

const closeOnClick = (evt) => {
  evt.preventDefault();
  closeForm();
};

const changeUploadedPhoto = () => {
  photoEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeOnClick);
  closeFormButton.addEventListener('keydown', closeOnEnter);
  setEscControl(closeForm, canCloseForm);
};

fileUploader.addEventListener('change', (evt) => {
  evt.preventDefault();
  const file = fileUploader.files[0];
  const fileUrl = URL.createObjectURL(file);
  if (file && file.type.startsWith('image/')) {
    image.src = fileUrl;
    changeUploadedPhoto();
  } else {
    throw new Error('Файл не подходит');
  }
});

form.addEventListener('submit', (evt) => {
  const valid = isValid();

  evt.preventDefault();
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';

  if (valid) {
    sendData(form)
      .then(() => {
        showMessage('success');
        resetEffect();
      })
      .catch(() => {
        showMessage('error');
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Опубликовать';
      });
  } else {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  }
});
