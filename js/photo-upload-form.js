import { sendData } from './api.js';

const MAX_NUMBER_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 20;
const SCALING_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const initialEffectLevel = 100;

const imageUploadForm = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const cancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const zoomControl = document.querySelector('.scale__control--value');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const uploadedImageBlock = document.querySelector('.img-upload__preview');
const uploadedImage = uploadedImageBlock.querySelector('img');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsForm = document.querySelector('.effects');
const slider = document.querySelector('.effect-level__slider');
const submitButton = document.querySelector('.img-upload__submit');

noUiSlider.create(slider, {
  start: [100],
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  }
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

const preparedHashtags = (value) => value.trim().toLowerCase().split(' ');

const isArrayInique = (arrayToCheck) => {
  const length = arrayToCheck.length;
  for (let i = 0; i < length; i++) {
    const comparedElement = arrayToCheck[i];
    for (let j = i + 1; j < length; j++) {
      const elementToCompare = arrayToCheck[j];
      if (comparedElement === elementToCompare && comparedElement !== '#') {
        return false;
      }
    }
  }
  return true;
};

const validateCommentLength = (value) => {
  const condition =  value.length <= MAX_LENGTH_COMMENT || value.length > 0;
  return condition;
};

const checkNumberHashtags = (hashtags) => preparedHashtags(hashtags).length <= MAX_NUMBER_HASHTAGS;

const checkPunctuationMarks = (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => /[^-_=+;:,.]$/m.test(value));

const verifyIdentity = (hashtags) => isArrayInique(preparedHashtags(hashtags));

const checkCharacters = (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => /^#[a-zA-Zа-яА-ЯёЁ0-9]{0,}$/.test(value));

const checkHashtagLength = (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => value.length >= 2 && value.length <= MAX_LENGTH_HASHTAG);

const closeWindow = () => {
  imageUploadForm.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  uploadedImage.style.filter = 'none';
  slider.noUiSlider.set(initialEffectLevel);
  zoomOutButton.removeEventListener('click', zoomOut);
  zoomInButton.removeEventListener('click', zoomIn);
  effectsForm.removeEventListener('change', selectEffect);
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
};

const openDownloadWindow = () => {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  zoomOutButton.addEventListener('click', zoomOut);
  zoomInButton.addEventListener('click', zoomIn);
  effectsForm.addEventListener('change', selectEffect);
  cancelButton.addEventListener('click', closeWindow);
};

const mistakes = [
  {
    check: checkNumberHashtags,
    comment: 'Максимальное колличество хэштегов 5',
  },
  {
    check: checkPunctuationMarks,
    comment: 'Хэштеги должны разделяться пробелом',
  },
  {
    check: verifyIdentity,
    comment: 'Хэштеги не должны повторяться',
  },
  {
    check: checkCharacters,
    comment: 'Хэштег начинается с # и состоит только из букв и цифр',
  },
  {
    check: checkHashtagLength,
    comment: 'Максимальная длина хэштега 20 символов',
  }
];


const blockMessage = document.createElement('div');
const messageTemplate = document.querySelector('#success').content.querySelector('.success');
const sendingMessage = messageTemplate.cloneNode(true);

const closeSendingMessage = (closeKey, checkArea) => {
  const cancelButtonMessage = sendingMessage.querySelector('.success__button');
  cancelButtonMessage.removeEventListener('click', closeSendingMessage);
  document.removeEventListener('keydown', closeKey);
  document.removeEventListener('click', checkArea);
  blockMessage.remove();
};

const checkButton = (e) => {
  if (e.keyCode === 27) {
    closeSendingMessage(checkButton);
  }
};

const checkClickArea = (e) => {
  const block = document.querySelector('.success__inner');
  if (e.target !== block) {
    closeSendingMessage(checkButton, checkClickArea);
  }
};

const openSubmitWindow = () => {
  blockMessage.appendChild(sendingMessage);
  body.appendChild(blockMessage);
  const cancelButtonMessage = sendingMessage.querySelector('.success__button');
  cancelButtonMessage.addEventListener('click', () => closeSendingMessage(checkButton, checkClickArea));
  document.addEventListener('keydown', checkButton);
  document.addEventListener('click', checkClickArea);
};

const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const sendingErrorMessage = messageErrorTemplate.cloneNode(true);

const openErrorWindow = () => {
  blockMessage.appendChild(sendingErrorMessage);
  body.appendChild(blockMessage);
  const cancelButtonMessage = sendingErrorMessage.querySelector('.error__button');
  cancelButtonMessage.addEventListener('click', () => closeSendingMessage(checkButton, checkClickArea));
  document.addEventListener('keydown', checkButton);
  document.addEventListener('click', checkClickArea);
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
        () => {closeWindow(); openSubmitWindow(); unblockSubmitButton();},
        () => {openErrorWindow(); unblockSubmitButton();},
        new FormData(evt.target));
    }
  });
};

export { initForm };

