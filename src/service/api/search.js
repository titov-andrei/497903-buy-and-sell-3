"use strict";

const { Router } = require(`express`);
const { HttpCode } = require(`../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  // возвращает результаты поиска
  route.get(`/`, async (req, res) => {
    const { query = `` } = req.query;

    if (!query) {
      res.status(HttpCode.BAD_REQUEST).json([]);
      return;
    }

    // пользуемся возможностями сервиса offerService,
    // который передаётся в виде аргумента
    // вызываем метод findAll, который должен
    // вернуть все результаты поиска
    const searchResults = await service.findAll(query);
    const searchStatus =
      searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

    res.status(searchStatus).json(searchResults);
  });
};
