import {uploadErrorSet} from './upload-error.js';
import {uploadSuccessSet} from './upload-success.js';

const form = document.querySelector('#upload-select-image');
const hashtagField = form.querySelector('.text__hashtags');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const re2 = /^$/;
const MAX_HASHTAG_AMOUNT = 5;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__description--error-text',
  successClass: 'text__description--valid',
  errorClass: 'text__description--valid',
  errorTextTag: 'span',
});


pristine.addValidator(hashtagField, (value) => {
  const arrayOfHashtags = value.split(' ');
  for (let i = 0; i < arrayOfHashtags.length; i++) {
    if (!re.test(arrayOfHashtags[i]) && !re2.test(arrayOfHashtags[i])) {
      return false;
    }
    return true;
  }
}, 'Неверный хештег');

pristine.addValidator(hashtagField, (value) => {
  const arrayOfHashtags = value.split(' ');
  return arrayOfHashtags.length <= MAX_HASHTAG_AMOUNT;
}, 'Не более пяти хештегов');

const setUploadFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);

      fetch('https://26.javascript.pages.academy/kekstagram',
        {
          method: 'POST',
          body: formData,
        },
      )
        .then((response) => {
          if (response.ok) {
            onSuccess();
          } else {
            uploadErrorSet();
          }
        })
        .then (() => {
          uploadSuccessSet();
        })
        .catch(() => {
          uploadErrorSet();
        });
    }
  });
};

export {setUploadFormSubmit};
