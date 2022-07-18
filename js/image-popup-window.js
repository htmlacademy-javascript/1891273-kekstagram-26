import { makeComments } from './data.js';
import { getRandomInt } from './util.js';

const MIN_NUMBER_COMMENTS = 3;
const MAX_NUMBER_COMMENTS = 14;
const NUMBERS_OF_COMMENTS = getRandomInt(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);
const NUMBERS_OF_READY_COMMENTS = 2;
const WIDTH_AVATAR = 35;
const HEIGHT_AVATAR = 35;

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
const commentsNumber = popupImage.querySelector('.comments-number');

const renderComment = (comment) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  const imageItem = document.createElement('img');
  imageItem.classList.add('social__picture');
  imageItem.setAttribute('src', comment.avatar);
  imageItem.setAttribute('alt', comment.name);
  imageItem.setAttribute('width', WIDTH_AVATAR);
  imageItem.setAttribute('height', HEIGHT_AVATAR);
  commentItem.appendChild(imageItem);
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  commentItem.appendChild(commentText);
  return commentItem;
};

const renderComments = (start, end) => {
  const showedComments = commentsData.slice(start, end);
  const comments = showedComments.map((comment) => renderComment(comment));
  for (let i = 0; i <= comments.length - 1; i++) {
    commentList.append(comments[i]);
  }
  commentsNumber.textContent = comments.length;
  if (end >= commentsData.length) {
    commentsUploadButton.style.visibility = 'hidden';
  }
};

const renderBigImage = (photoData) => {
  let commentsLimit = 5;
  let commentStart = 0;
  // popupImage.classList.remove('hidden');
  image.setAttribute('src', photoData.url);
  popupImage.querySelector('.likes-count').textContent = photoData.likes;
  popupImage.querySelector('.comments-count').textContent = NUMBERS_OF_COMMENTS + NUMBERS_OF_READY_COMMENTS;
  popupImage.querySelector('.social__caption').textContent = photoData.description;

  commentsCount.textContent = commentsData.length;
  commentList.innerHTML = '';
  renderComments(commentStart, commentsLimit);

  commentsUploadButton.addEventListener('click', () => {
    commentStart += COMMENTS_STEP;
    commentsLimit += COMMENTS_STEP;
    renderComments(commentStart, commentsLimit);
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
