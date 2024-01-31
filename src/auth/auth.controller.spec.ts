import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RequestLoginDTO } from './dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ access_token: 'token' }),
            getProfile: jest.fn().mockResolvedValue({
              id: 2,
              email: 'test@thigsflow.com',
              role: 1,
              heart: 100,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('로그인 테스트', async () => {
    const loginDto: RequestLoginDTO = {
      email: 'test@example.com',
      password: 'password',
    };

    expect(await controller.login(loginDto)).toEqual({ access_token: 'token' });
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  });

  it('유저 정보 조회 테스트', async () => {
    const req = { user: { email: 'test@thigsflow.com' } };

    expect(await controller.getProfile(req)).toEqual({
      id: 2,
      email: 'test@thigsflow.com',
      role: 1,
      heart: 100,
    });
    expect(authService.getProfile).toHaveBeenCalledWith(req);
  });
});
