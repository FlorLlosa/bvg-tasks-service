import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSectorDto } from './dto/create-sector.dto';

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSectorDto: CreateSectorDto) {
    return this.prisma.sector.create({
      data: {
        name: createSectorDto.name,
        description: createSectorDto.description,
      },
    });
  }
}
