import { body } from './image-popup-window.js';

const SCALING_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const imageUploadForm = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
let zoomValueAsAPercentage = document.querySelector('.scale__control--value').value;
let zoomValueInNumbers = Math.floor(zoomValueAsAPercentage.replace('%', ''));

const uploadImage = () => {
  imageUploadForm.addEventListener('change', () => {
    imageEditingForm.classList.remove('hidden');
    body.classList.add('modal-open');
  });
  zoomOutButton.addEventListener('click', () => {
    if (zoomValueInNumbers > MIN_SCALE) {
      zoomValueInNumbers = zoomValueInNumbers - SCALING_STEP;
    } else {
      zoomValueInNumbers = MIN_SCALE;
    }
    zoomValueAsAPercentage = `${ zoomValueInNumbers }%`;
  });
  zoomInButton.addEventListener('click', () => {
    if (zoomValueInNumbers < MAX_SCALE - SCALING_STEP) {
      zoomValueInNumbers = zoomValueInNumbers + SCALING_STEP;
    } else {
      zoomValueInNumbers = MAX_SCALE;
    }
    zoomValueAsAPercentage = `${ zoomValueInNumbers }%`;
  });
};

export { uploadImage };

