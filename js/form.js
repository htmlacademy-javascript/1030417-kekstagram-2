import {onEscapeKey, onEnterKey} from './util.js';
import { isValid } from './validation.js';
import { updateSlider, resetEffect } from './slider.js';

const SCALE_STEP = 0.25;
const SCALE_MIN_VALUE = 0.25;
const SCALE_MAX_VALUE = 1;

const scale = document.querySelector('.scale__control--value');
const more = document.querySelector('.scale__control--bigger');
const less = document.querySelector('.scale__control--smaller');
const fileUploader = document.querySelector('.img-upload__input');
const photoEdit = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');
const submitButton = document.querySelector('.img-upload__submit');
const image = document.querySelector('.img-upload__preview img');

fileUploader.addEventListener('change', (evt) => {
  evt.preventDefault();
  const file = fileUploader.files[0];
  const fileUrl = URL.createObjectURL(file);
  if (file && file.type.startsWith('image/')) {
    image.src = fileUrl;
    changeUploadedPhoto();
  } else {
    createErrorMessage()
  }
});

const closeOnEscape = (evt) => {
  if (onEscapeKey(evt)) {
    closeForm();
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove()
    }
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove()
    }
  }
};

document.addEventListener('keydown', closeOnEscape);

const closeOnEnter = (evt) => {
  if (onEnterKey(evt)) {
    closeForm();
  }
};

const closeOnClick = (evt) => {
  evt.preventDefault();
  closeForm();
}

const changeUploadedPhoto = (photo) => {
  photoEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeOnClick);
  closeFormButton.addEventListener('keydown', closeOnEnter);
}

const reduceScale = () => {
  let value = parseInt(scale.value)/100;
  if (value > SCALE_MIN_VALUE) {
    value -= SCALE_STEP;
    image.style.transform = `scale(${value})`;
    scale.value = `${value*100}%`;
  }
}

const increaseScale = () => {
  let value = parseInt(scale.value)/100;
  if (SCALE_MAX_VALUE > value) {
    value += SCALE_STEP;
    image.style.transform = `scale(${value})`;
    scale.value = `${value*100}%`;
  }
}

more.addEventListener('click', increaseScale)
less.addEventListener('click', reduceScale)

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
  })
}

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
  })
}

const closeForm = () => {
  photoEdit.classList.add('hidden');
  closeFormButton.removeEventListener('click', closeOnClick);
  closeFormButton.removeEventListener('click', closeOnEnter);
  document.body.classList.remove('modal-open');
  form.reset();
  image.style.transform = 'scale(1)';
}

form.addEventListener('submit', (evt) => {
  const valid = isValid();

  evt.preventDefault();
  submitButton.disabled = true;
  if (valid) {
    fetch('https://31.javascript.htmlacademy.pro/kekstagram', {
      method: 'POST',
      body: new FormData(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ошибка при отправке данных");
        }
        createSuccessMessage()
        closeForm();
        resetEffect();
      })
      .catch(err => {
        createErrorMessage()
      })
      .finally(() => {
        submitButton.disabled = false;
      })
  } else {
    submitButton.disabled = false;
  }
});
