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

const getRandomArrayElement = (elements) => {
  const index = getRandomInt(0, elements.length - 1);

  return elements[index];
};

export { getRandomInt, getRandomArrayElement };
