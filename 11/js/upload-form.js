import {isEscapeKey} from './util.js';
import {picPreview} from './img-preview-effects.js';

const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadButton = document.querySelector('#upload-file');
const closeButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const commentField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');
const sliderElement = document.querySelector('.img-upload__effect-level');
const effectPreviewPics = document.querySelectorAll('.effects__preview');

const closeUploadForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadButton.value = '';
  picPreview.className = '';
  picPreview.classList.add('effects__preview--none');
  picPreview.src = 'img/upload-default-image.jpg';
  effectPreviewPics.forEach((e) => {
    e.style.backgroundImage = 'url(../img/upload-default-image.jpg)';
  });
};

const onFormEscButtonKeydown = function (evt) {
  if (isEscapeKey(evt) && commentField !== document.activeElement && hashtagField !== document.activeElement) {
    evt.preventDefault();
    closeUploadForm();
  } else {
    return evt;
  }
};

const openUploadForm = () => {
  uploadButton.addEventListener('click', () => {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    sliderElement.classList.add('hidden');
  });

  closeButton.addEventListener('click', closeUploadForm);

  document.addEventListener('keydown', onFormEscButtonKeydown);
};

openUploadForm();

export {openUploadForm, closeUploadForm};
