import { makeComments } from './data.js';
import { getRandomInt } from './util.js';

const MIN_NUMBER_COMMENTS = 5;
const MAX_NUMBER_COMMENTS = 10;
const NUMBERS_OF_COMMENTS = getRandomInt(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);
const NUMBERS_OF_READY_COMMENTS = 2;

let commentsLimit = 5;
const COMMENTS_STEP = 5;

const popupImage = document.querySelector('.big-picture');
const imageBlock = popupImage.querySelector('.big-picture__img');
const image = imageBlock.querySelector('img');
const commentsData = makeComments(NUMBERS_OF_COMMENTS);
const commentList = popupImage.querySelector('.social__comments');
const commentsCount = popupImage.querySelector('.comments-count');
const closePopupButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsUploadButton = document.querySelector('.social__comments-loader');
const commentsNumberText = document.querySelector('.comments-number');

const renderComment = (comment) => `
 <li class="social__comment">
 <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
 <p class="social__text">${comment.message}</p>
 </li>
    `;

const renderComments = () => {
  const showedComments = commentsData.slice(0, commentsLimit);
  const comments = showedComments.map((comment) => renderComment(comment)).join('');
  commentList.innerHTML = comments;
  if (commentsLimit >= commentsData.length) {
    commentsUploadButton.style.visibility = 'hidden';
  }
};

const renderBigImage = (photoData) => {
  popupImage.classList.remove('hidden');
  image.setAttribute('src', photoData.url);
  popupImage.querySelector('.likes-count').textContent = photoData.likes;
  popupImage.querySelector('.comments-count').textContent = NUMBERS_OF_COMMENTS + NUMBERS_OF_READY_COMMENTS;
  popupImage.querySelector('.social__caption').textContent = photoData.description;

  commentsCount.innerHTML = commentsData.length;

  renderComments();

  commentsUploadButton.addEventListener('click', () => {
    commentsLimit += COMMENTS_STEP;
    renderComments();
    const numberComment = document.querySelectorAll('.social__comment');
    commentsNumberText.textContent = numberComment.length;
  });
};

closePopupButton.addEventListener('click', () => {
  popupImage.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    popupImage.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export { renderBigImage };
