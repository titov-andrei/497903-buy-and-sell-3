"use strict";

const { Router } = require(`express`);
const mainRoutes = new Router();
const api = require(`../api`).getAPI();

mainRoutes.get(`/`, async (req, res) => {
  const pugOffers = await api.getOffers();
  res.render(`main`, { pugOffers });
});
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/login`, (req, res) => res.render(`login`));
mainRoutes.get(`/search`, (req, res) => res.render(`search-result`));

module.exports = mainRoutes;
