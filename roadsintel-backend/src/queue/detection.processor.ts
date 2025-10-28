import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { CrackDetectorService } from '../ml/crack-detector.service';
import { WorkOrdersService } from '../work-orders/work-orders.service';
import { ImagesService } from '../images/images.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('detection')
export class DetectionProcessor extends WorkerHost {
  constructor(
    private prisma: PrismaService,
    private crackDetector: CrackDetectorService,
    private workOrdersService: WorkOrdersService,
    private imagesService: ImagesService,
  ) {
    super();
  }

  async process(job: Job<{ imageId: string }>) {
    const { imageId } = job.data;

    console.log(`Processing detection for image ${imageId}`);

    try {
      // Update status to processing
      await this.imagesService.updateStatus(imageId, 'processing');

      // Get image
      const image = await this.prisma.roadImage.findUnique({
        where: { id: imageId },
      });

      if (!image) {
        throw new Error(`Image ${imageId} not found`);
      }

      // Detect cracks
      const result = await this.crackDetector.detectCracks(image.path);

      // Save detection results
      await this.prisma.crackDetection.create({
        data: {
          imageId,
          boxes: JSON.stringify(result.boxes),
          crackCount: result.crackCount,
          confidence: result.confidence,
        },
      });

      // Update image with crack count
      await this.imagesService.updateStatus(imageId, 'completed', result.crackCount);

      // Create work order if cracks detected
      if (result.crackCount > 0) {
        await this.workOrdersService.create(imageId, result.crackCount);
        console.log(`Created work order for image ${imageId} with ${result.crackCount} cracks`);
      }

      return { success: true, crackCount: result.crackCount };
    } catch (error) {
      console.error(`Error processing image ${imageId}:`, error);
      await this.imagesService.updateStatus(imageId, 'failed');
      throw error;
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.error(`Job ${job.id} failed:`, error);
  }
}
