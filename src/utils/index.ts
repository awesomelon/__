import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const errorException = (statusCode: number, message?: string) => {
  switch (statusCode) {
    case 400:
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message,
      });

    case 401:
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message,
      });

    case 403:
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message,
      });

    case 404:
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message,
      });

    case 409:
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message,
      });

    case 500:
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      });

    default:
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '관리자에게 문의주세요',
      });
  }
};
