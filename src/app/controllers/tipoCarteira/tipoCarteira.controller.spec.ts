import { Test, TestingModule } from '@nestjs/testing';
import { TipoCarteiraController } from './tipoCarteira.controller';

describe('TipoCarteiraController', () => {
  let controller: TipoCarteiraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoCarteiraController],
    }).compile();

    controller = module.get<TipoCarteiraController>(TipoCarteiraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
