import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserRoleDto } from '../../src/app/dto/CreateUserRoleDto';
import { User } from '../../src/app/persistence/entities/UserEntity';
import { UserController } from '../../src/app/controllers/UserController';
import { UserService } from '../../src/app/services/UserService';

const mockSut = () => {
  const users: User[] = [
    new User('any_name', '50000006640', 'any_email1@email.com', 'any_password'),
    new User('any_name', '50000006642', 'any_email2@email.com', 'any_password'),
  ];
  const newUser = new User(
    'any_name',
    '50000006640',
    'any_email@email.com',
    '123456',
  );
  return { users, newUser };
};
describe('UserController unit tests', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().users),
            create: jest.fn().mockResolvedValue(mockSut().newUser),
            findOne: jest.fn().mockResolvedValue(mockSut().users[0]),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });
  it('should return a list of users successfully', async () => {
    const { users } = mockSut();
    const result = await userController.findAll();
    expect(result).toEqual(users);
    expect(typeof result).toEqual('object');
    expect(userService.findAll).toHaveBeenCalledTimes(1);
  });
  it('should throw an exception when listing users', () => {
    jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

    expect(userController.findAll()).rejects.toThrowError();
  });
  it('should create a new user successfully', async () => {
    const body: CreateUserRoleDto = {
      name: 'any_name',
      cpf_cnpj: '50000006640',
      email: 'any_email@email.com',
      password: '123456',
      roles: [1],
    };
    const result = await userController.create(body);
    const { newUser } = mockSut();

    expect(result).toEqual(newUser);
    expect(userService.create).toHaveBeenCalledTimes(1);
    expect(userService.create).toHaveBeenCalledWith(body);
  });
  it('should throw an exception when create user', () => {
    const body: CreateUserRoleDto = {
      name: 'any_name',
      cpf_cnpj: '50000006640',
      email: 'any_email@email.com',
      password: '123456',
      roles: [1],
    };
    jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

    expect(userController.create(body)).rejects.toThrowError();
  });
  it('should get a user successfully', async () => {
    const result = await userController.findOne(1);
    const { users } = mockSut();

    expect(result).toEqual(users[0]);
    expect(userService.findOne).toHaveBeenCalledTimes(1);
    expect(userService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw an exception when find user', () => {
    jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());

    expect(userController.findOne(1)).rejects.toThrowError();
  });
  it('should remove a user successfully', async () => {
    const result = await userController.delete(1);

    expect(result).toBeUndefined();
  });

  it('should throw an exception when delete user', () => {
    jest.spyOn(userService, 'delete').mockRejectedValueOnce(new Error());

    expect(userController.delete(1)).rejects.toThrowError();
  });
});
