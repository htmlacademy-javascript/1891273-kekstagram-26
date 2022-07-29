const WIDTH_AVATAR = 35;
const HEIGHT_AVATAR = 35;
const escButtonNumber = 27;

const COMMENTS_STEP = 5;

const popupImageElement = document.querySelector('.big-picture');
const imageBlockElement = popupImageElement.querySelector('.big-picture__img');
const imageElement = imageBlockElement.querySelector('img');
const commentListElement = popupImageElement.querySelector('.social__comments');
const commentsCountElement = popupImageElement.querySelector('.comments-count');
const closePopupButtonElement = document.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentsUploadButtonElement = document.querySelector('.social__comments-loader');
const commentsNumberTextElement = document.querySelector('.comments-number');
const commentsNumberElement = popupImageElement.querySelector('.comments-number');

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
  commentListElement.append(fragment);
  const numberVisibleCommentsElements = document.querySelectorAll('.social__comment');
  commentsNumberElement.textContent = numberVisibleCommentsElements.length;
  if (commentsCountElement.textContent === commentsNumberTextElement.textContent) {
    commentsUploadButtonElement.style.visibility = 'hidden';
  } else {
    commentsUploadButtonElement.style.visibility = '';
  }
};

const renderBigImage = ({url, likes, comments, description}) => {
  let commentsLimit = 5;
  let commentStart = 0;
  popupImageElement.classList.remove('hidden');
  imageElement.setAttribute('src', url);
  popupImageElement.querySelector('.likes-count').textContent = likes;
  popupImageElement.querySelector('.comments-count').textContent = comments.length;
  popupImageElement.querySelector('.social__caption').textContent = description;
  commentsCountElement.textContent = comments.length;
  commentListElement.innerHTML = '';
  renderComments(commentStart, commentsLimit, comments);

  commentsUploadButtonElement.addEventListener('click', () => {
    commentStart += COMMENTS_STEP;
    commentsLimit += COMMENTS_STEP;
    renderComments(commentStart, commentsLimit, comments);
    const numberCommentElements = document.querySelectorAll('.social__comment');
    commentsNumberTextElement.textContent = numberCommentElements.length;
  });
};

closePopupButtonElement.addEventListener('click', () => {
  popupImageElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
});

document.addEventListener('keydown', (e) => {
  if (e.keyCode === escButtonNumber) {
    popupImageElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
});

export { renderBigImage };
