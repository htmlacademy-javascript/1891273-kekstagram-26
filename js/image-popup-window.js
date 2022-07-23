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
const commentList = popupImage.querySelector('.social__comments');
const commentsCount = popupImage.querySelector('.comments-count');
const closePopupButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsUploadButton = document.querySelector('.social__comments-loader');
const commentsNumberText = document.querySelector('.comments-number');
const commentsNumber = popupImage.querySelector('.comments-number');

const getCommentsData = (comment) => {
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

const createComments = (start, end, comments) => {
  const showedComments = comments.slice(start, end);
  const commentsArray = showedComments.map((comment) => getCommentsData(comment));
  const fragment = document.createDocumentFragment();
  for (let i = 0; i <= commentsArray.length - 1; i++) {
    fragment.append(commentsArray[i]);
  }
  return fragment;
};

const renderComments = (start, end, comments) => {
  const fragment =  createComments(start, end, comments);
  commentList.append(fragment);
  const numberVisibleСomments = document.querySelectorAll('.social__comment');
  commentsNumber.textContent = numberVisibleСomments.length;
  if (end > numberVisibleСomments.length && end !== COMMENTS_STEP) {
    commentsUploadButton.style.visibility = 'hidden';
  } else {
    commentsUploadButton.style.visibility = '';
  }
};

const renderBigImage = ({url, likes, comments, description}) => {
  let commentsLimit = 5;
  let commentStart = 0;
  popupImage.classList.remove('hidden');
  image.setAttribute('src', url);
  popupImage.querySelector('.likes-count').textContent = likes;
  popupImage.querySelector('.comments-count').textContent = NUMBERS_OF_COMMENTS + NUMBERS_OF_READY_COMMENTS;
  popupImage.querySelector('.social__caption').textContent = description;
  commentsCount.textContent = comments.length;
  commentList.innerHTML = '';
  renderComments(commentStart, commentsLimit, comments);

  commentsUploadButton.addEventListener('click', () => {
    commentStart += COMMENTS_STEP;
    commentsLimit += COMMENTS_STEP;
    renderComments(commentStart, commentsLimit, comments);
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
