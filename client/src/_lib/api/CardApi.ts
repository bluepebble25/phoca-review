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

  static async updateCard(id: number, formData: FormData) {
    const res = await axios
      .post(`/cards/${id}`, formData, {
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

  static async deleteCard(id: number) {
    try {
      const res = await axios.delete(`/cards/${id}`);
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}

export default CardApi;
