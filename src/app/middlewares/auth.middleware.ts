import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import env from '../config/env';

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization || '';
      const [bearer, token] = authHeader.split(' ');

      if (!authHeader) {
        throw new HttpException(
          'Token JWT não está presente.',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (bearer.trim().toLowerCase() !== 'bearer') {
        throw new HttpException(
          'Token JWT não está presente',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const decoded = verify(token, env.jwtSecret);
      (req as CustomRequest).token = decoded;
      next();
    } catch (error) {
      throw new HttpException('Token JWT inspirado', HttpStatus.UNAUTHORIZED);
    }
  }
}
