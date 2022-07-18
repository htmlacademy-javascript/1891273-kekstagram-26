const MAX_NUMBER_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 20;
const SCALING_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

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
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
};

const openDownloadWindow = () => {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
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

const uploadImage = (pristine) => {
  zoomOutButton.addEventListener('click', zoomOut);
  zoomInButton.addEventListener('click', zoomIn);
  imageUploadForm.addEventListener('change', openDownloadWindow);
  mistakes.forEach( (obj) => {
    pristine.addValidator(hashtagsInput, obj.check, obj.comment);
  }
  );
  pristine.addValidator(commentInput, validateCommentLength, 'Комментарий не должен быть длиннее 140 символов');

  form.addEventListener('submit', (evt) => {
    if  (pristine.validate()) {
      closeWindow();
    }
    evt.preventDefault();
  });
};

export { uploadImage };

