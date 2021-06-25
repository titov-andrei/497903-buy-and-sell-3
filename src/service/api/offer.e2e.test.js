"use strict";

const express = require(`express`);
const request = require(`supertest`);

const offer = require(`./offer`);
const DataService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);

const { HttpCode } = require(`../constants`);

const mockData = [
  {
    id: "35NMNT",
    title: "Куплю антиквариат",
    picture: "item07.jpg",
    description:
      "Не пытайтесь торговаться. Цену вещам я знаю. Если товар не понравится — верну всё до последней копейки. Кажется, что это хрупкая вещь. Таких предложений больше нет!",
    type: "sale",
    sum: 80987,
    category: ["Журналы"],
    comments: [
      {
        text:
          "Оплата наличными или перевод на карту? А где блок питания? А сколько игр в комплекте?",
        id: "av3dfa",
      },
      {
        text: "Почему в таком ужасном состоянии?",
        id: "WOPcuS",
      },
      {
        text: "Вы что?! В магазине дешевле.",
        id: "BLneM0",
      },
      {
        text:
          "А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца.",
        id: "OKI8Ph",
      },
    ],
  },
  {
    id: "yvXTQV",
    title: "Куплю породистого кота",
    picture: "item02.jpg",
    description:
      "Две страницы заляпаны свежим кофе. Сделано из качественных материалов. Кому нужен этот новый телефон, если тут такое... Если найдёте дешевле — сброшу цену.",
    type: "offer",
    sum: 15233,
    category: ["Кулинария"],
    comments: [
      {
        text:
          "Оплата наличными или перевод на карту? А сколько игр в комплекте?",
        id: "EKU2oF",
      },
    ],
  },
  {
    id: "xglB7H",
    title: "Продам уроки по рисованию.",
    picture: "item00.jpg",
    description:
      "Бонусом отдам все аксессуары. Мой дед не мог её сломать. Возраст настоящий. Не подделка. Сделано из качественных материалов.",
    type: "sale",
    sum: 17384,
    category: ["Посуда"],
    comments: [
      {
        text:
          "Продаю в связи с переездом. Отрываю от сердца. А где блок питания? Вы что?! В магазине дешевле.",
        id: "wyUW1d",
      },
      {
        text: "Вы что?! В магазине дешевле.",
        id: "1BUkvU",
      },
      {
        text:
          "А где блок питания? Совсем немного... Вы что?! В магазине дешевле.",
        id: "IMwOIW",
      },
      {
        text: "Совсем немного... Вы что?! В магазине дешевле.",
        id: "I3yiEX",
      },
      {
        text: "Оплата наличными или перевод на карту?",
        id: "P10aa8",
      },
    ],
  },
  {
    id: "CBv8Hy",
    title: "Куплю антиквариат",
    picture: "item14.jpg",
    description:
      "Это настоящая находка для коллекционера! Кому нужен этот новый телефон, если тут такое... Если товар не понравится — верну всё до последней копейки. При покупке с меня бесплатная доставка в черте города.",
    type: "offer",
    sum: 17756,
    category: ["Игры"],
    comments: [
      {
        text:
          "Неплохо, но дорого Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?",
        id: "gVh1Dl",
      },
      {
        text: "Совсем немного... А сколько игр в комплекте?",
        id: "OHZ7uL",
      },
      {
        text:
          "Оплата наличными или перевод на карту? Неплохо, но дорого Продаю в связи с переездом. Отрываю от сердца.",
        id: "QgCu3y",
      },
      {
        text: "Вы что?! В магазине дешевле.",
        id: "ir3Nl5",
      },
      {
        text: "Неплохо, но дорого",
        id: "_ifwgy",
      },
      {
        text: "Оплата наличными или перевод на карту?",
        id: "C_YBDX",
      },
      {
        text: "Неплохо, но дорого",
        id: "VJ9Czg",
      },
    ],
  },
  {
    id: "Lsdv0z",
    title: "Куплю гантели.",
    picture: "item04.jpg",
    description:
      "Бонусом отдам все аксессуары. Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Возраст настоящий. Не подделка.",
    type: "sale",
    sum: 91071,
    category: ["Журналы"],
    comments: [
      {
        text:
          "Вы что?! В магазине дешевле. Оплата наличными или перевод на карту?",
        id: "VHquMo",
      },
      {
        text: "Продаю в связи с переездом. Отрываю от сердца.",
        id: "7I08nv",
      },
      {
        text: "Почему в таком ужасном состоянии? Вы что?! В магазине дешевле.",
        id: "zTIwas",
      },
    ],
  },
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 offers`, () =>
    expect(response.body.length).toBe(5));

  test(`First offer's id equals "35NMNT"`, () =>
    expect(response.body[0].id).toBe(`35NMNT`));
});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/35NMNT`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Offer's title is "Куплю антиквариат"`, () =>
    expect(response.body.title).toBe(`Куплю антиквариат`));
});

describe(`API creates an offer if data is valid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/offers`).send(newOffer);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns offer created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () =>
    request(app)
      .get(`/offers`)
      .expect((res) => expect(res.body.length).toBe(6)));
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      const badOffer = { ...newOffer };
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent offer`, () => {
  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put(`/offers/35NMNT`).send(newOffer);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed offer`, () =>
    expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offer is really changed`, () =>
    request(app)
      .get(`/offers/35NMNT`)
      .expect((res) => expect(res.body.title).toBe(`Дам погладить котика`)));
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {
  const app = createAPI();

  const validOffer = {
    category: `Это`,
    title: `валидный`,
    description: `объект`,
    picture: `объявления`,
    type: `однако`,
    sum: 404,
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(validOffer)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, () => {
  const app = createAPI();

  const invalidOffer = {
    category: `Это`,
    title: `невалидный`,
    description: `объект`,
    picture: `объявления`,
    type: `нет поля sum`,
  };

  return request(app)
    .put(`/offers/NOEXST`)
    .send(invalidOffer)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an offer`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/yvXTQV`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`yvXTQV`));

  test(`Offer count is 4 now`, () =>
    request(app)
      .get(`/offers`)
      .expect((res) => expect(res.body.length).toBe(4)));
});

test(`API refuses to delete non-existent offer`, () => {
  const app = createAPI();

  return request(app).delete(`/offers/NOEXST`).expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given offer`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/xglB7H/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 5 comments`, () =>
    expect(response.body.length).toBe(5));

  test(`First comment's id is "wyUW1d"`, () =>
    expect(response.body[0].id).toBe(`wyUW1d`));
});

describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`,
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers/xglB7H/comments`)
      .send(newComment);
  });

  test(`Status code 201`, () =>
    expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () =>
    expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () =>
    request(app)
      .get(`/offers/xglB7H/comments`)
      .expect((res) => expect(res.body.length).toBe(6)));
});

test(`API refuses to create a comment to non-existent offer and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/offers/NOEXST/comments`)
    .send({
      text: `Неважно`,
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  return request(app)
    .post(`/offers/xglB7H/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/xglB7H/comments/wyUW1d`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () =>
    expect(response.body.id).toBe(`wyUW1d`));

  test(`Comments count is 4 now`, () =>
    request(app)
      .get(`/offers/xglB7H/comments`)
      .expect((res) => expect(res.body.length).toBe(4)));
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/xglB7H/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/offers/xglB7H/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);
});

test(`When field type is wrong response code is 400`, async () => {
  const badOffers = [
    {...newOffer, sum: true},
    {...newOffer, picture: 12345},
    {...newOffer, categories: `Котики`}
  ];
  for (const badOffer of badOffers) {
    await request(app)
      .post(`/offers`)
      .send(badOffer)
      .expect(HttpCode.BAD_REQUEST);
  }
});

test(`When field value is wrong response code is 400`, async () => {
  const badOffers = [
    {...newOffer, sum: -1},
    {...newOffer, title: `too short`},
    {...newOffer, categories: []}
  ];
  for (const badOffer of badOffers) {
    await request(app)
      .post(`/offers`)
      .send(badOffer)
      .expect(HttpCode.BAD_REQUEST);
  }
});
