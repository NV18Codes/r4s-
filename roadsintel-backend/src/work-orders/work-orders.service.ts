import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkOrdersService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.workOrder.findMany({
      include: {
        image: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.workOrder.findUnique({
      where: { id },
      include: {
        image: {
          include: {
            crackDetections: true,
          },
        },
      },
    });
  }

  async create(imageId: string, crackCount: number) {
    return this.prisma.workOrder.create({
      data: {
        imageId,
        crackCount,
        status: 'Open',
        priority: crackCount > 5 ? 1 : 0,
      },
      include: {
        image: true,
      },
    });
  }
}
