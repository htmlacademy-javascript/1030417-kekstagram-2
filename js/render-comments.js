import { COMMENTS_STEP } from './constants.js';

const commentListElement = document.querySelector('.social__comment');
const shownCommentsCounter = document.querySelector('.social__comment-shown-count');
const uploadMoreButton = document.querySelector('.social__comments-loader');

const createComments = (photo) => {
  const comments = [];
  photo.comments.forEach((comment) => {
    const newComment = commentListElement.cloneNode(true);
    newComment.querySelector('.social__picture').src = comment.avatar;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    comments.push(newComment);
  });

  return comments;
};

let currentCount = 0;

const renderComments = (comments, container) => {

  const renderedComments = comments.slice(currentCount, currentCount + COMMENTS_STEP);
  renderedComments.forEach((comment) => {
    container.append(comment);
  });


  currentCount += 5;

  if (currentCount <= comments.length) {
    shownCommentsCounter.textContent = currentCount;
  } else {
    shownCommentsCounter.textContent = comments.length;
  }

  if (currentCount >= comments.length) {
    uploadMoreButton.classList.add('hidden');
  }
};

const clearComments = (commentsList) => {
  commentsList.innerHTML = '';
  uploadMoreButton.classList.remove('hidden');
  currentCount = 0;
};

export { renderComments, createComments, clearComments, uploadMoreButton };
