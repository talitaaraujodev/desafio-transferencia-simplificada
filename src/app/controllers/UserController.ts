import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';
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
  Inject,
} from '@nestjs/common';
import { CreateUserRoleDto } from '../dto/CreateUserRoleDto';
import { UserService } from '../services/UserService';

@Controller({ path: 'users' })
@ApiTags('Usuarios')
export class UserController {
  constructor(
    @Inject('UserService')
    private readonly userService: UserService,
  ) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma novo usuário' })
  async create(@Body() body: CreateUserRoleDto): Promise<User> {
    return await this.userService.create(body);
  }
  @ApiBearerAuth('access-token')
  @Get()
  @ApiOperation({ summary: 'Listar todas os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios retornada com sucesso',
    type: User,
    isArray: true,
  })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
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
