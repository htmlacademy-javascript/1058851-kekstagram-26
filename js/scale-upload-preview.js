const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

const plusButton = document.querySelector('.scale__control--bigger');
const minusButton = document.querySelector('.scale__control--smaller');
const scaleResult = document.querySelector('.scale__control--value');
const picPreview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('.img-upload__input');
const effectPreviewPics = document.querySelectorAll('.effects__preview');

let procentNumber = 100;

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const previewPicURL = URL.createObjectURL(file);
    picPreview.src = previewPicURL;
    effectPreviewPics.forEach((e) => {
      e.style.backgroundImage = `url(${previewPicURL})`;
    });
  }
});

const scaleAdjust = function () {
  plusButton.addEventListener('click', () => {
    if (procentNumber < 100) {
      procentNumber += 25;
      scaleResult.value = `${procentNumber}%`;
      const picScale = `scale(${procentNumber / 100})`;
      picPreview.style.transform = picScale;
    }
  });

  minusButton.addEventListener('click', () => {
    if (procentNumber > 25) {
      procentNumber -= 25;
      scaleResult.value = `${procentNumber}%`;

      const picScale = `scale(${procentNumber / 100})`;
      picPreview.style.transform = picScale;
    }
  });
};

scaleAdjust();
