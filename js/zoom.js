const SCALING_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const uploadedImageBlockElement = document.querySelector('.img-upload__preview');
const uploadedImageElement = uploadedImageBlockElement.querySelector('img');
const zoomControlElement = document.querySelector('.scale__control--value');

const changeImageSize = () => {
  if (zoomControlElement.value === '25%') {
    uploadedImageElement.style.transform = 'scale(0.25)';
  }
  if (zoomControlElement.value === '50%') {
    uploadedImageElement.style.transform = 'scale(0.5)';
  }
  if (zoomControlElement.value === '75%') {
    uploadedImageElement.style.transform = 'scale(0.75)';
  }
  if (zoomControlElement.value === '100%') {
    uploadedImageElement.style.transform = 'scale(1)';
  }
};

const zoomOut = () => {
  let zoomControlValue = Math.floor(zoomControlElement.value.replace('%', ''));
  if (zoomControlValue > MIN_SCALE) {
    zoomControlValue = zoomControlValue - SCALING_STEP;
  } else {
    zoomControlValue = MIN_SCALE;
  }
  zoomControlElement.value = `${ zoomControlValue }%`;
  changeImageSize();
};

const zoomIn = () => {
  let zoomControlValue = Math.floor(zoomControlElement.value.replace('%', ''));
  if (zoomControlValue < MAX_SCALE - SCALING_STEP) {
    zoomControlValue = zoomControlValue + SCALING_STEP;
  } else {
    zoomControlValue = MAX_SCALE;
  }
  zoomControlElement.value = `${ zoomControlValue }%`;
  changeImageSize();
};

export { zoomIn, zoomOut };
