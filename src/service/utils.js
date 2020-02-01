"use strict";

const fs = require(`fs`);

const shuffle = array => {
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomPosition = Math.floor(Math.random() * index);
    [array[index], array[randomPosition]] = [
      array[randomPosition],
      array[index]
    ];
  }

  return array;
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getPictureFilename = number =>
  `item${number < 10 ? `0${number}` : number}.jpg`;

module.exports = {
  getRandomInt,
  shuffle,
  getPictureFilename
};
