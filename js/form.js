import { checkForEnter } from './util.js';
import { isValid } from './validation.js';
import { resetEffect, checkForNoEffects } from './slider.js';
import { enableScale } from './scale.js';
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
const defaultEffectInput = document.querySelector('input[name="effect"][value="none"]');

enableScale();

const canCloseForm = () => !(document.activeElement === hashtag || document.activeElement === description);

const closeForm = () => {
  photoEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  image.style.transform = 'scale(1)';
  resetEffect();
  if (defaultEffectInput) {
    defaultEffectInput.checked = true;
  }
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

const onEnterPress = (evt) => {
  if (checkForEnter(evt)) {
    closeForm();
  }
};

const onCloseButtonCLick = (evt) => {
  evt.preventDefault();
  closeForm();
};

const changeUploadedPhoto = () => {
  photoEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', onCloseButtonCLick);
  closeFormButton.addEventListener('keydown', onEnterPress);
  checkForNoEffects();
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
        closeForm();
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
