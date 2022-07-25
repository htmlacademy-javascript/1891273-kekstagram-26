import { renderBigImage } from './image-popup-window.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imageFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const similarListFragment = document.createDocumentFragment();

const compareLengthComments = (arr) => {
  const commentsArray = arr.comments;
  const commentsLength = commentsArray.length;
  return commentsLength;
};

const sortingPicture = (first, next) => {
  const rankA = compareLengthComments(first);
  const rankB = compareLengthComments(next);

  return rankB - rankA;
};

const filterSettings = {
  default: (arr) => arr,
  random: 'shuffle',
  popular: (arr) => arr.sort(sortingPicture),
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
    button.addEventListener('click', (evt) => {
      makeButtonsInactive();
      const filterButton = evt.target;
      filterButton.classList.add('img-filters__button--active');
      const viewType = filterButton.dataset.sorting;
      const getPictures = filterSettings[viewType];
      const pictures = getPictures(images);
      renderPhotos(pictures);
    });
  });
};

export { renderPhotos, openFilter, selectFilter };
