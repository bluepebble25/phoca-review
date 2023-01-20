import axios from '../core/axios';

class CardApi {
  static async getAllCards(page: number | undefined) {
    const url = `/cards${page && '?page=' + page}`;
    const res = await axios.get(url);

    return res;
  }

  static async getCard(id: number) {
    const res = await axios.get(`/cards/${id}`);
    return res;
  }

  static async createCard(formData: FormData) {
    const res = await axios
      .post('/cards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return res;
  }
}

export default CardApi;
