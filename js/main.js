import { renderingBigImage } from './image-popup-window.js';
import { renderPhotos } from './rendering-thumbnails.js';
import { makePhotos } from './data.js';
import { getPhotosDescription } from './data.js';
import { getRandomInt } from './util.js';

const PHOTOS_COUNT = 25;
const photosData = makePhotos(PHOTOS_COUNT);
renderPhotos(photosData);

const MIN_ID_IMAGE = 1;
const MAX_ID_IMAGE = 25;
const ID_IMAGE = getRandomInt(MIN_ID_IMAGE, MAX_ID_IMAGE);
const imageData = getPhotosDescription(ID_IMAGE);
renderingBigImage(imageData);
