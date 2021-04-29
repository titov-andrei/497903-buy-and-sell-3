"use strict";

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();

const OFFERS_PER_PAGE = 8;

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
mainRoutes.get(`/`, async (req, res) => {
  let { page = 1 } = req.query;
  page = +page;
  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;

  const [{ count, pugOffers }, categories] = await Promise.all([
    api.getOffers({ limit, offset }),
    api.getCategories(true),
  ]);

  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);
  res.render(`main`, { pugOffers, page, totalPages, categories });
});
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/search`, async (req, res) => {
  try {
    const { search } = req.query;
    const results = await api.search(search);

    res.render(`search-result`, {
      results,
    });
  } catch (error) {
    res.render(`search-result`, {
      results: [],
    });
  }
});

module.exports = mainRoutes;
