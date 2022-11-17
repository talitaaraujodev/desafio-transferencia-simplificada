import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permission } from '../persistence/entities/permission.entity';
import { PermissionService } from '../services/permission/permission.service';
import { CreatePermissionDto } from '../persistence/dto/createPermission.dto';

@Controller({ path: 'permissions' })
@ApiTags('Permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as permissions' })
  async findAll(): Promise<Permission[]> {
    return await this.permissionService.findAll();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Adicionar uma nova permissão' })
  async create(@Body() body: CreatePermissionDto): Promise<Permission> {
    return await this.permissionService.create(body);
  }
}
