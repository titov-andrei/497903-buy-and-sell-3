"use strict";

const fs = require(`fs`);
const { ExitCode } = require(`../constants`);
const {
  getPictureFilename,
  getRandomInt,
  shuffle
} = require(`../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mock.json`;
const {
  TITLES,
  CATEGORIES,
  SENTENCES,
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`./mockData`);

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
  name: `--generate`,
  run(userIndex) {
    const [count] = userIndex;

    if (count > MAX_COUNT) {
      console.error(`Не больше ${MAX_COUNT} объявлений`);
      process.exit(ExitCode.fail);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    makeMockData(FILE_NAME, content);
  }
};
