import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUsuarioDto } from '../../persistence/dto/createUsuario.dto';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Controller('api/usuarios')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas os usuários' })
  async findAll() {
    return this.usuarioService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Adicionar uma novo usuário' })
  async create(@Body() body: CreateUsuarioDto) {
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
