import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermissionService } from '../../services/permission/permission.service';
import { CreatePermissionDto } from '../../persistence/dto/createPermission.dto';

@Controller('api/permission')
@ApiTags('Permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas as permissions' })
  async findAll() {
    return this.permissionService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Adicionar uma novo usuário' })
  async create(@Body() body: CreatePermissionDto) {
    return this.permissionService.create(body);
  }
}
