import {
  NestMiddleware,
  Injectable,
  ForbiddenException,
  Type,
  mixin,
  Inject,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { UserService } from '../../services/UserService';

export function PermissionMiddlewareCreator(
  roles: string[],
): Type<NestMiddleware> {
  @Injectable()
  class PermissionMiddleware implements NestMiddleware {
    constructor(
      @Inject('UserService')
      private readonly usuarioService: UserService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
      const authHeader = req.headers.authorization || '';

      const [, token] = authHeader?.split(' ');

      const payload: any = decode(token);
      const user: any = await this.usuarioService.findOne(
        Number(payload?.subject?.sub),
      );

      const userRoles = user.UsersRoles.map((u: any) => u.Roles.name);

      const existsRoles = userRoles?.some((r: any) => roles.includes(r));
      if (existsRoles) {
        return next();
      }
      throw new ForbiddenException();
    }
  }
  return mixin(PermissionMiddleware);
}
