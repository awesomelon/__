import { Test, TestingModule } from '@nestjs/testing';
import { HeartController } from './heart.controller';
import { HeartService } from './heart.service';
import { RequestChargingHeartDTO, RequestUseHeartDTO } from './dto';

describe('Heart Controller', () => {
  let controller: HeartController;
  let authService: HeartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartController],
      providers: [
        {
          provide: HeartService,
          useValue: {
            charging: jest.fn().mockResolvedValue({
              id: 2,
              createdAt: '2024-01-31T13:35:43.658Z',
              updatedAt: '2024-01-31T15:54:06.819Z',
              isDeleted: false,
              totalAmount: 304,
              userId: 2,
            }),
            use: jest.fn().mockResolvedValue(10),
          },
        },
      ],
    }).compile();

    controller = module.get<HeartController>(HeartController);
    authService = module.get<HeartService>(HeartService);
  });

  it('일반 하트 충전', async () => {
    const dto: RequestChargingHeartDTO = {
      amount: 10,
    };

    const req = { user: { id: 2 } };

    expect(await controller.charging(dto, req)).toEqual({
      id: 2,
      createdAt: '2024-01-31T13:35:43.658Z',
      updatedAt: '2024-01-31T15:54:06.819Z',
      isDeleted: false,
      totalAmount: 304,
      userId: 2,
    });
    expect(authService.charging).toHaveBeenCalledWith(dto, 2);
  });

  it('하트 사용', async () => {
    const dto: RequestUseHeartDTO = {
      amount: 10,
    };

    const req = { user: { id: 2 } };

    expect(await controller.use(dto, req)).toEqual(10);
    expect(authService.use).toHaveBeenCalledWith(dto, 2);
  });
});
