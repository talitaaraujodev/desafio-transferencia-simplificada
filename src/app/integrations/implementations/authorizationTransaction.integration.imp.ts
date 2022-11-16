import axios from '../../config/axios.config';

export class AuthorizationIntegrationImp {
  private BASE_URL =
    'https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6';

  async authorization(): Promise<any> {
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
