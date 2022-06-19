import {getRandomArrayElement} from './util.js';
import {getRandomInt} from './util.js';

const SIMILAR_DESCRIPTIONS_PHOTOS_COUNT = 25;
const NUMBERS_OF_COMMENTS = 4;
const MAXIMUM_AVATAR_NUMBER = 6;
const MINIMUM_NUMBER_OF_LIKES = 1;
const MAXIMUM_NUMBER_OF_LIKES = 200;

const DEFINITIONS = [
  'Красиво!',
  'Странное искуство',
  'Милашки',
  'Гуляем',
  'Семья',
  'Любимый',
  'Сестренка',
  'Друзья',
  'Интересно, но факт',
  'Почему бы и ДА',
  'Все прекрасно',
  'Кексик',
  'Мамуля',
  'Папуля',
  'Зачем?',
  'Живое фото'
];

const TEXT_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES_OF_AUTHORS = [
  'Игорь',
  'Света',
  'Катя',
  'Маша',
  'Женя',
  'Стас',
  'Миша'
];

const generateCommentData = (id) => ({
  id,
  avatar: `img/avatar-${  getRandomInt(0, MAXIMUM_AVATAR_NUMBER)  }.svg`,
  message: getRandomArrayElement(TEXT_COMMENTS),
  name: getRandomArrayElement(NAMES_OF_AUTHORS),
});

const makeComments = (count) => {
  const comments = [];
  for (let i = 1; i <= count; i++) {
    const commentIndex = generateCommentData(i);
    comments.push(commentIndex);
  }

  return comments;
};

const getPhotosDescription = (id) => ({
  id,
  url: `photos/${  id  }.jpg`,
  description: getRandomArrayElement(DEFINITIONS),
  likes: getRandomInt(MINIMUM_NUMBER_OF_LIKES, MAXIMUM_NUMBER_OF_LIKES),
  comments: makeComments(NUMBERS_OF_COMMENTS)
});

const makePhotos = (count) => {
  const similarPhotos = [];
  for (let i = 1; i <= count; i++) {
    const photoIndex = getPhotosDescription(i);
    similarPhotos.push(photoIndex);
  }

  return similarPhotos;
};

makePhotos(SIMILAR_DESCRIPTIONS_PHOTOS_COUNT);
