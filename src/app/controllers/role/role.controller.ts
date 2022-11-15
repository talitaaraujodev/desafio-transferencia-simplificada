import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRolePermissionDto } from './../../persistence/dto/createRolePermission.dto';
import { RoleService } from '../../services/role/role.service';

@Controller({ path: 'roles' })
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas as roles' })
  async findAll() {
    return await this.roleService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova role' })
  async create(@Body() body: CreateRolePermissionDto) {
    return await this.roleService.create(body);
  }
}
