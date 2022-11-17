import { WalletTypeRepositoryImp } from './../../src/app/persistence/repositories/implementations/WalletTypeRepositoryImp';
import { CreateWalletTypeDto } from '../../src/app/dto/CreateWalletTypeDto';
import { WalletTypeRepository } from '../../src/app/persistence/repositories/WalletTypeRepository';
import { Test, TestingModule } from '@nestjs/testing';
import { WalletType } from '../../src/app/persistence/entities/WalletTypeEntity';
import { WalletTypeService } from '../../src/app/services/WalletTypeService';

const mockSut = () => {
  const walletTypes: WalletType[] = [
    new WalletType('any_tipo1', 'any_descricao'),
    new WalletType('any_tipo2', 'any_descricao'),
  ];
  const newWalletType = new WalletType('any_tipo1', 'any_descricao');
  return {
    walletTypes,
    newWalletType,
  };
};
describe('WalletTypeService unit tests', () => {
  let walletTypeService: WalletTypeService;
  let walletTypeRepository: WalletTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WalletTypeService,
        {
          provide: 'WalletTypeRepository',
          useClass: WalletTypeRepositoryImp,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().walletTypes),
            create: jest.fn().mockResolvedValue(mockSut().newWalletType),
          },
        },
      ],
    }).compile();

    walletTypeService = module.get<WalletTypeService>(WalletTypeService);
    walletTypeRepository = module.get<WalletTypeRepository>(
      WalletTypeRepositoryImp,
    );
  });

  it('should be defined', () => {
    expect(walletTypeService).toBeDefined();
  });
  it('should return a list of tipos carteiras successfully', async () => {
    const result = await walletTypeService.findAll();
    const { walletTypes } = mockSut();
    expect(result).toEqual(walletTypes);
    expect(walletTypeRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when listing tipos carteiras', () => {
    jest
      .spyOn(walletTypeRepository, 'findAll')
      .mockRejectedValueOnce(new Error());

    expect(walletTypeService.findAll()).rejects.toThrowError();
  });
  it('should create a  tipo carteira successfully', async () => {
    const data: CreateWalletTypeDto = {
      name: 'any_tipo1',
      descricao: 'any_descricao',
    };
    const result = await walletTypeService.create(data);
    const { walletTypes } = mockSut();

    expect(result).toEqual(walletTypes[0]);
    expect(walletTypeRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when create tipo carteira', () => {
    const data: CreateWalletTypeDto = {
      name: 'any_tipo1',
      descricao: 'any_descricao',
    };

    jest.spyOn(walletTypeRepository, 'create').mockRejectedValue(new Error());

    expect(walletTypeService.create(data)).rejects.toThrowError();
  });
});
