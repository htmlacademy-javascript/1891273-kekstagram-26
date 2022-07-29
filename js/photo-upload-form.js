import { sendData } from './api.js';
import { mistakes, validateCommentLength } from './validation.js';
import { zoomIn, zoomOut } from './zoom.js';

const initialEffectLevel = 100;
const escButtonNumber = 27;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploadForm = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const cancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadedImageBlock = document.querySelector('.img-upload__preview');
const uploadedImage = uploadedImageBlock.querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsForm = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const submitButton = document.querySelector('.img-upload__submit');
const effectNoneElement = document.querySelector('#effect-none');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomControl = document.querySelector('.scale__control--value');

const applyEffect = (effect, effectClass) => {
  slider.noUiSlider.set(initialEffectLevel);
  uploadedImage.style.filter = effect;
  uploadedImage.classList.add(effectClass);
};

const selectEffect = (e) => {
  if (e.target.value !== 'none') {
    slider.classList.remove('hidden');
  } else {
    slider.classList.add('hidden');
    uploadedImage.style.filter = 'none';
  }
  if (e.target.value === 'chrome') {
    applyEffect('grayscale(1)', 'effects__preview--chrome');
    slider.addEventListener('click', () => {
      const sliderValue = slider.noUiSlider.get(true);
      const filter = (sliderValue/100).toFixed(1);
      effectLevelValue.value = filter;
      uploadedImage.style.filter = `grayscale(${filter})`;
    });
  } else {
    uploadedImage.classList.remove('effects__preview--chrome');}
  if (e.target.value === 'sepia') {
    applyEffect('sepia(1)', 'effects__preview--sepia');
    slider.addEventListener('click', () => {
      const sliderValue = slider.noUiSlider.get(true);
      const filter = (sliderValue/100).toFixed(1);
      effectLevelValue.value = filter;
      uploadedImage.style.filter = `sepia(${filter})`;
    });
  } else {
    uploadedImage.classList.remove('effects__preview--sepia');}
  if (e.target.value === 'marvin') {
    applyEffect('invert(100%)', 'effects__preview--marvin');
    slider.addEventListener('click', () => {
      const sliderValue = slider.noUiSlider.get(true);
      const filter = (sliderValue).toFixed(1);
      effectLevelValue.value = filter;
      uploadedImage.style.filter = `invert(${filter}%)`;
    });
  } else {
    uploadedImage.classList.remove('effects__preview--marvin');}
  if (e.target.value === 'phobos') {
    applyEffect('blur(3px)', 'effects__preview--phobos');
    slider.addEventListener('click', () => {
      const sliderValue = slider.noUiSlider.get(true);
      const filter = (sliderValue*3/100).toFixed(1);
      effectLevelValue.value = filter;
      uploadedImage.style.filter = `blur(${filter}px)`;
    });
  } else {
    uploadedImage.classList.remove('effects__preview--phobos');}
  if (e.target.value === 'heat') {
    applyEffect('brightness(3)', 'effects__preview--heat');
    slider.addEventListener('click', () => {
      const sliderValue = slider.noUiSlider.get(true);
      const filter = (sliderValue*3/100).toFixed(1);
      effectLevelValue.value = filter;
      uploadedImage.style.filter = `brightness(${filter})`;
    });
  } else {
    uploadedImage.classList.remove('effects__preview--heat');}
};

const closeDownloadWindow = () => {
  imageUploadForm.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  slider.noUiSlider.set(initialEffectLevel);
  uploadedImage.style = 'transform: scale(1)';
  uploadedImage.style.filter = 'none';
  zoomOutButton.removeEventListener('click', zoomOut);
  zoomInButton.removeEventListener('click', zoomIn);
  effectsForm.removeEventListener('change', selectEffect);
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeEscDownloadWindow = (e) => {
  const curElement = document.activeElement;
  if (e.keyCode === escButtonNumber && curElement !== hashtagsInput && curElement !== commentInput) {
    closeDownloadWindow();
  } else {
    document.addEventListener('keydown', closeEscDownloadWindow, {once: true});
  }
};

const openDownloadWindow = () => {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  slider.classList.add('hidden');
  effectNoneElement.checked = true;
  zoomControl.value = '100%';
  const file = imageUploadForm.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadedImage.src = URL.createObjectURL(file);
  }
  zoomOutButton.addEventListener('click', zoomOut);
  zoomInButton.addEventListener('click', zoomIn);
  effectsForm.addEventListener('change', selectEffect);
  cancelButton.addEventListener('click', closeDownloadWindow);
  document.addEventListener('keydown', closeEscDownloadWindow, {once: true});
};

const blockMessage = document.createElement('div');
const messageTemplate = document.querySelector('#success').content.querySelector('.success');
const sendingMessage = messageTemplate.cloneNode(true);

const closeSendingMessage = () => {
  const cancelButtonMessage = sendingMessage.querySelector('.success__button');
  cancelButtonMessage.removeEventListener('click', closeSendingMessage);
  const message = blockMessage.firstElementChild;
  const checkClass = message.classList.contains('error');
  if(checkClass) {
    document.addEventListener('keydown', closeEscDownloadWindow, {once: true});
  }
  blockMessage.remove();
};

const closeEscSendingMessage = (e) => {
  const curElement = document.activeElement;
  if (e.keyCode === escButtonNumber && curElement !== hashtagsInput && curElement !== commentInput) {
    closeSendingMessage();
  }
};

// const checkButton = (e) => {
//   if (e.keyCode === escButtonNumber) {
//     closeSendingMessage();
//   }
// };

const checkClickArea = (e) => {
  const block = document.querySelector('.success__inner');
  if (e.target !== block) {
    closeSendingMessage();
  }
};

const openSendingMessage = () => {
  blockMessage.appendChild(sendingMessage);
  body.appendChild(blockMessage);
  const cancelButtonMessage = sendingMessage.querySelector('.success__button');
  cancelButtonMessage.addEventListener('click', closeSendingMessage, {once: true});
  document.addEventListener('keydown', closeEscSendingMessage, {once: true});
  document.addEventListener('click', checkClickArea, {once: true});
};

const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const sendingErrorMessage = messageErrorTemplate.cloneNode(true);

const openErrorWindow = () => {
  blockMessage.appendChild(sendingErrorMessage);
  body.appendChild(blockMessage);
  const cancelButtonMessage = sendingErrorMessage.querySelector('.error__button');
  cancelButtonMessage.addEventListener('click', closeSendingMessage);
  document.addEventListener('keydown', closeEscSendingMessage);
  document.addEventListener('click', checkClickArea);
  document.removeEventListener('keydown', closeEscDownloadWindow, {once: true});
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const initForm = (pristine) => {
  imageUploadForm.addEventListener('change', openDownloadWindow);
  mistakes.forEach((obj) => {
    pristine.addValidator(hashtagsInput, obj.check, obj.comment);
  }
  );
  pristine.addValidator(commentInput, validateCommentLength, 'Комментарий не должен быть длиннее 140 символов');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if  (valid) {
      blockSubmitButton();
      sendData(
        () => {closeDownloadWindow(); openSendingMessage(); unblockSubmitButton();},
        () => {openErrorWindow(); unblockSubmitButton();},
        new FormData(evt.target));
    }
  });
};

export { initForm };

