import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Roles } from '../decorator/roles.decorator';
import { errorException } from '../middleware';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    if (roles.includes(request.user.role)) {
      return roles.includes(request.user.role);
    }

    return errorException('TF400');
  }
}
