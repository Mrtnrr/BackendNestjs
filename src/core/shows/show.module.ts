import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { Show } from './show.entity';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Shows', schema: Show }])],
  providers: [ShowService],
  controllers: [ShowController],
  exports: [ShowService],
})
export class ShowModule { }
