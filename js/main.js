import { renderPhotos } from './rendering-thumbnails.js';
import { makePhotos } from './data.js';

const PHOTOS_COUNT = 25;
const photosData = makePhotos(PHOTOS_COUNT);
renderPhotos(photosData);
