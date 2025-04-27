const HASTAG_FORMULA = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION = 140;

const form = document.querySelector('.img-upload__form');
const hashtag = document.querySelector('.text__hashtags');
const description = document.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const checkDescription = (value) => {
  return value.length <= MAX_DESCRIPTION;
}

const createHashtags = (text) => {
  return text.toLowerCase().split(' ').filter(item => item.length);
}

const checkHashtags = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.every(item => HASTAG_FORMULA.test(item));
}

const compareHashtags = (value) => {
  const hashtags = createHashtags(value);
  return [...new Set(hashtags)].length === hashtags.length
}

const countHashtags = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length <= MAX_HASHTAG_COUNT;
}

pristine.addValidator(
  description,
  checkDescription,
  `Допустимая длина комментария-не больше ${MAX_DESCRIPTION} символов`)

pristine.addValidator(
  hashtag,
  checkHashtags,
  'Невалидный хештег'
)

pristine.addValidator(
  hashtag,
  countHashtags,
  `Не более ${MAX_HASHTAG_COUNT} хештегов`
)

pristine.addValidator(
  hashtag,
  compareHashtags,
  `Недопустимо повторение хештегов`
)


const isValid = () => {
  return pristine.validate();
}

export {isValid}
