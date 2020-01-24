"use strict";

const { ExitCode } = require(`../constants`);
const { generateOffers, makeMockData } = require(`../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mock.json`;

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
    process.exit(ExitCode.success);
  }
};
