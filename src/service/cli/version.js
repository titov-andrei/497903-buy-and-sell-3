"use strict";

const packageFile = require(`../../../package.json`);

module.exports = {
  name: `--version`,
  run() {
    const version = packageFile.version;
    console.info(`v${version}`);
  }
};
