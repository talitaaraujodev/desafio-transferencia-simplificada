import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Permission } from '../persistence/entities/PermissionEntity';
import { PermissionService } from '../services/PermissionService';
import { CreatePermissionDto } from '../dto/CreatePermissionDto';

@Controller({ path: 'permission' })
@ApiTags('Permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova permissão' })
  async create(@Body() body: CreatePermissionDto): Promise<Permission> {
    return await this.permissionService.create(body);
  }
  @Get()
  @ApiOperation({ summary: 'Listar todas as permissões' })
  @ApiResponse({
    status: 200,
    description: 'Lista de permissions retornada com sucesso',
    type: Permission,
    isArray: true,
  })
  async findAll(): Promise<Permission[]> {
    return await this.permissionService.findAll();
  }
}
