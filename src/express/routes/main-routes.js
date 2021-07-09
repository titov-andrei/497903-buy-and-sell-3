"use strict";

// Подключаем и инициализируем экземпляр Router
const { Router } = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();
const upload = require(`../middlewares/upload`);

const OFFERS_PER_PAGE = 8;

// Определяем `GET` маршруты.
// В качестве ответа отправляем путь маршрута.
mainRoutes.get(`/`, async (req, res) => {
  const { user } = req.session;
  let { page = 1 } = req.query;
  page = +page;
  const limit = OFFERS_PER_PAGE;
  const offset = (page - 1) * OFFERS_PER_PAGE;

  const [{ count, pugOffers }, categories] = await Promise.all([
    api.getOffers({ limit, offset }),
    api.getCategories(true),
  ]);

  const totalPages = Math.ceil(count / OFFERS_PER_PAGE);
  res.render(`main`, { pugOffers, page, totalPages, categories, user });
});

mainRoutes.get(`/register`, (req, res) => {
  const { error } = req.query;
  const { user } = req.session;
  res.render(`sign-up`, { error, user });
});

mainRoutes.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const { body, file } = req;
  const userData = {
    avatar: file.filename,
    name: body[`user-name`],
    email: body[`user-email`],
    password: body[`user-password`],
    passwordRepeated: body[`user-password-again`],
  };
  try {
    await api.createUser(userData);
    res.redirect(`/login`);
  } catch (error) {
    res.redirect(`/register?error=${encodeURIComponent(error.response.data)}`);
  }
});

mainRoutes.get(`/login`, (req, res) => {
  const { error } = req.query;
  const { user } = req.session;
  res.render(`login`, { error });
});

mainRoutes.post(`/login`, async (req, res) => {
  try {
    const user = await api.auth(
      req.body[`user-email`],
      req.body[`user-password`]
    );
    req.session.user = user;
    res.redirect(`/`);
  } catch (error) {
    res.redirect(`/login?error=${encodeURIComponent(error.response.data)}`);
  }
});

mainRoutes.get(`/logout`, (req, res) => {
  delete req.session.user;
  res.redirect(`/`);
});

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
