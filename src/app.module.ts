import { HttpModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { HttpErrorFilter } from './filters/http-error.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { config } from 'dotenv';
import { HelpersModule } from './helpers/helpers.module';

import { ShowModule } from './core/shows/show.module';

/**
 * Module
 */
@Module({
    imports: [
        // Typeorm  config async
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
              uri: configService.get('MONGODB_URI'),
            }),
            inject: [ConfigService],
          }),
        // multer config async for upload files
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (_config: ConfigService) => ({
                dest: path.join(__dirname, _config.get('MULTER_DEST')),
            }),
            inject: [ConfigService],
        }),
        // http config  async is for petitions type ajax
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (_config: ConfigService) => ({
                timeout: _config.get('HTTP_TIMEOUT'),
                maxRedirects: _config.get('HTTP_MAX_REDIRECTS'),
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        ShowModule,
        ConfigModule,
        HelpersModule,
        // ImagesModule,
        // CategoriesImagesModule
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: HttpErrorFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggerInterceptor,
        },
    ],
})
export class AppModule {
    constructor(){
        config()
    }
}
