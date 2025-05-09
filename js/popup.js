import { onEnterKey } from './util.js';
import { renderComments, createComments, clearComments, uploadMoreButton } from './render-comments.js';
import { setEscControl } from './escControl.js';

const popup = document.querySelector('.big-picture');
const popupCloseButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
let comments;

const closePopup = () => {
  popup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearComments(commentsList);
};

const closeOnEnter = (evt) => {
  if (onEnterKey(evt)) {
    closePopup();
  }
};

const openPopup = (evt, data) => {
  popup.classList.remove('hidden');
  setEscControl(closePopup);
  popupCloseButton.addEventListener('keydown', closeOnEnter);
  const picture = evt.target.closest('.picture');
  popup.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
  popup.querySelector('.big-picture__img').firstElementChild.src = picture.querySelector('.picture__img').src;
  const imgUrl = Number(picture.dataset.id);
  const photo = data.find((p) => imgUrl === p.id);
  document.querySelector('body').classList.add('modal-open');
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  comments = createComments(photo);
  setEscControl(closePopup);
  clearComments(commentsList);
  renderComments(comments, commentsList);
};


uploadMoreButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  renderComments(comments, commentsList);
});

popupCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

export { openPopup };


