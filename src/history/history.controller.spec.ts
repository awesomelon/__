import { Test, TestingModule } from '@nestjs/testing';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { RequestHistoryDTO } from './dto';

describe('History Controller', () => {
  let controller: HistoryController;
  let authService: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryController],
      providers: [
        {
          provide: HistoryService,
          useValue: {
            list: jest.fn().mockResolvedValue({
              totalCount: 1,
              items: [
                {
                  id: 16,
                  createdAt: '2024-01-31T11:40:11.067Z',
                  updatedAt: '2024-01-31T11:40:11.067Z',
                  isDeleted: false,
                  amount: 50,
                  userId: 2,
                  adminId: null,
                  type: 'heart',
                  expiredStartAt: null,
                  expiredEndAt: null,
                },
              ],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<HistoryController>(HistoryController);
    authService = module.get<HistoryService>(HistoryService);
  });

  it('하트 충전 내역 조회', async () => {
    const dto: RequestHistoryDTO = {
      skip: 0,
      limit: 10,
    };

    const req = { user: { id: 2 } };

    expect(await controller.list(dto.skip, dto.limit, req)).toEqual({
      totalCount: 1,
      items: [
        {
          id: 16,
          createdAt: '2024-01-31T11:40:11.067Z',
          updatedAt: '2024-01-31T11:40:11.067Z',
          isDeleted: false,
          amount: 50,
          userId: 2,
          adminId: null,
          type: 'heart',
          expiredStartAt: null,
          expiredEndAt: null,
        },
      ],
    });
    expect(authService.list).toHaveBeenCalledWith(dto, 2);
  });
});
