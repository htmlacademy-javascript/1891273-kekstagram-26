const SCALING_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const uploadedImageBlock = document.querySelector('.img-upload__preview');
const uploadedImage = uploadedImageBlock.querySelector('img');
const zoomControl = document.querySelector('.scale__control--value');

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

const zoomOut = () => {
  let zoomControlValue = Math.floor(zoomControl.value.replace('%', ''));
  if (zoomControlValue > MIN_SCALE) {
    zoomControlValue = zoomControlValue - SCALING_STEP;
  } else {
    zoomControlValue = MIN_SCALE;
  }
  zoomControl.value = `${ zoomControlValue }%`;
  changeImageSize();
};

const zoomIn = () => {
  let zoomControlValue = Math.floor(zoomControl.value.replace('%', ''));
  if (zoomControlValue < MAX_SCALE - SCALING_STEP) {
    zoomControlValue = zoomControlValue + SCALING_STEP;
  } else {
    zoomControlValue = MAX_SCALE;
  }
  zoomControl.value = `${ zoomControlValue }%`;
  changeImageSize();
};

export { zoomIn, zoomOut };
