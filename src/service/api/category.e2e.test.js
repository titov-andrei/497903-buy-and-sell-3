"use strict";

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);

const { HttpCode } = require(`../constants`);

const mockData = [
  {
    id: "Xmp2tM",
    title: "Продам отличную подборку фильмов на VHS",
    picture: "item13.jpg",
    description:
      "Сделано из качественных материалов. Даю недельную гарантию. Две страницы заляпаны свежим кофе. Кому нужен этот новый телефон, если тут такое...",
    type: "offer",
    sum: 35143,
    category: ["Разное"],
    comments: [
      {
        text:
          "Оплата наличными или перевод на карту? А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.",
        id: "dLw1AR",
      },
      {
        text:
          "Продаю в связи с переездом. Отрываю от сердца. А где блок питания?",
        id: "fcMzsD",
      },
      {
        text: "Совсем немного... Оплата наличными или перевод на карту?",
        id: "K7Mo-Z",
      },
      {
        text: "С чем связана продажа? Почему так дешёво?",
        id: "G-Sz8h",
      },
      {
        text:
          "А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?",
        id: "kXvQ6T",
      },
    ],
  },
  {
    id: "wFlWVs",
    title: "Продам новую приставку Sony Playstation 5",
    picture: "item12.jpg",
    description:
      "Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Мой дед не мог её сломать. Это настоящая находка для коллекционера!",
    type: "offer",
    sum: 5556,
    category: ["Учёба"],
    comments: [],
  },
  {
    id: "2tcRlq",
    title: "Продам советскую посуду.Почти не разбита.",
    picture: "item10.jpg",
    description:
      "Это настоящая находка для коллекционера! Товар в отличном состоянии. Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки.",
    type: "offer",
    sum: 40951,
    category: ["Журналы"],
    comments: [],
  },
  {
    id: "ZH4yfd",
    title: "Продам коллекцию журналов «Огонёк».",
    picture: "item14.jpg",
    description:
      "Сделано из качественных материалов. Кажется, что это хрупкая вещь. Товар в отличном состоянии. Это настоящая находка для коллекционера!",
    type: "offer",
    sum: 26409,
    category: ["Искусство"],
    comments: [],
  },
  {
    id: "GSLZUW",
    title: "Продам уроки по рисованию.",
    picture: "item03.jpg",
    description:
      "Если найдёте дешевле — сброшу цену. Бонусом отдам все аксессуары. Кому нужен этот новый телефон, если тут такое... Даю недельную гарантию.",
    type: "sale",
    sum: 50139,
    category: ["Музыка"],
    comments: [
      {
        text:
          "Почему в таком ужасном состоянии? Совсем немного... С чем связана продажа? Почему так дешёво?",
        id: "gV9mfC",
      },
      {
        text: "Оплата наличными или перевод на карту?",
        id: "PrsGYM",
      },
      {
        text:
          "Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. Неплохо, но дорого",
        id: "IZMljO",
      },
      {
        text: "А где блок питания? Совсем немного...",
        id: "c5hU1B",
      },
      {
        text:
          "Продаю в связи с переездом. Отрываю от сердца. А где блок питания? С чем связана продажа? Почему так дешёво?",
        id: "BI0X2n",
      },
    ],
  },
];

const app = express();
app.use(express.json());
category(app, new DataService(mockData));

describe(`API returns category list`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns list of 5 categories`, () =>
    expect(response.body.length).toBe(5));

  test(`Category names are "Разное",
        "Учёба",
        "Журналы",
        "Искусство",
        "Музыка"`, () =>
    expect(response.body).toEqual(
      expect.arrayContaining([
        `Разное`,
        `Учёба`,
        `Журналы`,
        `Искусство`,
        `Музыка`,
      ])
    ));
});
