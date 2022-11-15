import { CreatePermissionDto } from './../../persistence/dto/createPermission.dto';
import { PermissionRepository } from './../../persistence/repositories/permission/permission.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { Permission } from './../../persistence/entities/permission.entity';
import { PermissionService } from './permission.service';

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
describe('PermissionService unit test', () => {
  let permissionService: PermissionService;
  let permissionRepository: PermissionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: PermissionRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().permissions),
            create: jest.fn().mockResolvedValue(mockSut().newPermission),
            findByName: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    permissionService = module.get<PermissionService>(PermissionService);
    permissionRepository =
      module.get<PermissionRepository>(PermissionRepository);
  });

  it('should be defined', () => {
    expect(permissionService).toBeDefined();
  });
  it('should return a list of permissions successfully', async () => {
    const result = await permissionService.findAll();
    const { permissions } = mockSut();
    expect(result).toEqual(permissions);
    expect(permissionRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when listing permissions', () => {
    jest
      .spyOn(permissionRepository, 'findAll')
      .mockRejectedValueOnce(new Error());

    expect(permissionService.findAll()).rejects.toThrowError();
  });
  it('should create a permission successfully', async () => {
    const data: CreatePermissionDto = {
      name: 'any_permission1',
      descricao: 'any_descricao',
    };
    const result = await permissionService.create(data);
    const { permissions } = mockSut();

    expect(result).toEqual(permissions[0]);
    expect(permissionRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when create permission', () => {
    const data: CreatePermissionDto = {
      name: 'any_permission1',
      descricao: 'any_descricao',
    };

    jest.spyOn(permissionRepository, 'create').mockRejectedValue(new Error());

    expect(permissionService.create(data)).rejects.toThrowError();
  });
});
