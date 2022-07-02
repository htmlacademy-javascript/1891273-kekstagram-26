import { renderBigImage } from './image-popup-window.js';
import { renderPhotos } from './rendering-thumbnails.js';
import { makePhotos } from './data.js';
import { getPhotosDescription } from './data.js';
import { getRandomInt } from './util.js';

const PHOTOS_COUNT = 25;
const MIN_ID_IMAGE = 1;
const MAX_ID_IMAGE = 25;
const photosData = makePhotos(PHOTOS_COUNT);
const idImage = getRandomInt(MIN_ID_IMAGE, MAX_ID_IMAGE);
const imageData = getPhotosDescription(idImage);

renderPhotos(photosData);
renderBigImage(imageData);
