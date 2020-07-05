"use strict";

const pathCategories = `../../../data/categories.txt`
const pathSentences = `../../../data/sentences.txt`
const pathTitles = `../../../data/titles.txt`

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
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`./mockData`);

const readFiles = async (path) => {
  try {
    const result = await fs.readFile(path, `utf8`);
    return result.trim().split(`\n`);
    console.info(chalk.green(`The file has been read!`));
  } catch (err) {
    console.error(chalk.red(`Can't read data to file of Categories`));
  }
};

const generateOffers = (count, CATEGORIES, SENTENCES, TITLES) =>
  Array(count)
    .fill({})
    .map(() => ({
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      picture: getPictureFilename(
        getRandomInt(PictureRestrict.min, PictureRestrict.max)
      ),
      description: shuffle(SENTENCES).slice(1, 5).join(` `),
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    }));

const makeMockData = async (filename, data) => {
  try {
    await fs.writeFile(filename, data);
    console.info(chalk.green(`The file has been saved!`));
  } catch (err) {
    console.error(chalk.red(`Can't write data to file`));
  }
};

module.exports = {
  name: `--generate`,
  async run(userIndex) {
    const [count] = userIndex;

    const CATEGORIES = await readFiles(pathCategories);
    const SENTENCES = await readFiles(pathSentences);
    const TITLES = await readFiles(pathTitles);

    if (count > MAX_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_COUNT} объявлений`));
      process.exit(ExitCode.fail);
    }

    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, CATEGORIES, SENTENCES, TITLES));

    makeMockData(FILE_NAME, content);
  },
};
