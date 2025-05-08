import { onEscapeKey, onEnterKey } from './util.js';
import { isValid } from './validation.js';
import { resetEffect } from './slider.js';
import { initScale } from './scale.js';
import { sendData } from './api.js';

const fileUploader = document.querySelector('.img-upload__input');
const photoEdit = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const image = document.querySelector('.img-upload__preview img');

initScale();

const closeForm = () => {
  photoEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  image.style.transform = 'scale(1)';
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

const closeOnEscape = (evt) => {
  if (onEscapeKey(evt)) {
    closeForm();
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
  }
};

const createErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', errorMessage);

  errorMessage.querySelector('.error__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    errorMessage.remove();
  });
  errorMessage.addEventListener('click', (evt) => {
    if (!evt.target.closest('.sucess__inner')) {
      errorMessage.remove();
    }
  });
};

const changeUploadedPhoto = () => {
  photoEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeOnClick);
  closeFormButton.addEventListener('keydown', closeOnEnter);
};

fileUploader.addEventListener('change', (evt) => {
  evt.preventDefault();
  const file = fileUploader.files[0];
  const fileUrl = URL.createObjectURL(file);
  if (file && file.type.startsWith('image/')) {
    image.src = fileUrl;
    changeUploadedPhoto();
  } else {
    createErrorMessage();
  }
});

document.addEventListener('keydown', closeOnEscape);

const createSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', successMessage);
  successMessage.querySelector('.success__button').addEventListener('click', (evt) => {
    evt.preventDefault();
    successMessage.remove();
  });
  successMessage.addEventListener('click', (evt) => {
    if (!evt.target.closest('.sucess__inner')) {
      successMessage.remove();
    }
  });
};

form.addEventListener('submit', (evt) => {
  const valid = isValid();

  evt.preventDefault();
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';

  if (valid) {
    sendData(form)
      .then(() => {
        createSuccessMessage();
        closeForm();
        resetEffect();
      })
      .catch(() => {
        createErrorMessage();
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
