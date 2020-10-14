import { Module } from '@nestjs/common';
import { EmailsService } from './emails/emails.service';
import { ConfigModule } from '../config/config.module';
import { LoggerService } from './logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GateLoggerGateway } from './logger/gate-logger.gateway';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import Logger from './logger/Logger.entity';

@Module({
    imports: [ConfigModule,MongooseModule.forFeature([{name:'Logs',schema:Logger}])],
    providers: [EmailsService, LoggerService, GateLoggerGateway, CloudinaryService],
    exports: [EmailsService, LoggerService, GateLoggerGateway,CloudinaryService],
})
export class HelpersModule {}
