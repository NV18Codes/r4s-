import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { randomBytes } from 'crypto';
import { CrackDetectorService } from '../ml/crack-detector.service';
import { WorkOrdersService } from '../work-orders/work-orders.service';

interface FileData {
  buffer: Buffer;
  filename: string;
  mimetype: string;
}

@Injectable()
export class ImagesService {
  private readonly uploadPath = process.env.UPLOAD_PATH || './uploads';

  constructor(
    private prisma: PrismaService,
    private crackDetector: CrackDetectorService,
    private workOrdersService: WorkOrdersService,
  ) {
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await fs.mkdir(this.uploadPath, { recursive: true });
    } catch (error) {
      console.error('Failed to create upload directory:', error);
    }
  }

  async saveImage(file: FileData) {
    const uniqueId = randomBytes(8).toString('hex');
    const filename = `${uniqueId}-${file.filename}`;
    const filepath = path.join(this.uploadPath, filename);

    await fs.writeFile(filepath, file.buffer);

    return this.prisma.roadImage.create({
      data: {
        filename,
        path: filepath,
        status: 'pending',
      },
    });
  }

  async enqueueDetection(imageId: string) {
    // Process detection immediately without Redis
    setImmediate(async () => {
      try {
        console.log(`Processing detection for image ${imageId}`);
        await this.updateStatus(imageId, 'processing');
        
        const image = await this.prisma.roadImage.findUnique({ where: { id: imageId } });
        if (!image) throw new Error(`Image ${imageId} not found`);
        
        const result = await this.crackDetector.detectCracks(image.path);
        
        await this.prisma.crackDetection.create({
          data: {
            imageId,
            boxes: JSON.stringify(result.boxes),
            crackCount: result.crackCount,
            confidence: result.confidence,
          },
        });
        
        await this.updateStatus(imageId, 'completed', result.crackCount);
        
        if (result.crackCount > 0) {
          await this.workOrdersService.create(imageId, result.crackCount);
        }
      } catch (error) {
        console.error(`Error processing image ${imageId}:`, error);
        await this.updateStatus(imageId, 'failed');
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.roadImage.findUnique({
      where: { id },
      include: {
        crackDetections: true,
        workOrders: true,
      },
    });
  }

  async updateStatus(id: string, status: string, crackCount?: number) {
    return this.prisma.roadImage.update({
      where: { id },
      data: {
        status,
        crackCount,
      },
    });
  }
}
