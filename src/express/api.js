const axios = require(`axios`);

const TIMEOUT = 1000;

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;

class API {
  constructor(baseURL, timeout) {
    // создадим экземпляр axios
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  // общий приватный метод для загрузки данных
  async _load(url, options) {
    const response = await this._http.request({ url, ...options });
    return response.data;
  }

  // методы для получения и отправки данных
  getOffers({ offset, limit, comments } = {}) {
    return this._load(`/offers`, { params: { offset, limit, comments } });
  }

  getOffer(id, comments) {
    return this._load(`/offers/${id}`, { params: { comments } });
  }

  search(query) {
    return this._load(`/search`, { params: { query } });
  }

  getCategories(count) {
    return this._load(`/category`, { params: { count } });
  }

  createOffer(data) {
    return this._load(`/offers`, {
      method: `POST`,
      data,
    });
  }
}

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};
