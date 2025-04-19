import {getUniqueNumber, getRandomArrayElement, getRandomIntegerInRange} from './util.js';

const NUMBER_OF_PHOTOS = 25;
const MAX_NUMBER_OF_COMMENTS = 30;
const PHOTO_ID_MAX = 25;
const COMMENT_ID_MAX = 30;
const descriptions = ['Just vibes', 'Enjoy the ride.', 'Simplicity is the ultimate sophistication.', 'Stay wild, stay free.', 'Cheers to the good times.', 'Find joy in the ordinary.', 'New day, new adventures.'];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const names = ['John', 'Viktoria', 'Nancy', 'Christopher', 'Tom', 'Alyosha', 'Sergey', 'Konstantin']

const getComments = (commentsCount) => {
  const comments = [];
  const getCommentId = getUniqueNumber(1, COMMENT_ID_MAX);

  for (let i = 0; i < commentsCount; i++) {
    const comment = {
      id: getCommentId(),
      message: getRandomArrayElement(messages),
      avatar: `img/avatar-${getRandomIntegerInRange(1, 6)}.svg`,
      name: getRandomArrayElement(names),
    }

    comments.push(comment);
  }

  return comments;
}

const getPostId = getUniqueNumber(1, PHOTO_ID_MAX);

const getPhoto = () => {
  const id = getPostId();
  const photo = {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getRandomIntegerInRange(15, 200),
    comments: getComments(getRandomIntegerInRange(0, MAX_NUMBER_OF_COMMENTS)),
  }
  return photo;
}

const photos = Array.from({length: NUMBER_OF_PHOTOS}, getPhoto);
