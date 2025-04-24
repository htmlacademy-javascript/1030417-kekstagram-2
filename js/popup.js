import {onEscapeKey, onEnterKey} from './util.js';
import { photos } from './data.js';
import { picturesBlock, renderComments } from './render.js';

const popup = document.querySelector('.big-picture');
const popupCloseButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const uploadMoreButton = document.querySelector('.social__comments-loader');
const commentsCounter = document.querySelector('.social__comment-count');

const closeOnEscape = (evt) => {
  if (onEscapeKey(evt)) {
    closePopup();
  }
};

const closeOnEnter = (evt) => {
  if (onEnterKey(evt)) {
    closePopup();
  }
};

const openPopup = (evt) => {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', closeOnEscape);
  popupCloseButton.addEventListener('keydown', closeOnEnter)

  const picture = evt.target.closest('.picture');
  popup.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
  popup.querySelector('.big-picture__img').firstElementChild.src = picture.querySelector('.picture__img').src;
  const imgUrl = Number(picture.dataset.id);
  const photo = photos.find(p => {
    return imgUrl === p.id;
  });
  uploadMoreButton.classList.add('hidden');
  commentsCounter.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  popup.querySelector('.social__caption').textContent = photo.description;
  popup.querySelector('.social__comment-total-count').textContent = photo.comments.length;
  const comments = renderComments(photo);
  commentsList.innerHTML = '';
  commentsList.append(comments);

}



const closePopup = () => {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', closeOnEscape);
  popupCloseButton.removeEventListener('keydown', closeOnEnter)
  uploadMoreButton.classList.remove('hidden');
  commentsCounter.classList.remove('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

popupCloseButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

picturesBlock.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    openPopup(evt);
  }
});



