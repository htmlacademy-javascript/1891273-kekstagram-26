const DEFINITION = [
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

const NAMES_AUTHORS = [
  'Игорь',
  'Света',
  'Катя',
  'Маша',
  'Женя',
  'Стас',
  'Миша'
];

const SIMILAR_DESCRIPTIONS_PHOTOS_COUNT = 25;
const NUMBERS_OF_COMMENTS = 4;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    const substitution = min;
    min = max;
    max = substitution;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createListComments = (id) => ({
  id,
  avatar: `img/avatar-${  getRandomInt(0, 6)  }.svg`,
  message: getRandomArrayElement(TEXT_COMMENTS),
  name: getRandomArrayElement(NAMES_AUTHORS),
});

const makeComments = (count) => {
  const similarComments = [];
  for (let i = 1; i <= count; i++) {
    similarComments.push(createListComments(i));
  }

  return similarComments;
};

const getDescriptionPhotos = (id) => ({
  id,
  url: `photos/${  id  }.jpg`,
  description: getRandomArrayElement(DEFINITION),
  likes: getRandomInt(15, 200),
  comments: makeComments(NUMBERS_OF_COMMENTS)
});

const makePhotos = (count) => {
  const similarPhotos = [];
  for (let i = 1; i <= count; i++) {
    similarPhotos.push(getDescriptionPhotos(i));
  }

  return similarPhotos;
};

makePhotos(SIMILAR_DESCRIPTIONS_PHOTOS_COUNT);

//Вспомогательная функция, которая еще не задействована:

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('Комментарий', 140);
