import { renderBigImage } from './image-popup-window.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const NUMBER_RANDOM_PICTURES = 10;

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const similarListFragment = document.createDocumentFragment();

const getLengthComments = (arr) => {
  const comments = arr.comments;
  const commentsLength = comments.length;
  return commentsLength;
};

const sortDescendingOrder = (first, next) => {
  const rankA = getLengthComments(first);
  const rankB = getLengthComments(next);

  return rankB - rankA;
};

const getImageId = (arr) => arr.id;

const sortAscendingOrder = (first, next) => {
  const rankA = getImageId(first);
  const rankB = getImageId(next);

  return rankA - rankB;
};

const filterSettings = {
  default: (array) => array.sort(sortAscendingOrder),
  random:  (array) => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array.slice(array, NUMBER_RANDOM_PICTURES);
  },
  popular: (array) => array.sort(sortDescendingOrder),
};

const openFilter = () => {
  imageFilters.classList.remove('img-filters--inactive');
};

const makeButtonsInactive = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const renderPhotos = (picture) => {
  const pictureShown = picturesList.querySelectorAll('.picture');
  pictureShown.forEach((photo) => photo.remove());
  picture.forEach(({url, likes, comments, description}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    const imageAddress = pictureElement.querySelector('.picture__img');
    imageAddress.setAttribute('src', url);
    similarListFragment.appendChild(pictureElement);
    pictureElement.addEventListener('click', () => renderBigImage({url, likes, comments, description}));
  });
  picturesList.appendChild(similarListFragment);
  openFilter();
};

const selectFilter = (images) => {
  filterButtons.forEach((button) => {
    button.addEventListener('click', debounce((evt) => {
      makeButtonsInactive();
      const filterButton = evt.target;
      filterButton.classList.add('img-filters__button--active');
      const viewType = filterButton.dataset.sorting;
      const getPictures = filterSettings[viewType];
      const pictures = getPictures(images);
      renderPhotos(pictures);
    }, RERENDER_DELAY));
  });};

export { renderPhotos, openFilter, selectFilter };

