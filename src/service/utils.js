"use strict";

const fs = require(`fs`);
const {
  TITLES,
  CATEGORIES,
  SENTENCES,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`./mockData`);

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

const getPictureFilename = number =>
  `item${number < 10 ? `0${number}` : number}.jpg`;

const generateOffers = count =>
  Array(count)
    .fill({})
    .map(() => ({
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      picture: getPictureFilename(
        getRandomInt(PictureRestrict.min, PictureRestrict.max)
      ),
      description: shuffle(SENTENCES)
        .slice(1, 5)
        .join(` `),
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]]
    }));

const makeMockData = (filename, data) => {
  fs.writeFileSync(filename, data, err => {
    if (err) {
      console.error(`Can't write data to file`);
    }

    console.log(`The file has been saved!`);
  });
};

module.exports = {
  getRandomInt,
  shuffle,
  getPictureFilename,
  generateOffers,
  makeMockData
};
