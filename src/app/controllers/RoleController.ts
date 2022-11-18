import { Role } from '../persistence/entities/RoleEntity';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateRolePermissionDto } from '../dto/CreateRolePermissionDto';
import { RoleService } from '../services/RoleService';

@Controller({ path: 'roles' })
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova role' })
  async create(@Body() body: CreateRolePermissionDto): Promise<Role> {
    return await this.roleService.create(body);
  }
  @ApiResponse({
    status: 200,
    description: 'Lista de roles retornada com sucesso',
    type: Role,
    isArray: true,
  })
  @Get()
  @ApiOperation({ summary: 'Listar todas as roles' })
  async findAll(): Promise<Role[]> {
    return await this.roleService.findAll();
  }
}
