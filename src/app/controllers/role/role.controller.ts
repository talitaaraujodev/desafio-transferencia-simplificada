import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from 'src/app/persistence/dto/createRole.dto';
import { RoleService } from '../../services/role/role.service';

@Controller('api/roles')
@ApiTags('Roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  @ApiOperation({ summary: 'Listar todas as roles' })
  async findAll() {
    return await this.roleService.findAll();
  }
  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova role' })
  async create(@Body() body: CreateRoleDto) {
    return await this.roleService.create(body);
  }
}
