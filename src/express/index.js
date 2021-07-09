"use strict";

const express = require(`express`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

// Маршруты приложения мы опишем в отдельных файлах.
// Для определения маршрутов мы воспользуемся Router().
// Примеры маршрутов будут продемонстрированы ниже по тексту.
const offersRoutes = require(`./routes/offers-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

// Зафиксируем порт для сервера
const DEFAULT_PORT = 8080;

const app = express();

const sequelize = require(`../service/lib/sequelize`);

// Подключаем встроенный модуль path
const path = require(`path`);

// Зафиксируем название этой директории в отдельную константу и воспользуемся express.static
const PUBLIC_DIR = `public`;

// Зафиксируем папку для загрузки файлов
const UPLOAD_DIR = `upload`;

const { SESSION_SECRET } = process.env;
if (!SESSION_SECRET) {
  throw new Error(`SESSION_SECRET environment variable is not defined`);
}

const mySessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 180000,
  checkExpirationInterval: 60000,
});

sequelize.sync({ force: false });

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: SESSION_SECRET,
    store: mySessionStore,
    resave: false,
    proxy: true,
    saveUninitialized: false,
  })
);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, UPLOAD_DIR)));

// Сконфигурировали Express для работы с pug
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

// Подключим созданные маршруты
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

// Запуск сервера
app.listen(DEFAULT_PORT);
