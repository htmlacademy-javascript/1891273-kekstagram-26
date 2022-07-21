import { renderPhotos } from './rendering-thumbnails.js';
import { uploadImage } from './photo-upload-form.js';
import { showAlert } from './util.js';

const CLASS_OBJECT = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
};
const form = document.querySelector('.img-upload__form');

const pristine = new Pristine (form, CLASS_OBJECT, false);

fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((picture) => {
    renderPhotos(picture);
  })
  .catch(() => showAlert('Фото не загружены. Проверьте соединение.'));

uploadImage(pristine);
