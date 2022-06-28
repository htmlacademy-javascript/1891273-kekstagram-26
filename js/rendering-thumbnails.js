import { makePhotos } from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const makePictures = makePhotos();

const similarListFragment = document.createDocumentFragment();

makePictures.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__comments').textContent = comments;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  const imageAddress = pictureElement.querySelector('.picture__img');
  imageAddress.setAttribute('src', url);
  similarListFragment.appendChild(pictureElement);
});
picturesList.appendChild(similarListFragment);
