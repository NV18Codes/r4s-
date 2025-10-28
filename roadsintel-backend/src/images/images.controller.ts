import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Req,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async uploadImage(@Req() req: FastifyRequest) {
    const data = await req.file();
    
    if (!data) {
      return { error: 'No file provided' };
    }

    const buffer = await data.toBuffer();
    const file = {
      buffer,
      filename: data.filename || 'upload.jpg',
      mimetype: data.mimetype || 'image/jpeg',
    };

    const image = await this.imagesService.saveImage(file);
    await this.imagesService.enqueueDetection(image.id);

    return {
      id: image.id,
      filename: image.filename,
      status: image.status,
      message: 'Image uploaded successfully. Detection in progress.',
    };
  }

  @Get(':id')
  async getImage(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }
}
