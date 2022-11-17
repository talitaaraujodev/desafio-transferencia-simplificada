import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthorizationTransactionClient } from './../AuthorizationTransactionClient';
import { AuthorizationDto } from 'src/app/dto/AuthorizationDto';
import axios from '../../config/axios/AxiosConfig';

export class AuthorizationTransactionClientImp
  implements AuthorizationTransactionClient
{
  private BASE_URL =
    'https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6';

  async authorization(): Promise<AuthorizationDto> {
    return await axios
      .get(this.BASE_URL)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        throw new HttpException(
          'Trasação não foi autorizada.',
          HttpStatus.BAD_GATEWAY,
        );
      });
  }
}
