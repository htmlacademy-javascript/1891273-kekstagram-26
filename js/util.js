//Вернуть рандомное число

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    const substitution = min;
    min = max;
    max = substitution;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Вернуть рандомный элемент

const getRandomArrayElement = (elements) => {
  const index = getRandomInt(0, elements.length - 1);

  return elements[index];
};

//Проверка длинны комментария

// const checkStringLength = (string, maxLength) => string.length <= maxLength;
// checkStringLength();

//Экспорты

export {getRandomInt};
export {getRandomArrayElement};
