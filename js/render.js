import { openPopup } from './popup.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');
let currentPhotos;

const clear = () => {
  document.querySelectorAll('.picture').forEach((item) => {
    item.remove();
  });
};

const renderPhotos = (photos) => {
  clear();
  currentPhotos = photos;
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const { url, description, likes } = photo;
    const createdPhoto = pictureTemplate.cloneNode(true);
    createdPhoto.querySelector('.picture__img').src = url;
    createdPhoto.querySelector('.picture__img').alt = description;
    createdPhoto.querySelector('.picture__comments').textContent = photo.comments.length;
    createdPhoto.querySelector('.picture__likes').textContent = likes;
    createdPhoto.dataset.id = photo.id;
    fragment.append(createdPhoto);
  });

  picturesBlock.append(fragment);
};

picturesBlock.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    openPopup(evt, currentPhotos);
  }
});

export { renderPhotos };

