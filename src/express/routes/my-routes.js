"use strict";

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const api = require(`../api`).getAPI();
const auth = require(`../middleware/auth`);
const myRoutes = new Router();
myRoutes.use(auth);

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
myRoutes.get(`/`, async (req, res) => {
  const { user } = req.session;
  const pugOffers = await api.getOffers();
  res.render(`my-tickets`, { pugOffers, user });
});

myRoutes.get(`/comments`, async (req, res) => {
  const { user } = req.session;
  const pugOffers = await api.getOffers({ comments: true });
  res.render(`comments`, { pugOffers: pugOffers.slice(0, 3), user });
});

module.exports = myRoutes;
