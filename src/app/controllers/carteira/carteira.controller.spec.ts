import { Test, TestingModule } from '@nestjs/testing';
import { CarteiraController } from './carteira.controller';

describe('CarteiraController', () => {
  let controller: CarteiraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarteiraController],
    }).compile();

    controller = module.get<CarteiraController>(CarteiraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
