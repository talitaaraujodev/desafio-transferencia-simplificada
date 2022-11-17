import { Test, TestingModule } from '@nestjs/testing';
import { CreateRolePermissionDto } from '../../src/app/persistence/dto/createRolePermission.dto';
import { Role } from '../../src/app/persistence/entities/role.entity';
import { RoleService } from '../../src/app/services/role/role.service';
import { RoleController } from '../../src/app/controllers/RoleController';

const mockSut = () => {
  const roles: Role[] = [
    new Role('any_role1', 'any_descricao'),
    new Role('any_role2', 'any_descricao'),
  ];
  const newRole = new Role('any_role1', 'any_descricao');
  return {
    roles,
    newRole,
  };
};
describe('RoleController unit test', () => {
  let roleController: RoleController;
  let roleService: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        {
          provide: RoleService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().roles),
            create: jest.fn().mockResolvedValue(mockSut().newRole),
          },
        },
      ],
    }).compile();

    roleController = module.get<RoleController>(RoleController);
    roleService = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(roleController).toBeDefined();
  });

  it('should return a list of roles successfully', async () => {
    const { roles } = mockSut();
    const result = await roleController.findAll();
    expect(result).toEqual(roles);
    expect(typeof result).toEqual('object');
    expect(roleService.findAll).toHaveBeenCalledTimes(1);
  });
  it('should throw an exception when listing roles', () => {
    jest.spyOn(roleService, 'findAll').mockRejectedValueOnce(new Error());

    expect(roleController.findAll()).rejects.toThrowError();
  });

  it('should create a role successfully', async () => {
    const body: CreateRolePermissionDto = {
      name: 'any_role1',
      descricao: 'any_descricao',
      permissions: [1],
    };
    const result = await roleController.create(body);
    const { newRole } = mockSut();

    expect(result).toEqual(newRole);
    expect(roleService.create).toHaveBeenCalledTimes(1);
    expect(roleService.create).toHaveBeenCalledWith(body);
  });
  it('should throw an exception when create role', () => {
    const body: CreateRolePermissionDto = {
      name: 'any_role1',
      descricao: 'any_descricao',
      permissions: [1],
    };
    jest.spyOn(roleService, 'create').mockRejectedValueOnce(new Error());

    expect(roleController.create(body)).rejects.toThrowError();
  });
});
