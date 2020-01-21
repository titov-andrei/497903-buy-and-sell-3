"use strict";

module.exports = {
  name: `--help`,
  run() {
    console.info(
        `
        --version          - Номер версии
        --help             - Помощь
        --generate <число> - Генерирует список объявлений
        `
    );
  }
};
