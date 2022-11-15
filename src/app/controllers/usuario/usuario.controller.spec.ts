import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsuarioRoleDto } from './../../persistence/dto/createUsuarioRole.dto';
import { Usuario } from './../../persistence/entities/usuario.entity';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from '../../services/usuario/usuario.service';

const mockSut = () => {
  const usuarios: Usuario[] = [
    new Usuario(
      'any_name',
      '50000006640',
      'any_email1@email.com',
      'any_password',
    ),
    new Usuario(
      'any_name',
      '50000006640',
      'any_email2@email.com',
      'any_password',
      2,
    ),
    new Usuario(
      'any_name',
      '50000006640',
      'any_email3@email.com',
      'any_password',
    ),
  ];
  const newUsuario = new Usuario(
    'any_name',
    '50000006640',
    'any_email@email.com',
    '123456',
  );
  return { usuarios, newUsuario };
};
describe('UsuarioController unit tests', () => {
  let usuarioController: UsuarioController;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().usuarios),
            create: jest.fn().mockResolvedValue(mockSut().newUsuario),
            findOne: jest.fn().mockResolvedValue(mockSut().usuarios[0]),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usuarioController = module.get<UsuarioController>(UsuarioController);
    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(usuarioController).toBeDefined();
  });
  it('should return a list of users successfully', async () => {
    const { usuarios } = mockSut();
    const result = await usuarioController.findAll();
    expect(result).toEqual(usuarios);
    expect(typeof result).toEqual('object');
    expect(usuarioService.findAll).toHaveBeenCalledTimes(1);
  });
  it('should throw an exception when listing users', () => {
    jest.spyOn(usuarioService, 'findAll').mockRejectedValueOnce(new Error());

    expect(usuarioController.findAll()).rejects.toThrowError();
  });
  it('should create a new todo item successfully', async () => {
    const body: CreateUsuarioRoleDto = {
      name: 'any_name',
      cpf_cnpj: '50000006640',
      email: 'any_email@email.com',
      password: '123456',
      roles: [1],
    };
    const result = await usuarioController.create(body);
    const { newUsuario } = mockSut();

    expect(result).toEqual(newUsuario);
    expect(usuarioService.create).toHaveBeenCalledTimes(1);
    expect(usuarioService.create).toHaveBeenCalledWith(body);
  });
  it('should throw an exception when create user', () => {
    const body: CreateUsuarioRoleDto = {
      name: 'any_name',
      cpf_cnpj: '50000006640',
      email: 'any_email@email.com',
      password: '123456',
      roles: [1],
    };
    jest.spyOn(usuarioService, 'create').mockRejectedValueOnce(new Error());

    expect(usuarioController.create(body)).rejects.toThrowError();
  });
  it('should get a user successfully', async () => {
    const result = await usuarioController.findOne(1);
    const { usuarios } = mockSut();

    expect(result).toEqual(usuarios[0]);
    expect(usuarioService.findOne).toHaveBeenCalledTimes(1);
    expect(usuarioService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw an exception when find user', () => {
    jest.spyOn(usuarioService, 'findOne').mockRejectedValueOnce(new Error());

    expect(usuarioController.findOne(1)).rejects.toThrowError();
  });
  it('should remove a user successfully', async () => {
    const result = await usuarioController.delete(1);

    expect(result).toBeUndefined();
  });

  it('should throw an exception when delete user', () => {
    jest.spyOn(usuarioService, 'delete').mockRejectedValueOnce(new Error());

    expect(usuarioController.delete(1)).rejects.toThrowError();
  });
});
