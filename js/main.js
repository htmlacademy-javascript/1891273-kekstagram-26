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

getRandomInt(1, 10);

const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('Комментарий', 140);
