import axios from '../../../config/axios/axios.config';

export class EmailClienteIntegrationImp {
  private BASE_URL = 'http://o4d9z.mocklab.io/notify';

  async notify(): Promise<any> {
    return await axios
      .get(this.BASE_URL)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
