"use strict";

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const api = require(`../api`).getAPI();
const myRoutes = new Router();

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
myRoutes.get(`/`, async (req, res) => {
  const pugOffers = await api.getOffers();
  res.render(`my-tickets`, { pugOffers });
});

myRoutes.get(`/comments`, async (req, res) => {
  const pugOffers = await api.getOffers({ comments: true });
  res.render(`comments`, { pugOffers: pugOffers.slice(0, 3) });
});

module.exports = myRoutes;
