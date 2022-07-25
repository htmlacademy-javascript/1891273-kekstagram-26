import { renderBigImage } from './image-popup-window.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const renderPhotos = (picture) => {
  picture.forEach(({url, likes, comments, description}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    const imageAddress = pictureElement.querySelector('.picture__img');
    imageAddress.setAttribute('src', url);
    similarListFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => renderBigImage({url, likes, comments, description}));
  });
  return picturesList.appendChild(similarListFragment);
};

export { renderPhotos };
