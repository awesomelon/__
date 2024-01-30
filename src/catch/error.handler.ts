import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

// logger
import { LoggerService } from 'src/logger/logger.service';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status = exception ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const loggerService = new LoggerService(request.url.slice(1).split('/')[0]);

    loggerService.error(
      `${request.method}: ${request.url} ${status} ${exception.message}`,
      request.url
    );

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
