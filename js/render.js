import { photos } from "./data";

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const picturesBlock = document.querySelector('.pictures');

const renderPhotos = (photos) => {
  photos.forEach(photo => {
    const {url, description, comments, likes} = photo;
    const createdPhoto = pictureTemplate.cloneNode(true);
    createdPhoto.querySelector('.picture__img').src = url;
    createdPhoto.querySelector('.picture__img').alt = description;
    createdPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    createdPhoto.querySelector('.picture__likes').textContent = likes;
    createdPhoto.dataset.id = photo.id;
    fragment.append(createdPhoto);
  });

  picturesBlock.append(fragment);
}

export {renderPhotos}

