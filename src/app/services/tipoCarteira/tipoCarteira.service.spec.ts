import { CreateTipoCarteiraDto } from './../../persistence/dto/createTipoCarteira.dto';
import { TipoCarteiraRepository } from './../../persistence/repositories/tipoCarteira/tipoCarteira.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarteira } from '../../persistence/entities/tipoCarteira.entity';
import { TipoCarteiraService } from './tipoCarteira.service';

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
describe('TipoCarteiraService unit tests', () => {
  let tipoCarteiraService: TipoCarteiraService;
  let tipoCarteiraRepository: TipoCarteiraRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoCarteiraService,
        {
          provide: TipoCarteiraRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockSut().tiposCarteiras),
            create: jest.fn().mockResolvedValue(mockSut().newTipoCarteira),
          },
        },
      ],
    }).compile();

    tipoCarteiraService = module.get<TipoCarteiraService>(TipoCarteiraService);
    tipoCarteiraRepository = module.get<TipoCarteiraRepository>(
      TipoCarteiraRepository,
    );
  });

  it('should be defined', () => {
    expect(tipoCarteiraService).toBeDefined();
  });
  it('should return a list of tipos carteiras successfully', async () => {
    const result = await tipoCarteiraService.findAll();
    const { tiposCarteiras } = mockSut();
    expect(result).toEqual(tiposCarteiras);
    expect(tipoCarteiraRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when listing tipos carteiras', () => {
    jest
      .spyOn(tipoCarteiraRepository, 'findAll')
      .mockRejectedValueOnce(new Error());

    expect(tipoCarteiraService.findAll()).rejects.toThrowError();
  });
  it('should create a  tipo carteira successfully', async () => {
    const data: CreateTipoCarteiraDto = {
      name: 'any_tipo1',
      descricao: 'any_descricao',
    };
    const result = await tipoCarteiraService.create(data);
    const { tiposCarteiras } = mockSut();

    expect(result).toEqual(tiposCarteiras[0]);
    expect(tipoCarteiraRepository.create).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when create tipo carteira', () => {
    const data: CreateTipoCarteiraDto = {
      name: 'any_tipo1',
      descricao: 'any_descricao',
    };

    jest.spyOn(tipoCarteiraRepository, 'create').mockRejectedValue(new Error());

    expect(tipoCarteiraService.create(data)).rejects.toThrowError();
  });
});
