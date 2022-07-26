import {isEscapeKey} from './util.js';

const uploadSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');

const uploadSuccessSet = () => {
  const uploadSuccess = uploadSuccessTemplate.cloneNode(true);
  body.appendChild(uploadSuccess);

  const successMessage = document.querySelector('.success');
  const successCloseButton = document.querySelector('.success__button');

  successMessage.classList.remove('hidden');
  successMessage.style.zIndex = 5;

  const onSuccessMessageEscButtonKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      successMessage.classList.add('hidden');
      successMessage.style.zIndex = -5;
    }
  };

  successCloseButton.addEventListener('click', () => {
    successMessage.classList.add('hidden');
    successMessage.style.zIndex = -5;
  });

  document.addEventListener('click', (evt) => {
    if(evt.target.className !== 'success__inner') {
      successMessage.classList.add('hidden');
      successMessage.style.zIndex = -5;
    }
  });

  document.addEventListener('keydown', onSuccessMessageEscButtonKeydown);
};

export {uploadSuccessSet};
