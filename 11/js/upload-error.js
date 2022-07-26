import {isEscapeKey} from './util.js';

const uploadErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const body = document.querySelector('body');

const uploadErrorSet = () => {
  const uploadError = uploadErrorTemplate.cloneNode(true);
  body.appendChild(uploadError);

  const errorMessage = document.querySelector('.error');
  const errorCloseButton = document.querySelector('.error__button');

  errorMessage.classList.remove('hidden');
  errorMessage.style.zIndex = 5;

  const onErrorMessageEscButtonKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      errorMessage.classList.add('hidden');
    }
  };

  errorCloseButton.addEventListener('click', () => {
    errorMessage.classList.add('hidden');
  });

  document.addEventListener('click', (evt) => {
    if(evt.target.className !== 'error__inner') {
      errorMessage.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', onErrorMessageEscButtonKeydown);
};

export {uploadErrorSet};
