import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const EntityManager = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.manager;
  },
);
