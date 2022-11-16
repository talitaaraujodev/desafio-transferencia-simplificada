import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarteiraService } from './tipoCarteira.service';

describe('TipoCarteiraService', () => {
  let service: TipoCarteiraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipoCarteiraService],
    }).compile();

    service = module.get<TipoCarteiraService>(TipoCarteiraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
