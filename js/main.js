import { renderPhotos, selectFilter } from './rendering-thumbnails.js';
import { initForm } from './photo-upload-form.js';
import { showAlert } from './util.js';
import { getData } from './api.js';

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

initForm(pristine);
getData((pictures) => {
  renderPhotos(pictures);
  selectFilter(pictures);
},
showAlert,
'Фото не загружены. Проверьте соединение.');
