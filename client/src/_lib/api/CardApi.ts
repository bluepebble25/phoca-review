import axios from '../core/axios';

class CardApi {
  static async getAllCards(page: number | undefined) {
    const url = `/cards${page && '?page=' + page}`;
    const res = await axios.get(url);

    return res;
  }

  static async createCard() {
    const res = await axios.post('/cards');

    return res;
  }
}

export default CardApi;
