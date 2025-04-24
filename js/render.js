import { photos } from "./data";

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesBlock = document.querySelector('.pictures');

const renderPhotos = () => {
  photos.forEach(photo => {
    const {url, likes, description} = photo;
    const createdPhoto = pictureTemplate.cloneNode(true);
    createdPhoto.querySelector('.picture__img').src = url;
    createdPhoto.querySelector('.picture__img').alt = description;
    createdPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    createdPhoto.querySelector('.picture__likes').textContent = likes;
    createdPhoto.dataset.id = photo.id;
    fragment.append(createdPhoto);
  })

  return fragment;
}

const renderComments = (photo) => {
  const container = document.createDocumentFragment();
  const template = document.querySelector('.social__comment');
  for (let i = 0; i<photo.comments.length; i++) {
    const comment = template.cloneNode(true);
    container.append(comment);
    comment.querySelector('.social__picture').src = photo.comments[i].avatar;
    comment.querySelector('.social__picture').alt = photo.comments[i].name;
    comment.querySelector('.social__text').textContent = photo.comments[i].message;
  }
  return container;
}

picturesBlock.append(renderPhotos());

export {picturesBlock, renderComments}

