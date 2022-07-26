import './render-pictures.js';
import './upload-form.js';
import './form-validation.js';
import './scale-upload-preview.js';
import './img-preview-effects.js';
import {renderSimilarPhotos, disscussedPhotosRender, randomPhotosRender, defaultPhotosRender} from './render-pictures.js';
import {closeUploadForm} from './upload-form.js';
import {setUploadFormSubmit} from './form-validation.js';
import {debounce} from './util.js';

fetch ('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((userPhotos) => {
    renderSimilarPhotos(userPhotos);
    debounce(disscussedPhotosRender(userPhotos), 500);
    debounce(randomPhotosRender(userPhotos), 500);
    debounce(defaultPhotosRender(userPhotos), 500);
  });

setUploadFormSubmit(closeUploadForm);
