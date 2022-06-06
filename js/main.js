const getRandomInt = function (min, max) {
  const randomInt = Math.random(min, max);
  if (min>max) {
    return false;
  }
  return randomInt;
};

getRandomInt(1, 10);

const maxLengthString = 140;

const checkLengthString = function (string) {
  const lengthString = string.length;
  if (lengthString>maxLengthString) {
    return false;
  }
  return true;
};

checkLengthString('Комментарий');
