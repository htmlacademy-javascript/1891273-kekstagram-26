import { sendData } from './api.js';
import { mistakes, validateCommentLength } from './validation.js';
import { zoomIn, zoomOut } from './zoom.js';

const initialEffectLevel = 100;
const escButtonNumber = 27;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const imageUploadFormElement = document.querySelector('#upload-file');
const imageEditingFormElement = document.querySelector('.img-upload__overlay');
const hashtagsInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');
const cancelButtonElement = document.querySelector('.img-upload__cancel');
const formElement = document.querySelector('.img-upload__form');
const bodyElement = document.querySelector('body');
const uploadedImageBlockElement = document.querySelector('.img-upload__preview');
const uploadedImageElement = uploadedImageBlockElement.querySelector('img');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectsFormElement = document.querySelector('.effects');
const sliderElement = document.querySelector('.effect-level__slider');
const submitButtonElement = document.querySelector('.img-upload__submit');
const effectNoneElement = document.querySelector('#effect-none');
const zoomOutButtonElement = document.querySelector('.scale__control--smaller');
const zoomInButtonElement = document.querySelector('.scale__control--bigger');
const zoomControlElement = document.querySelector('.scale__control--value');

const applyEffect = (effect, effectClass) => {
  sliderElement.noUiSlider.set(initialEffectLevel);
  uploadedImageElement.style.filter = effect;
  uploadedImageElement.classList.add(effectClass);
};

const selectEffect = (e) => {
  if (e.target.value !== 'none') {
    sliderElement.classList.remove('hidden');
  } else {
    sliderElement.classList.add('hidden');
    uploadedImageElement.style.filter = 'none';
  }
  if (e.target.value === 'chrome') {
    applyEffect('grayscale(1)', 'effects__preview--chrome');
    sliderElement.addEventListener('click', () => {
      const sliderValue = sliderElement.noUiSlider.get(true);
      const filter = (sliderValue/100).toFixed(1);
      effectLevelValueElement.value = filter;
      uploadedImageElement.style.filter = `grayscale(${filter})`;
    });
  } else {
    uploadedImageElement.classList.remove('effects__preview--chrome');}
  if (e.target.value === 'sepia') {
    applyEffect('sepia(1)', 'effects__preview--sepia');
    sliderElement.addEventListener('click', () => {
      const sliderValue = sliderElement.noUiSlider.get(true);
      const filter = (sliderValue/100).toFixed(1);
      effectLevelValueElement.value = filter;
      uploadedImageElement.style.filter = `sepia(${filter})`;
    });
  } else {
    uploadedImageElement.classList.remove('effects__preview--sepia');}
  if (e.target.value === 'marvin') {
    applyEffect('invert(100%)', 'effects__preview--marvin');
    sliderElement.addEventListener('click', () => {
      const sliderValue = sliderElement.noUiSlider.get(true);
      const filter = (sliderValue).toFixed(1);
      effectLevelValueElement.value = filter;
      uploadedImageElement.style.filter = `invert(${filter}%)`;
    });
  } else {
    uploadedImageElement.classList.remove('effects__preview--marvin');}
  if (e.target.value === 'phobos') {
    applyEffect('blur(3px)', 'effects__preview--phobos');
    sliderElement.addEventListener('click', () => {
      const sliderValue = sliderElement.noUiSlider.get(true);
      const filter = (sliderValue*3/100).toFixed(1);
      effectLevelValueElement.value = filter;
      uploadedImageElement.style.filter = `blur(${filter}px)`;
    });
  } else {
    uploadedImageElement.classList.remove('effects__preview--phobos');}
  if (e.target.value === 'heat') {
    applyEffect('brightness(3)', 'effects__preview--heat');
    sliderElement.addEventListener('click', () => {
      const sliderValue = sliderElement.noUiSlider.get(true);
      const filter = (sliderValue*3/100).toFixed(1);
      effectLevelValueElement.value = filter;
      uploadedImageElement.style.filter = `brightness(${filter})`;
    });
  } else {
    uploadedImageElement.classList.remove('effects__preview--heat');}
};

const closeDownloadWindow = () => {
  imageUploadFormElement.value = '';
  hashtagsInputElement.value = '';
  commentInputElement.value = '';
  sliderElement.noUiSlider.set(initialEffectLevel);
  uploadedImageElement.style = 'transform: scale(1)';
  uploadedImageElement.style.filter = 'none';
  zoomOutButtonElement.removeEventListener('click', zoomOut);
  zoomInButtonElement.removeEventListener('click', zoomIn);
  effectsFormElement.removeEventListener('change', selectEffect);
  imageEditingFormElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const closeEscDownloadWindow = (e) => {
  const curElement = document.activeElement;
  if (e.keyCode === escButtonNumber && curElement !== hashtagsInputElement && curElement !== commentInputElement) {
    closeDownloadWindow();
  } else {
    document.addEventListener('keydown', closeEscDownloadWindow, {once: true});
  }
};

const openDownloadWindow = () => {
  imageEditingFormElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  sliderElement.classList.add('hidden');
  effectNoneElement.checked = true;
  zoomControlElement.value = '100%';
  const file = imageUploadFormElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadedImageElement.src = URL.createObjectURL(file);
  }
  zoomOutButtonElement.addEventListener('click', zoomOut);
  zoomInButtonElement.addEventListener('click', zoomIn);
  effectsFormElement.addEventListener('change', selectEffect);
  cancelButtonElement.addEventListener('click', closeDownloadWindow);
  document.addEventListener('keydown', closeEscDownloadWindow, {once: true});
};

const blockMessageElement = document.createElement('div');
const messageTemplateElement = document.querySelector('#success').content.querySelector('.success');
const sendingMessageElement = messageTemplateElement.cloneNode(true);

const closeSendingMessage = () => {
  const cancelButtonMessageElement = sendingMessageElement.querySelector('.success__button');
  cancelButtonMessageElement.removeEventListener('click', closeSendingMessage);
  const messageElement = blockMessageElement.firstElementChild;
  const checkClass = messageElement.classList.contains('error');
  if(checkClass) {
    document.addEventListener('keydown', closeEscDownloadWindow, {once: true});
  }
  blockMessageElement.remove();
};

const closeEscSendingMessage = (e) => {
  const curElement = document.activeElement;
  if (e.keyCode === escButtonNumber && curElement !== hashtagsInputElement && curElement !== commentInputElement) {
    closeSendingMessage();
  }
};

const checkClickArea = (e) => {
  const blockElement = document.querySelector('.success__inner');
  if (e.target !== blockElement) {
    closeSendingMessage();
  }
};

const openSendingMessage = () => {
  blockMessageElement.appendChild(sendingMessageElement);
  bodyElement.appendChild(blockMessageElement);
  const cancelButtonMessageElement = sendingMessageElement.querySelector('.success__button');
  cancelButtonMessageElement.addEventListener('click', closeSendingMessage, {once: true});
  document.addEventListener('keydown', closeEscSendingMessage, {once: true});
  document.addEventListener('click', checkClickArea, {once: true});
};

const messageErrorTemplateElement = document.querySelector('#error').content.querySelector('.error');
const sendingErrorMessageElement = messageErrorTemplateElement.cloneNode(true);

const openErrorWindow = () => {
  blockMessageElement.appendChild(sendingErrorMessageElement);
  bodyElement.appendChild(blockMessageElement);
  const cancelButtonMessageElement = sendingErrorMessageElement.querySelector('.error__button');
  cancelButtonMessageElement.addEventListener('click', closeSendingMessage);
  document.addEventListener('keydown', closeEscSendingMessage);
  document.addEventListener('click', checkClickArea);
  document.removeEventListener('keydown', closeEscDownloadWindow, {once: true});
};

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикуем...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const initForm = (pristine) => {
  imageUploadFormElement.addEventListener('change', openDownloadWindow);
  mistakes.forEach((obj) => {
    pristine.addValidator(hashtagsInputElement, obj.check, obj.comment);
  }
  );
  pristine.addValidator(commentInputElement, validateCommentLength, 'Комментарий не должен быть длиннее 140 символов');

  formElement.addEventListener('submit', (evt) => {
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

