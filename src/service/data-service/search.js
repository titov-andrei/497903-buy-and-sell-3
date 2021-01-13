"use strict";

class SearchService {
  // конструктор принимает данные о всех объявлениях
  // и сохраняет их в одноимённое приватное свойство
  constructor(offers) {
    this._offers = offers;
  }

  // метод который возвращает все объявления
  findAll(searchText) {
    return this._offers.filter((offer) => offer.title.includes(searchText));
  }
}

module.exports = SearchService;
