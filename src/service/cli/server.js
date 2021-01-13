"use strict";

// подключим дополнительные пакеты
const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;
const routes = require(`../api`);
const getMockData = require(`../lib/get-mock-data`);
const { getLogger } = require(`../lib/logger`);

// подключим логгер
const logger = getLogger({ name: `api` });

// подключим статус-коды
const { HttpCode, API_PREFIX } = require(`../constants`);

// порт по умолчанию и имя файла с моками
const DEFAULT_PORT = 3000;

// создание express сервера
const app = express();

// логгер фиксирует все запросы к API и коды ответа на них
app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});
app.use(express.json());
app.use(API_PREFIX, routes);

// логгер фиксирует события, когда происходит запрос на несуществующий маршрут
app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occured on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    const [userPort] = args;
    const port = Number(parseInt(userPort, 10)) || DEFAULT_PORT;

    try {
      await getMockData();

      app.listen(port, (err) => {
        if (err) {
          return logger.error(
            `An error occured on server creation: ${err.message}`
          );
        }

        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  },
};
