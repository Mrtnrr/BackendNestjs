import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
    ForbiddenException,
    NotFoundException,
    BadGatewayException,
    InternalServerErrorException,
    PayloadTooLargeException,
    UnauthorizedException,
    RequestTimeoutException,
    MethodNotAllowedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { LoggerService } from '../helpers/logger/logger.service';

/**
 * Catch HttpErrorFilter implements ExceptionFilter
 */
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    exceptions: any[] = [
        { instance: NotFoundException, where: 'NO_FOUND' },
        { instance: HttpException },
        { instance: BadGatewayException, where: 'URL' },
    ];
    /**
     * Catchs http error filter
     * @param exception Http exception
     * @param host argiment host
     */
    constructor(private readonly _logger: LoggerService) {}
    async catch(exception: HttpException, host: ArgumentsHost) {
        // Logger.log(JSON.stringify(exception.getStatus()));
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const where: string = exception.message.where || 'SERVER';
        const errorResponce = {
            code: status,
            timestamps: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null,
        };
        Logger.error(
            await this._logger.addLoggerInterceptor(
                request,
                Date.now(),
                where,
                'ERROR',
                errorResponce,
            ),
            exception.stack,
            where,
        );

        response.status(status).json(errorResponce);
    }
}
