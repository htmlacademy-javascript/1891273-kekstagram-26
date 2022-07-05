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
const slider = document.querySelector('.effect-level__slider');
const effectsForm = document.querySelector('.effects');

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
  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      'min': 0,
      'max': 100
    }
  });
  effectsForm.addEventListener('change', (e) => {
    if (e.target.value === 'none') {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
    if (e.target.value === 'chrome') {
      uploadedImage.classList.add('effects__preview--chrome');
    } else {
      uploadedImage.classList.remove('effects__preview--chrome');}
    if (e.target.value === 'sepia') {
      uploadedImage.classList.add('effects__preview--sepia');
    } else {
      uploadedImage.classList.remove('effects__preview--sepia');}
    if (e.target.value === 'marvin') {
      uploadedImage.classList.add('effects__preview--marvin');
    } else {
      uploadedImage.classList.remove('effects__preview--marvin');}
    if (e.target.value === 'phobos') {
      uploadedImage.classList.add('effects__preview--phobos');
    } else {
      uploadedImage.classList.remove('effects__preview--phobos');}
    if (e.target.value === 'heat') {
      uploadedImage.classList.add('effects__preview--heat');
    } else {
      uploadedImage.classList.remove('effects__preview--heat');}
  });
};

export { uploadImage };

