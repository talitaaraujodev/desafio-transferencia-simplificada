import { Test, TestingModule } from '@nestjs/testing';
import { CreateWalletTypeDto } from '../../src/app/dto/CreateWalletTypeDto';
import { WalletType } from '../../src/app/persistence/entities/WalletTypeEntity';
import { WalletTypeService } from '../../src/app/services/WalletTypeService';
import { WalletTypeController } from '../../src/app/controllers/WalletTypeController';

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
describe('WalletTypeController tests unit', () => {
  let walletTypeController: WalletTypeController;
  let walletTypeService: WalletTypeService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletTypeController],
      providers: [
        {
          provide: WalletTypeService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().walletTypes),
            create: jest.fn().mockResolvedValue(mockSut().newWalletType),
          },
        },
      ],
    }).compile();

    walletTypeController =
      module.get<WalletTypeController>(WalletTypeController);
    walletTypeService = module.get<WalletTypeService>(WalletTypeService);
  });

  it('should be defined', () => {
    expect(walletTypeController).toBeDefined();
  });
  it('should return a list of wallet types  successfully', async () => {
    const { walletTypes } = mockSut();
    const result = await walletTypeController.findAll();
    expect(result).toEqual(walletTypes);
    expect(typeof result).toEqual('object');
    expect(walletTypeService.findAll).toHaveBeenCalledTimes(1);
  });
  it('should throw an exception when listing  wallet types ', () => {
    jest.spyOn(walletTypeService, 'findAll').mockRejectedValueOnce(new Error());

    expect(walletTypeController.findAll()).rejects.toThrowError();
  });

  it('should create a tipo wallet types  successfully', async () => {
    const body: CreateWalletTypeDto = {
      name: 'any_tipo1',
      descricao: 'any_descricao',
    };
    const result = await walletTypeController.create(body);
    const { newWalletType } = mockSut();

    expect(result).toEqual(newWalletType);
    expect(walletTypeService.create).toHaveBeenCalledTimes(1);
    expect(walletTypeService.create).toHaveBeenCalledWith(body);
  });
  it('should throw an exception when create wallet types ', () => {
    const body: CreateWalletTypeDto = {
      name: 'any_tipo1',
      descricao: 'any_descricao',
    };
    jest.spyOn(walletTypeService, 'create').mockRejectedValueOnce(new Error());

    expect(walletTypeController.create(body)).rejects.toThrowError();
  });
});
