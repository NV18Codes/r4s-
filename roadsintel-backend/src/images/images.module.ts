import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { CrackDetectorService } from '../ml/crack-detector.service';
import { WorkOrdersModule } from '../work-orders/work-orders.module';

@Module({
  imports: [WorkOrdersModule],
  controllers: [ImagesController],
  providers: [ImagesService, CrackDetectorService],
  exports: [ImagesService],
})
export class ImagesModule {}
