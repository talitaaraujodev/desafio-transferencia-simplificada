import { CreateUsuarioRoleDto } from './../../persistence/dto/createUsuarioRole.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Controller({ path: 'usuarios' })
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas os usuários' })
  async findAll() {
    return this.usuarioService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo usuário' })
  async create(@Body() body: CreateUsuarioRoleDto) {
    return this.usuarioService.create(body);
  }
  @Get(':id')
  @ApiOperation({ summary: 'Exibir os dados de um usuário' })
  async findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  async delete(@Param('id') id: number) {
    return this.usuarioService.delete(id);
  }
}
