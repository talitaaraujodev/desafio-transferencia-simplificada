import { User } from '../persistence/entities/UserEntity';
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
import { CreateUserRoleDto } from '../dto/CreateUserRoleDto';
import { UserService } from '../services/UserService';

@Controller({ path: 'user' })
@ApiTags('Usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({ summary: 'Listar todas os usuários' })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo usuário' })
  async create(@Body() body: CreateUserRoleDto): Promise<User> {
    return await this.userService.create(body);
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
  ): Promise<User> {
    return await this.userService.findOne(id);
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
  ): Promise<User> {
    return await this.userService.delete(id);
  }
}
