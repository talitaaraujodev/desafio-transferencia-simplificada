import {
  NestMiddleware,
  Injectable,
  ForbiddenException,
  Type,
  mixin,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { UsuarioService } from '../../services/usuario/usuario.service';

export function PermissionMiddlewareCreator(
  roles: string[],
): Type<NestMiddleware> {
  @Injectable()
  class PermissionMiddleware implements NestMiddleware {
    constructor(private readonly usuarioService: UsuarioService) {}
    async use(req: Request, res: Response, next: NextFunction) {
      const authHeader = req.headers.authorization || '';

      const [, token] = authHeader?.split(' ');

      const payload: any = decode(token);
      const user: any = await this.usuarioService.findOne(
        Number(payload?.subject?.sub),
      );

      const userRoles = user.UsuariosRoles.map((u: any) => u.Roles.name);

      const existsRoles = userRoles?.some((r: any) => roles.includes(r));
      if (existsRoles) {
        return next();
      }
      throw new ForbiddenException();
    }
  }
  return mixin(PermissionMiddleware);
}
