import { body } from './image-popup-window.js';

const SCALING_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const imageUploadForm = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomControl = document.querySelector('.scale__control--value');
const imgageUploadPreview = document.querySelector('.img-upload__preview');
const uploadedImage = imgageUploadPreview.querySelector('img');
const effectNoneButton = document.querySelector('#effect-none');
const effectChromeButton = document.querySelector('#effect-chrome');
const effectSepiaButton = document.querySelector('#effect-sepia');
const effectMarvinButton = document.querySelector('#effect-marvin');
const effectPhobosButton = document.querySelector('#effect-phobos');
const effectHeatButton = document.querySelector('#effect-heat');

const uploadImage = () => {
  imageUploadForm.addEventListener('change', () => {
    imageEditingForm.classList.remove('hidden');
    body.classList.add('modal-open');
  });
  const changeImageSize = () => {
    if (zoomControl.value === '25%') {
      uploadedImage.style = 'transform: scale(0.25)';
    }
    if (zoomControl.value === '50%') {
      uploadedImage.style = 'transform: scale(0.5)';
    }
    if (zoomControl.value === '75%') {
      uploadedImage.style = 'transform: scale(0.75)';
    }
    if (zoomControl.value === '100%') {
      uploadedImage.style = 'transform: scale(1)';
    }
  };
  zoomOutButton.addEventListener('click', () => {
    let zoomControlValue = Math.floor(zoomControl.value.replace('%', ''));
    if (zoomControlValue > MIN_SCALE) {
      zoomControlValue = zoomControlValue - SCALING_STEP;
    } else {
      zoomControlValue = MIN_SCALE;
    }
    zoomControl.value = `${ zoomControlValue }%`;
    changeImageSize();
  });
  zoomInButton.addEventListener('click', () => {
    let zoomControlValue = Math.floor(zoomControl.value.replace('%', ''));
    if (zoomControlValue < MAX_SCALE - SCALING_STEP) {
      zoomControlValue = zoomControlValue + SCALING_STEP;
    } else {
      zoomControlValue = MAX_SCALE;
    }
    zoomControl.value = `${ zoomControlValue }%`;
    changeImageSize();
  });
};

export { uploadImage };

