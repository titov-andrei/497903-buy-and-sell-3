"use strict";

// подключим дополнительные пакеты
const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;
const routes = require(`../api`);
const getMockData = require(`../lib/get-mock-data`);

// подключим статус-коды
const { HttpCode, API_PREFIX } = require(`../constants`);

// порт по умолчанию и имя файла с моками
const DEFAULT_PORT = 3000;

// создание express сервера
const app = express();
app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

module.exports = {
  name: `--server`,
  async run(args) {
    const [userPort] = args;
    const port = Number(parseInt(userPort, 10)) || DEFAULT_PORT;

    try {
      await getMockData();

      app.listen(port, (err) => {
        if (err) {
          return console.error(`Ошибка при создании сервера`, err);
        }

        return console.info(chalk.green(`Ожидаю соединений на ${port}`));
      });
    } catch (err) {
      console.error(`Произошла ошибка: ${err.message}`);
      process.exit(1);
    }
  },
};
