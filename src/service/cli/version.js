"use strict";

const chalk = require(`chalk`);
const packageFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageFile.version;
    console.info(chalk.blue(`v${version}`));
  }
};
