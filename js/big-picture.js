import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const modalCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsBlock = bigPicture.querySelector('.social__comments');
const visibleCommentsCount = bigPicture.querySelector('.visible-comments-count');
const commentImageSize = 35;
const maxCommentsStepAmount = 5;

const onModalEscButtonKeydown = function (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const getCreateComment = (comment) => {
  const newComment  = document.createElement('li');
  newComment.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = commentImageSize;
  commentImage.height = commentImageSize;
  newComment.appendChild(commentImage);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  newComment.appendChild(commentText);
  return newComment;
};

const getCreateComments = (comments) => {
  commentsBlock.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  const visibleComments = comments.slice();
  if (comments.length < maxCommentsStepAmount) {
    commentsLoader.classList.add('hidden');
    visibleCommentsCount.textContent = comments.length;

    comments
      .forEach((comment) => {
        commentsFragment.appendChild(getCreateComment(comment));
      });
  } else {
    visibleCommentsCount.textContent = maxCommentsStepAmount;

    visibleComments
      .splice(0, maxCommentsStepAmount)
      .forEach((comment) => {
        commentsFragment.appendChild(getCreateComment(comment));
      });
  }
  commentsBlock.appendChild(commentsFragment);

  commentsLoader.addEventListener('click', () => {
    visibleComments
      .splice(0, 5)
      .forEach((comment) => {
        commentsFragment.appendChild(getCreateComment(comment));
      });
    visibleCommentsCount.textContent = comments.length - visibleComments.length;
    commentsBlock.appendChild(commentsFragment);
    if ((comments.length - visibleComments.length) >= comments.length) {
      commentsLoader.classList.add('hidden');
    }
  });

};

const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoader.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  getCreateComments(photo.comments);

  modalCloseButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentsCount.classList.remove('hidden');
  });
  document.addEventListener('keydown', onModalEscButtonKeydown);
};

export {openBigPicture};
