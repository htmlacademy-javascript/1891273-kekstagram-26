import { makeComments } from './data.js';
import { getRandomInt } from './util.js';

const MIN_NUMBER_COMMENTS = 5;
const MAX_NUMBER_COMMENTS = 10;
const NUMBERS_OF_COMMENTS = getRandomInt(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);
const NUMBERS_OF_READY_COMMENTS = 2;
const widthAvatar = 35;
const heightAvatar = 35;

const popupImage = document.querySelector('.big-picture');
const imageBlock = popupImage.querySelector('.big-picture__img');
const image = imageBlock.querySelector('img');
const arrayComments = makeComments(NUMBERS_OF_COMMENTS);
const commentList = popupImage.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const buttonClosePopup = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');

const renderingBigImage = (photoData) => {
  popupImage.classList.remove('hidden');
  image.setAttribute('src', photoData.url);
  popupImage.querySelector('.likes-count').textContent = photoData.likes;
  popupImage.querySelector('.comments-count').textContent = NUMBERS_OF_COMMENTS + NUMBERS_OF_READY_COMMENTS;
  popupImage.querySelector('.social__caption').textContent = photoData.description;
  arrayComments.forEach(({avatar, name, message}) => {
    const commentItem = commentTemplate.cloneNode(true);
    const avatarItem = commentItem.querySelector('.social__picture');
    avatarItem.setAttribute('src', avatar);
    avatarItem.setAttribute('alt', name);
    avatarItem.setAttribute('width', widthAvatar);
    avatarItem.setAttribute('height', heightAvatar);
    commentItem.querySelector('.social__text').textContent = message;
    commentList.appendChild(commentItem);
  });
  const commentCounter = document.querySelector('.social__comment-count');
  commentCounter.classList.add('hidden');
  const uploadingNewComments = document.querySelector('.comments-loader');
  uploadingNewComments.classList.add('hidden');
  body.classList.add('modal-open');
};

buttonClosePopup.addEventListener('click', () => {
  popupImage.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    popupImage.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export { renderingBigImage };
