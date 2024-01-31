import { Test, TestingModule } from '@nestjs/testing';
import { BonusHeartController } from './bonusHeart.controller';
import { BonusHeartService } from './bonusHeart.service';
import { RequestChargingBonusHeartDTO } from './dto';

describe('BonusHeart Controller', () => {
  let controller: BonusHeartController;
  let authService: BonusHeartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BonusHeartController],
      providers: [
        {
          provide: BonusHeartService,
          useValue: {
            charging: jest.fn().mockResolvedValue({
              id: 2,
              createdAt: '2024-01-31T13:36:30.279Z',
              updatedAt: '2024-01-31T13:36:30.279Z',
              isDeleted: false,
              totalAmount: 10,
              userId: 2,
              adminId: 1,
              expiredStartAt: '2024-01-31T20:00:20.489Z',
              expiredEndAt: '2024-01-31T20:00:20.489Z',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<BonusHeartController>(BonusHeartController);
    authService = module.get<BonusHeartService>(BonusHeartService);
  });

  it('보너스 하트 충전', async () => {
    const dto: RequestChargingBonusHeartDTO = {
      amount: 10,
      userId: 2,
      expiredStartAt: new Date(),
      expiredEndAt: new Date(),
    };

    const req = { user: { id: 1 } };

    expect(await controller.charging(dto, req)).toEqual({
      id: 2,
      createdAt: '2024-01-31T13:36:30.279Z',
      updatedAt: '2024-01-31T13:36:30.279Z',
      isDeleted: false,
      totalAmount: 10,
      userId: 2,
      adminId: 1,
      expiredStartAt: '2024-01-31T20:00:20.489Z',
      expiredEndAt: '2024-01-31T20:00:20.489Z',
    });
    expect(authService.charging).toHaveBeenCalledWith(dto, 1);
  });
});
