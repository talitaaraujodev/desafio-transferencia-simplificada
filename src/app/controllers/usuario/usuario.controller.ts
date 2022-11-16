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
  ValidationPipe,
  UsePipes,
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
  async findAll() {
    return this.usuarioService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo usuário' })
  async create(@Body() body: CreateUsuarioRoleDto) {
    return this.usuarioService.create(body);
  }
  @ApiBearerAuth('access-token')
  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Exibir os dados de um usuário' })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.usuarioService.findOne(id);
  }
  @ApiBearerAuth('access-token')
  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  async delete(@Param('id') id: number) {
    return this.usuarioService.delete(id);
  }
}
