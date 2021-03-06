import {isEscapeKey} from './util.js';
import {picPreview} from './img-preview-effects.js';

const body = document.querySelector('body');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadButton = document.querySelector('#upload-file');
const closeButton = imgUploadOverlay.querySelector('.img-upload__cancel');
const commentField = document.querySelector('.text__description');
const hashtagField = document.querySelector('.text__hashtags');

const onFormEscButtonKeydown = function (evt) {
  if (isEscapeKey(evt) && commentField !== document.activeElement && hashtagField !== document.activeElement) {
    evt.preventDefault();
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadButton.value = '';
    picPreview.className = '';
    picPreview.classList.add('effects__preview--none');
  } else {
    return evt;
  }
};

const openUploadForm = () => {
  uploadButton.addEventListener('click', () => {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
  });

  closeButton.addEventListener('click', () => {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    picPreview.className = '';
    picPreview.classList.add('effects__preview--none');
    uploadButton.value = '';
  });

  document.addEventListener('keydown', onFormEscButtonKeydown);
};

openUploadForm();
