import { Controller, Get, Param } from '@nestjs/common';
import { WorkOrdersService } from './work-orders.service';

@Controller('workorders')
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Get()
  findAll() {
    return this.workOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workOrdersService.findOne(id);
  }
}
