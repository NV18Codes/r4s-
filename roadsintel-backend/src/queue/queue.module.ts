import { Module } from '@nestjs/common';
import { DetectionProcessor } from './detection.processor';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from '../prisma/prisma.module';
import { CrackDetectorService } from '../ml/crack-detector.service';
import { WorkOrdersService } from '../work-orders/work-orders.service';
import { ImagesService } from '../images/images.service';
import { ImagesModule } from '../images/images.module';
import { WorkOrdersModule } from '../work-orders/work-orders.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'detection' }),
    PrismaModule,
    ImagesModule,
    WorkOrdersModule,
  ],
  providers: [DetectionProcessor, CrackDetectorService],
})
export class QueueModule {}
