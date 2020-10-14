import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { LoggerService } from '../helpers/logger/logger.service';

/**
 * Injectable
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    /**
     * Intercepts logger interceptor
     * @param context context
     * @param call$ interceptor
     * @returns intercept call$
     */
    constructor(private readonly _logger: LoggerService) {}
    intercept(
        context: ExecutionContext,
        call$: CallHandler<any>,
    ): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>();
        const where =
            context.getClass().name + '::' + context.getHandler().name;
        const now = Date.now();
        return call$.handle().pipe(
            tap(async () => {
                Logger.log(
                    await this._logger.addLoggerInterceptor(
                        req,
                        now,
                        where,
                        'REQUEST',
                        req.body,
                    ),
                    where,
                );
            }),
            map(async (data) => {
                Logger.log(
                    await this._logger.addLoggerInterceptor(
                        req,
                        now,
                        where,
                        'RESPONSE',
                        data,
                    ),
                    where,
                );
                return data;
            }),
        );
    }
}
