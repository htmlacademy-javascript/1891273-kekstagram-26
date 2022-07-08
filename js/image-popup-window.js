import { makeComments } from './data.js';
import { getRandomInt } from './util.js';

const MIN_NUMBER_COMMENTS = 5;
const MAX_NUMBER_COMMENTS = 10;
const NUMBERS_OF_COMMENTS = getRandomInt(MIN_NUMBER_COMMENTS, MAX_NUMBER_COMMENTS);
const NUMBERS_OF_READY_COMMENTS = 2;
const AVATAR_WIDTH = 35;
const AVATAR_HEIGHT = 35;
// const NUMBER_UPLOADED_COMMENTS = 5;

const popupImage = document.querySelector('.big-picture');
const imageBlock = popupImage.querySelector('.big-picture__img');
const image = imageBlock.querySelector('img');
const commentsData = makeComments(NUMBERS_OF_COMMENTS);
const commentList = popupImage.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const closePopupButton = document.querySelector('.big-picture__cancel');
const body = document.querySelector('body');
const commentsUploadButton = document.querySelector('.social__comments-loader');

// const groupComments = (array, numberElement) => {
//   const  downloadableComments = [];
//   for (let i = 0; i < array.length; i += numberElement) {
//     const arrayPart   = array.slice(i, i + numberElement);
//     downloadableComments.push(arrayPart);
//   }
//   return downloadableComments;
// };

const renderBigImage = (photoData) => {
  popupImage.classList.remove('hidden');
  image.setAttribute('src', photoData.url);
  popupImage.querySelector('.likes-count').textContent = photoData.likes;
  popupImage.querySelector('.comments-count').textContent = NUMBERS_OF_COMMENTS + NUMBERS_OF_READY_COMMENTS;
  popupImage.querySelector('.social__caption').textContent = photoData.description;
  commentsData.forEach(({avatar, name, message}) => {
    const comment = commentTemplate.cloneNode(true);
    const avatarItem = comment.querySelector('.social__picture');
    avatarItem.setAttribute('src', avatar);
    avatarItem.setAttribute('alt', name);
    avatarItem.setAttribute('width', AVATAR_WIDTH);
    avatarItem.setAttribute('height', AVATAR_HEIGHT);
    comment.querySelector('.social__text').textContent = message;
    comment.classList.add('hidden');
    commentList.appendChild(comment);
  });
  const comments = commentList.querySelectorAll('.social__comment');
  const arrayGroup = [];

  for (let i = 0; i < comments.length; i++) {
    arrayGroup.push(comments[i]);
  }
  for (let i = 0; i <= arrayGroup.length; i++) {
    commentsUploadButton.addEventListener('click', () => {
      arrayGroup[i].classList.remove('hidden');
      commentsUploadButton.classList.add('hidden');
    });
  }
  // const dividedArray = groupComments(arrayGroup, NUMBER_UPLOADED_COMMENTS);
  // console.log(dividedArray);
  // for (let i = 0; i <= dividedArray.length -1; i++) {
  //   const commentGroup = dividedArray[i];
  //   console.log(commentGroup);
  //   for (let j = 1; j <= commentGroup.length; j++) {
  //     commentsUploadButton.addEventListener('click', () => {
  //       commentGroup[i].classList.remove('hidden');
  //       // commentsUploadButton.classList.add('hidden');
  //     });
  //   }
  // }
  //   commentsUploadButton.addEventListener('click', () => {
  //     commentGroup[i].classList.remove('hidden');
  //     commentsUploadButton.classList.add('hidden');
  //   });
  // }

  // body.classList.add('modal-open');
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

export { renderBigImage, body };
