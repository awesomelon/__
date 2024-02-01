import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const exceptionResponse = exception.getResponse();
    const status = exceptionResponse['statusCode'];
    const message = exceptionResponse['message'];

    response.status(200).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}

enum ExceptionMessageType {
  TF001 = '잘못된 이메일 형식입니다.',
  TF002 = '잘못된 비밀번호 형식입니다.',
  TF003 = '존재하지 않는 계정입니다.',
  TF004 = '존재하지 않는 이메일입니다. 이메일을 확인해 주세요.',

  TF400 = '권한이 없습니다.',
  TF440 = '하트 충전은 정수형이어야 합니다.',
  TF441 = '하트 충전은 0보다 커야 합니다.',
  TF442 = '보너스 하트 유효 시작 시간은 현재 시간 이후여야 합니다.',
  TF443 = '보너스 하트 유효 종료 시간은 현재 시간 이후여야 합니다.',
  TF444 = '잔여 하트가 부족합니다.',
  TF445 = '하트 사용은 0보다 커야 합니다.',
  TF446 = '하트 사용은 정수형이여야 합니다.',

  TF554 = '잘못된 요청입니다.',
  TF555 = '서버 오류입니다. 관리자에게 문의주세요',
}

export const errorException = (statusCode: string) => {
  throw new BadRequestException({
    statusCode: statusCode,
    message: ExceptionMessageType[statusCode] || ExceptionMessageType.TF555,
  });
};
