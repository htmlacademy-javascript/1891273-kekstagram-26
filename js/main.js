const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

const ADRESS = [
  'photos/1.jpg',
  'photos/2.jpg',
  'photos/3.jpg',
  'photos/4.jpg',
  'photos/5.jpg',
  'photos/6.jpg',
  'photos/7.jpg',
  'photos/8.jpg',
  'photos/9.jpg',
  'photos/10.jpg',
  'photos/11.jpg',
  'photos/12.jpg',
  'photos/13.jpg',
  'photos/14.jpg',
  'photos/15.jpg',
  'photos/16.jpg',
  'photos/17.jpg',
  'photos/18.jpg',
  'photos/19.jpg',
  'photos/20.jpg',
  'photos/21.jpg',
  'photos/22.jpg',
  'photos/23.jpg',
  'photos/24.jpg',
  'photos/25.jpg'
];

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

getRandomInt(1, 10);

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('Комментарий', 140);

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const createListComments = () => ({
  id: getRandomInt(0, 135),
  avatar: `img/avatar-${  getRandomInt(0, 6)  }.svg`,
  message: getRandomArrayElement(TEXT_COMMENTS),
  name: getRandomArrayElement(NAMES_AUTHORS),
});
