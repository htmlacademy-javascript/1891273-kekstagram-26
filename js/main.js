import { renderBigImage } from './image-popup-window.js';
import { renderPhotos } from './rendering-thumbnails.js';
import { makePhotos } from './data.js';
import { getPhotosDescription } from './data.js';
import { getRandomInt } from './util.js';
import { uploadImage } from './photo-upload-form.js';

const PHOTOS_COUNT = 25;
const MIN_ID_IMAGE = 1;
const MAX_ID_IMAGE = 25;
const CLASS_OBJECT = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
};
const photosData = makePhotos(PHOTOS_COUNT);
const idImage = getRandomInt(MIN_ID_IMAGE, MAX_ID_IMAGE);
const imageData = getPhotosDescription(idImage);
const form = document.querySelector('.img-upload__form');

const pristine = new Pristine (form, CLASS_OBJECT, false);

renderPhotos(photosData);
renderBigImage(imageData);
uploadImage(pristine);
