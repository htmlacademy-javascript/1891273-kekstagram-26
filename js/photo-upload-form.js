const MAX_NUMBER_HASHTAGS = 5;
const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 20;

const imageUploadForm = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const cancelButton = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');

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

