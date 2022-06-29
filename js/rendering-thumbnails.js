import { makePhotos } from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const renderPhotos = (count) => {
  const arrayPhotos = makePhotos(count);
  arrayPhotos.forEach(({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__comments').textContent = comments;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    const imageAddress = pictureElement.querySelector('.picture__img');
    imageAddress.setAttribute('src', url);
    similarListFragment.appendChild(pictureElement);
  });
  return picturesList.appendChild(similarListFragment);
};

export { renderPhotos };
