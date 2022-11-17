import { Test, TestingModule } from '@nestjs/testing';
import { CreateTipoCarteiraDto } from '../../src/app/dto/CreateWalletTypeDto';
import { TipoCarteira } from '../../src/app/persistence/entities/tipoCarteira.entity';
import { TipoCarteiraService } from '../../src/app/services/WalletTypeService';
import { TipoCarteiraController } from '../../src/app/controllers/WalletTypeController';

const mockSut = () => {
  const tiposCarteiras: TipoCarteira[] = [
    new TipoCarteira('any_tipo1', 'any_descricao'),
    new TipoCarteira('any_tipo2', 'any_descricao'),
  ];
  const newTipoCarteira = new TipoCarteira('any_tipo1', 'any_descricao');
  return {
    tiposCarteiras,
    newTipoCarteira,
  };
};
describe('TipoCarteiraController tests unit', () => {
  let tipoCarteiraController: TipoCarteiraController;
  let tipoCarteiraService: TipoCarteiraService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCarteiraController],
      providers: [
        {
          provide: TipoCarteiraService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().tiposCarteiras),
            create: jest.fn().mockResolvedValue(mockSut().newTipoCarteira),
          },
        },
      ],
    }).compile();

    tipoCarteiraController = module.get<TipoCarteiraController>(
      TipoCarteiraController,
    );
    tipoCarteiraService = module.get<TipoCarteiraService>(TipoCarteiraService);
  });

  it('should be defined', () => {
    expect(tipoCarteiraController).toBeDefined();
  });
  it('should return a list of tipos carteiras successfully', async () => {
    const { tiposCarteiras } = mockSut();
    const result = await tipoCarteiraController.findAll();
    expect(result).toEqual(tiposCarteiras);
    expect(typeof result).toEqual('object');
    expect(tipoCarteiraService.findAll).toHaveBeenCalledTimes(1);
  });
  it('should throw an exception when listing tipos carteiras ', () => {
    jest
      .spyOn(tipoCarteiraService, 'findAll')
      .mockRejectedValueOnce(new Error());

    expect(tipoCarteiraController.findAll()).rejects.toThrowError();
  });

  it('should create a tipo carteira successfully', async () => {
    const body: CreateTipoCarteiraDto = {
      name: 'any_tipo1',
      descricao: 'any_descricao',
    };
    const result = await tipoCarteiraController.create(body);
    const { newTipoCarteira } = mockSut();

    expect(result).toEqual(newTipoCarteira);
    expect(tipoCarteiraService.create).toHaveBeenCalledTimes(1);
    expect(tipoCarteiraService.create).toHaveBeenCalledWith(body);
  });
  it('should throw an exception when create tipo carteira', () => {
    const body: CreateTipoCarteiraDto = {
      name: 'any_tipo1',
      descricao: 'any_descricao',
    };
    jest
      .spyOn(tipoCarteiraService, 'create')
      .mockRejectedValueOnce(new Error());

    expect(tipoCarteiraController.create(body)).rejects.toThrowError();
  });
});
