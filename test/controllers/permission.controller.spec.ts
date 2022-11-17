import { Test, TestingModule } from '@nestjs/testing';
import { CreatePermissionDto } from '../../src/app/dto/createPermission.dto';
import { PermissionService } from '../../src/app/services/PermissionService';
import { Permission } from '../../src/app/persistence/entities/permission.entity';
import { PermissionController } from '../../src/app/controllers/PermissionController';

const mockSut = () => {
  const permissions: Permission[] = [
    new Permission('any_permission1', 'any_descricao'),
    new Permission('any_permission2', 'any_descricao'),
  ];
  const newPermission = new Permission('any_permission1', 'any_descricao');
  return {
    permissions,
    newPermission,
  };
};
describe('PermissionController unit test', () => {
  let permissionController: PermissionController;
  let permissionService: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [
        {
          provide: PermissionService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().permissions),
            create: jest.fn().mockResolvedValue(mockSut().newPermission),
          },
        },
      ],
    }).compile();

    permissionController =
      module.get<PermissionController>(PermissionController);
    permissionService = module.get<PermissionService>(PermissionService);
  });
  it('should be defined', () => {
    expect(permissionController).toBeDefined();
  });
  it('should return a list of permissions successfully', async () => {
    const { permissions } = mockSut();
    const result = await permissionController.findAll();
    expect(result).toEqual(permissions);
    expect(typeof result).toEqual('object');
    expect(permissionService.findAll).toHaveBeenCalledTimes(1);
  });
  it('should throw an exception when listing permissions', () => {
    jest.spyOn(permissionService, 'findAll').mockRejectedValueOnce(new Error());

    expect(permissionController.findAll()).rejects.toThrowError();
  });

  it('should create a permission successfully', async () => {
    const body: CreatePermissionDto = {
      name: 'any_permission1',
      descricao: 'any_descricao',
    };
    const result = await permissionController.create(body);
    const { newPermission } = mockSut();

    expect(result).toEqual(newPermission);
    expect(permissionService.create).toHaveBeenCalledTimes(1);
    expect(permissionService.create).toHaveBeenCalledWith(body);
  });
  it('should throw an exception when create permission', () => {
    const body: CreatePermissionDto = {
      name: 'any_permission1',
      descricao: 'any_descricao',
    };
    jest.spyOn(permissionService, 'create').mockRejectedValueOnce(new Error());

    expect(permissionController.create(body)).rejects.toThrowError();
  });
});
