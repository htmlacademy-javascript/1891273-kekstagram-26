const getRandomInt = function (min, max) {
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

const checkLengthString = function (string, stringMax) {
  const lengthString = string.length;
  if (lengthString > stringMax) {
    return false;
  }
  return true;
};

checkLengthString('Комментарий', 140);
