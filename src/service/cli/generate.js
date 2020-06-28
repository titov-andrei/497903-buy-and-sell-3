"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  ExitCode
} = require(`../constants`);
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
  try {
    await fs.writeFileSync(filename, data);
    console.log(chalk.green(`The file has been saved!`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file`));
  }
};

module.exports = {
  name: `--generate`,
  async run(userIndex) {
    const [count] = userIndex;

    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
      process.exit(ExitCode.fail);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));

    makeMockData(FILE_NAME, content);
  },
};
