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
const effectLevelValue = document.querySelector('.effect-level__value');

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
    start: [100],
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  });
  effectsForm.addEventListener('change', (e) => {
    if (e.target.value !== 'none') {
      slider.classList.remove('hidden');
    } else {
      slider.classList.add('hidden');
      uploadedImage.style.filter = 'none';
    }
    if (e.target.value === 'chrome') {
      slider.noUiSlider.set(100);
      uploadedImage.style.filter = 'grayscale(1)';
      uploadedImage.classList.add('effects__preview--chrome');
      slider.addEventListener('click', () => {
        const sliderValue = slider.noUiSlider.get(true);
        effectLevelValue.value = sliderValue;
        const filter = (sliderValue/100).toFixed(1);
        uploadedImage.style.filter = `grayscale(${filter})`;
      });
    } else {
      uploadedImage.classList.remove('effects__preview--chrome');}
    if (e.target.value === 'sepia') {
      uploadedImage.classList.add('effects__preview--sepia');
      slider.noUiSlider.set(100);
      uploadedImage.style.filter = 'sepia(1)';
      slider.addEventListener('click', () => {
        const sliderValue = slider.noUiSlider.get(true);
        effectLevelValue.value = sliderValue;
        const filter = (sliderValue/100).toFixed(1);
        uploadedImage.style.filter = `sepia(${filter})`;
      });
    } else {
      uploadedImage.classList.remove('effects__preview--sepia');}
    if (e.target.value === 'marvin') {
      uploadedImage.classList.add('effects__preview--marvin');
      slider.noUiSlider.set(100);
      uploadedImage.style.filter = 'invert(100%)';
      slider.addEventListener('click', () => {
        const sliderValue = slider.noUiSlider.get(true);
        effectLevelValue.value = sliderValue;
        const filter = (sliderValue).toFixed(1);
        uploadedImage.style.filter = `invert(${filter}%)`;
      });
    } else {
      uploadedImage.classList.remove('effects__preview--marvin');}
    if (e.target.value === 'phobos') {
      uploadedImage.classList.add('effects__preview--phobos');
      slider.noUiSlider.set(100);
      uploadedImage.style.filter = 'blur(3px)';
      slider.addEventListener('click', () => {
        const sliderValue = slider.noUiSlider.get(true);
        effectLevelValue.value = sliderValue;
        const filter = (sliderValue*3/100).toFixed(1);
        uploadedImage.style.filter = `blur(${filter}px)`;
      });
    } else {
      uploadedImage.classList.remove('effects__preview--phobos');}
    if (e.target.value === 'heat') {
      uploadedImage.classList.add('effects__preview--heat');
      slider.noUiSlider.set(100);
      uploadedImage.style.filter = 'brightness(3)';
      slider.addEventListener('click', () => {
        const sliderValue = slider.noUiSlider.get(true);
        effectLevelValue.value = sliderValue;
        const filter = (sliderValue*3/100).toFixed(1);
        uploadedImage.style.filter = `brightness(${filter})`;
      });
    } else {
      uploadedImage.classList.remove('effects__preview--heat');}
  });
};

export { uploadImage };

