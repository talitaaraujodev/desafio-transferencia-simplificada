import { HttpException, HttpStatus } from '@nestjs/common';
import { EmailClient } from '../EmailClient';
import { EmailDto } from 'src/app/dto/EmailDto';
import axios from '../../config/axios/AxiosConfig';

export class EmailClientImp implements EmailClient {
  private BASE_URL = 'http://o4d9z.mocklab.io/notify';

  async notifyEmail(): Promise<EmailDto> {
    return await axios
      .get(this.BASE_URL)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          'Falha ao enviar notificação no e-mail.',
          HttpStatus.BAD_GATEWAY,
        );
      });
  }
}
