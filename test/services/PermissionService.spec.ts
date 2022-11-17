import { PermissionRepository } from './../../dist/app/persistence/repositories/PermissionRepository.d';
import { CreatePermissionDto } from '../../src/app/dto/CreatePermissionDto';
import { PermissionRepositoryImp } from '../../src/app/persistence/repositories/implementations/PermissionRepositoryImp';
import { Test, TestingModule } from '@nestjs/testing';
import { Permission } from '../../src/app/persistence/entities/PermissionEntity';
import { PermissionService } from '../../src/app/services/PermissionService';

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
          provide: 'PermissionRepository',
          useClass: PermissionRepositoryImp,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().permissions),
            create: jest.fn().mockResolvedValue(mockSut().newPermission),
            findByName: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    permissionService = module.get<PermissionService>(PermissionService);
    permissionRepository = module.get<PermissionRepository>(
      PermissionRepositoryImp,
    );
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
