const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const { HttpCode } = require(`../constants`);

const mockData = [
  {
    id: "dTYKZm",
    title: "Куплю породистого кота",
    picture: "item07.jpg",
    description:
      "Даю недельную гарантию. Пользовались бережно и только по большим праздникам. Кажется, что это хрупкая вещь. Товар в отличном состоянии.",
    type: "offer",
    sum: 88441,
    category: ["Журналы"],
    comments: [
      {
        text: "С чем связана продажа? Почему так дешёво?",
        id: "hQqSP3",
      },
      {
        text: "Почему в таком ужасном состоянии?",
        id: "X9_tU_",
      },
      {
        text:
          "Вы что?! В магазине дешевле. Совсем немного... Почему в таком ужасном состоянии?",
        id: "ScnZMq",
      },
      {
        text:
          "Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого",
        id: "bq6qrQ",
      },
      {
        text: "С чем связана продажа? Почему так дешёво? Совсем немного...",
        id: "HVX5Bh",
      },
      {
        text:
          "Почему в таком ужасном состоянии? Продаю в связи с переездом. Отрываю от сердца.",
        id: "se0f1V",
      },
      {
        text: "Совсем немного... А где блок питания?",
        id: "b-VzoD",
      },
    ],
  },
  {
    id: "04vYhZ",
    title: "Куплю породистого кота",
    picture: "item10.jpg",
    description:
      "Кому нужен этот новый телефон, если тут такое... Если товар не понравится — верну всё до последней копейки. Возраст настоящий. Не подделка. Кажется, что это хрупкая вещь.",
    type: "offer",
    sum: 71224,
    category: ["Спорт"],
    comments: [
      {
        text: "С чем связана продажа? Почему так дешёво?",
        id: "Edp_a9",
      },
      {
        text: "Совсем немного... Вы что?! В магазине дешевле.",
        id: "JU0NbC",
      },
      {
        text: "Неплохо, но дорого Совсем немного...",
        id: "7YubM8",
      },
      {
        text: "Почему в таком ужасном состоянии?",
        id: "QXcUCq",
      },
    ],
  },
  {
    id: "NiIiDw",
    title: "Продам коллекцию журналов «Огонёк».",
    picture: "item14.jpg",
    description:
      "Пользовались бережно и только по большим праздникам. Мой дед не мог её сломать. Даю недельную гарантию. Две страницы заляпаны свежим кофе.",
    type: "sale",
    sum: 70501,
    category: ["Спорт"],
    comments: [
      {
        text: "Вы что?! В магазине дешевле.",
        id: "MWjCZH",
      },
      {
        text:
          "А сколько игр в комплекте? Почему в таком ужасном состоянии? Совсем немного...",
        id: "NC5pKv",
      },
      {
        text: "А где блок питания? Совсем немного... Неплохо, но дорого",
        id: "LIAB_n",
      },
      {
        text:
          "Неплохо, но дорого А где блок питания? Почему в таком ужасном состоянии?",
        id: "SWICV7",
      },
      {
        text: "Почему в таком ужасном состоянии?",
        id: "F6bLdp",
      },
      {
        text:
          "А сколько игр в комплекте? Оплата наличными или перевод на карту? Почему в таком ужасном состоянии?",
        id: "Ef_9jN",
      },
    ],
  },
  {
    id: "tbO_yN",
    title: "Куплю породистого кота",
    picture: "item02.jpg",
    description:
      "Не пытайтесь торговаться. Цену вещам я знаю. Сделано из качественных материалов. Мой дед не мог её сломать. Если найдёте дешевле — сброшу цену.",
    type: "sale",
    sum: 12472,
    category: ["Учёба"],
    comments: [
      {
        text:
          "Совсем немного... А сколько игр в комплекте? А где блок питания?",
        id: "cYWL4j",
      },
    ],
  },
  {
    id: "RybANF",
    title: "Продам книги Стивена Кинга",
    picture: "item01.jpg",
    description:
      "При покупке с меня бесплатная доставка в черте города. Если товар не понравится — верну всё до последней копейки. Возраст настоящий. Не подделка. Кажется, что это хрупкая вещь.",
    type: "offer",
    sum: 29304,
    category: ["Животные"],
    comments: [
      {
        text:
          "Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца. Неплохо, но дорого",
        id: "A3J3CJ",
      },
      {
        text: "Неплохо, но дорого",
        id: "7kjJ7q",
      },
    ],
  },
];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;
  beforeAll(async () => {
    response = await request(app).get(`/search`).query({
      query: `Куплю породистого кота`,
    });
  });
  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`3 offer found`, () => expect(response.body.length).toBe(3));
  test(`Offer has correct id`, () =>
    expect(response.body[0].id).toBe(`dTYKZm`));
});

test(`API returns code 404 if nothing is found`, () =>
  request(app)
    .get(`/search`)
    .query({
      query: `Продам свою душу`,
    })
    .expect(HttpCode.NOT_FOUND));

test(`API returns 400 when query string is absent`, () =>
  request(app).get(`/search`).expect(HttpCode.BAD_REQUEST));
