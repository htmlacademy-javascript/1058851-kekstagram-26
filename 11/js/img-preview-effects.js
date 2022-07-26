const sliderElement = document.querySelector('.img-upload__effect-level');
const valueElement = document.querySelector('.effect-level__value');
const effects = document.querySelectorAll('.effects__radio');
const picPreview = document.querySelector('.img-upload__preview img');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

function onFilterChange (evt) {
  picPreview.className = '';

  const imgPreviewEffectClass = `effects__preview--${evt.target.value}`;
  picPreview.classList.add(imgPreviewEffectClass);

  if (evt.target.value === 'chrome') {
    sliderElement.classList.remove('hidden');
    picPreview.style.filter = '';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    });
    sliderElement.noUiSlider.set(1);

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      picPreview.style.filter = `grayscale(${valueElement.value})`;
    });

  } else if (evt.target.value === 'sepia') {
    sliderElement.classList.remove('hidden');
    picPreview.style.filter = '';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    });
    sliderElement.noUiSlider.set(1);

    sliderElement.noUiSlider.on('update', () => {
      picPreview.style.filter = sliderElement.noUiSlider.get();
      picPreview.style.filter = `sepia(${valueElement.value})`;
    });

  } else if (evt.target.value === 'marvin') {
    sliderElement.classList.remove('hidden');
    picPreview.style.filter = '';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.01,
      start: 1,
    });
    sliderElement.noUiSlider.set(1);

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      picPreview.style.filter = `invert(${valueElement.value * 100}%)`;
    });

  } else if (evt.target.value === 'phobos') {
    sliderElement.classList.remove('hidden');
    picPreview.style.filter = '';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    });
    sliderElement.noUiSlider.set(3);

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      picPreview.style.filter = `blur(${valueElement.value}px)`;
    });

  } else if (evt.target.value === 'heat') {
    sliderElement.classList.remove('hidden');
    picPreview.style.filter = '';

    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    });
    sliderElement.noUiSlider.set(3);

    sliderElement.noUiSlider.on('update', () => {
      valueElement.value = sliderElement.noUiSlider.get();
      picPreview.style.filter = `brightness(${valueElement.value})`;
    });
  } else {
    sliderElement.classList.add('hidden');
    picPreview.style.filter = '';
  }
}

effects.forEach((effect) => {
  effect.addEventListener('change', onFilterChange);
});

export {picPreview};
