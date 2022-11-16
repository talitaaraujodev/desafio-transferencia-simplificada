import {
  NestMiddleware,
  Injectable,
  HttpStatus,
  HttpException,
  ForbiddenException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { decode } from 'jsonwebtoken';
import { UsuarioService } from '../services/usuario/usuario.service';

@Injectable()
export class PermissionMiddleware implements NestMiddleware {
  constructor(private readonly usuarioService: UsuarioService) {}

  use(role: string[]) {
    const roleAuthorized = async (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      const authHeader = request.headers.authorization || '';

      const [, token] = authHeader?.split(' ');

      const payload: any = decode(token);
      const user: any = await this.usuarioService.findOne(
        Number(payload?.subject?.sub),
      );
      if (!user) {
        throw new HttpException('Usuário não existe', HttpStatus.FORBIDDEN);
      }
      const userRoles = user.UsuariosRoles.map(
        (role: any) => role.roleUsuario.nome,
      );

      const existsRoles = userRoles?.some((r: any) => role.includes(r));
      if (existsRoles) {
        return next();
      }
      throw new ForbiddenException();
    };
    return roleAuthorized;
  }
}
