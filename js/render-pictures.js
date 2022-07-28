import { openBigPicture } from './big-picture.js';


//Находим секцию, куда будем вставлять фото пользователей
const userPhotoList = document.querySelector('.pictures');
//находим шаблон для вставки пользовательских фото
const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
//Генерируем массив пользовательских фото
const similarPhotoListFragment = document.createDocumentFragment();
const imgSorting = document.querySelector('.img-filters');
const filterDiscussedButton = document.querySelector('#filter-discussed');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterButtons = document.querySelectorAll('.img-filters__button');

const similarPhotoCreate = (photo) => {
  similarPhotoListFragment.innerHTML = '';
  const similarPhotoElement = userPhotoTemplate.cloneNode(true);
  similarPhotoElement.querySelector('.picture__img').src = photo.url;
  similarPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
  similarPhotoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  similarPhotoListFragment.appendChild(similarPhotoElement);

  similarPhotoElement.addEventListener('click', () => {
    openBigPicture(photo);
  });
  userPhotoList.appendChild(similarPhotoListFragment);
};

const renderSimilarPhotos = (similarPhotos) => {
  imgSorting.classList.remove('img-filters--inactive');
  similarPhotos.forEach(similarPhotoCreate);
  userPhotoList.appendChild(similarPhotoListFragment);
};

const randomPhotosRender = (similarPhotos) => {
  filterRandomButton.addEventListener('click', (evt) => {
    filterButtons.forEach((e) => e.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    userPhotoList.querySelectorAll('.picture').forEach((e) => e.remove());

    similarPhotos
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .forEach(similarPhotoCreate);
  });
};

const disscussedPhotosRender = (similarPhotos) => {
  filterDiscussedButton.addEventListener('click', (evt) => {
    filterButtons.forEach((e) => e.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    userPhotoList.querySelectorAll('.picture').forEach((e) => e.remove());

    similarPhotos
      .slice()
      .sort((photoA, photoB) => photoA.comments.length > photoB.comments.length ? -1 : 1)
      .forEach(similarPhotoCreate);
  });
};

const defaultPhotosRender = (similarPhotos) => {
  filterDefaultButton.addEventListener('click', (evt) => {
    filterButtons.forEach((e) => e.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    userPhotoList.querySelectorAll('.picture').forEach((e) => e.remove());

    similarPhotos.forEach(similarPhotoCreate);
  });
};

export {renderSimilarPhotos, disscussedPhotosRender, randomPhotosRender, defaultPhotosRender};
