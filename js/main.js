import { renderPhotos, selectFilter } from './rendering-thumbnails.js';
import { initForm } from './photo-upload-form.js';
import { showAlert } from './util.js';
import { getData } from './api.js';

const sliderElement = document.querySelector('.effect-level__slider');
const CLASS_OBJECT = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
};
const formElement = document.querySelector('.img-upload__form');

const pristine = new Pristine (formElement, CLASS_OBJECT, false);

noUiSlider.create(sliderElement, {
  start: [100],
  connect: 'lower',
  range: {
    'min': 0,
    'max': 100
  }
});

initForm(pristine);
getData((pictures) => {
  renderPhotos(pictures);
  selectFilter(pictures);
},
showAlert,
'Фото не загружены. Проверьте соединение.');
