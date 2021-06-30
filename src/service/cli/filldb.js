"use strict";

const fs = require(`fs`).promises;
const { getPictureFilename, getRandomInt, shuffle } = require(`../utils`);
const { getLogger } = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);

const DEFAULT_COUNT = 1;
const MAX_COMMENTS = 4;

const pathCategories = `./data/categories.txt`;
const pathSentences = `./data/sentences.txt`;
const pathTitles = `./data/titles.txt`;
const pathComments = `./data/comments.txt`;

const { OfferType, SumRestrict, PictureRestrict } = require(`./mockData`);

const logger = getLogger({});

const readFiles = async (path) => {
  try {
    const result = await fs.readFile(path, `utf8`);
    return result.split(`\n`);
  } catch (err) {
    console.error(err);
  }
};

const generateComments = (count, COMMENTS, USERS) =>
  Array(count)
    .fill({})
    .map(() => ({
      user: USERS[getRandomInt(0, USERS.length - 1)].email,
      text: shuffle(COMMENTS),
    }));

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(...items.splice(getRandomInt(0, items.length - 1), 1));
  }
  return result;
};

const generateOffers = (count, CATEGORIES, SENTENCES, TITLES, COMMENTS, USERS) =>
  Array(count)
    .fill({})
    .map(() => ({
      user: USERS[getRandomInt(0, USERS.length - 1)].email,
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      picture: getPictureFilename(
        getRandomInt(PictureRestrict.min, PictureRestrict.max)
      ),
      description: shuffle(SENTENCES).slice(1, 5).join(` `),
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      categories: getRandomSubarray(CATEGORIES),
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), COMMENTS, USERS),
    }));

module.exports = {
  name: `--filldb`,
  async run(userIndex) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const CATEGORIES = await readFiles(pathCategories);
    const SENTENCES = await readFiles(pathSentences);
    const TITLES = await readFiles(pathTitles);
    const COMMENTS = await readFiles(pathComments);
    const USERS = [
      {
        name: `Иван Иванов`,
        email: `ivanov@example.com`,
        passwordHash: await passwordUtils.hash(`ivanov`),
        avatar: `avatar01.jpg`
      },
      {
        name: `Пётр Петров`,
        email: `petrov@example.com`,
        passwordHash: await passwordUtils.hash(`petrov`),
        avatar: `avatar02.jpg`
      }
    ];

    const [count] = userIndex;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = generateOffers(
      countOffer,
      TITLES,
      CATEGORIES,
      SENTENCES,
      COMMENTS,
      USERS
    );

    return initDatabase(sequelize, { offers, CATEGORIES, USERS });
  },
};
