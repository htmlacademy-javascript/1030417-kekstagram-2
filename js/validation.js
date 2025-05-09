import { MAX_DESCRIPTION, MAX_HASHTAG_COUNT } from './constants.js';
import { HASTAG_FORMULA } from './constants.js';

const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const checkDescription = (value) => value.length <= MAX_DESCRIPTION;
const createHashtags = (text) => text.toLowerCase().split(' ').filter((item) => item.length);

const checkHashtags = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.every((item) => HASTAG_FORMULA.test(item));
};

const compareHashtags = (value) => {
  const hashtags = createHashtags(value);
  return [...new Set(hashtags)].length === hashtags.length;
};

const countHashtags = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
};

pristine.addValidator(
  description,
  checkDescription,
  `Допустимая длина комментария-не больше ${MAX_DESCRIPTION} символов`
);

pristine.addValidator(
  hashtag,
  checkHashtags,
  'Невалидный хештег'
);

pristine.addValidator(
  hashtag,
  countHashtags,
  `Не более ${MAX_HASHTAG_COUNT} хештегов`
);

pristine.addValidator(
  hashtag,
  compareHashtags,
  'Недопустимо повторение хештегов'
);

const isValid = () => {
  const result = pristine.validate();
  if (result) {
    pristine.reset();
    const errorElements = document.querySelectorAll('.img-upload__field-wrapper--error');
    errorElements.forEach((errorElement) => {
      errorElement.classList.remove('img-upload__field-wrapper--error');
    });
  }

  return result;
};

export { isValid };
