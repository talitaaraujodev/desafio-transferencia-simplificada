import { Usuario } from './../../persistence/entities/usuario.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioRoleDto } from './../../persistence/dto/createUsuarioRole.dto';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Controller({ path: 'usuarios' })
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({ summary: 'Listar todas os usuários' })
  async findAll(): Promise<Usuario[]> {
    return await this.usuarioService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo usuário' })
  async create(@Body() body: CreateUsuarioRoleDto): Promise<Usuario> {
    return await this.usuarioService.create(body);
  }
  @ApiBearerAuth('access-token')
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de um usuário' })
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Usuario> {
    return await this.usuarioService.findOne(id);
  }
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  async delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Usuario> {
    return await this.usuarioService.delete(id);
  }
}
