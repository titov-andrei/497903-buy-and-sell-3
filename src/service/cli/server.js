"use strict";

// подключим дополнительные пакеты
const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;

// подключим статус-коды
const { HttpCode } = require(`../constants`);

// порт по умолчанию и имя файла с моками
const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

// создание express сервера
const app = express();
app.use(express.json());

app.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.send([]);
  }
});

app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;
    const port = Number(parseInt(userPort, 10)) || DEFAULT_PORT;

    app.listen(port, () =>
      console.log(chalk.green(`Ожидаю соединений на ${port}`))
    );
  },
};
