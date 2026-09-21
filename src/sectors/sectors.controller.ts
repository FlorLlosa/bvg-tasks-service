import { Body, Controller, Post } from '@nestjs/common';

import { CreateSectorDto } from './dto/create-sector.dto';
import { SectorsService } from './sectors.service';

@Controller('sectors')
export class SectorsController {
  constructor(private readonly sectorsService: SectorsService) {}

  @Post()
  create(@Body() createSectorDto: CreateSectorDto) {
    return this.sectorsService.create(createSectorDto);
  }
}
