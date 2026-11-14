import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSectorDto } from './dto/create-sector.dto';

@Injectable()
export class SectorsService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un sector
  async create(createSectorDto: CreateSectorDto) {
    return this.prisma.sector.create({
      data: {
        name: createSectorDto.name,
        description: createSectorDto.description,
      },
    });
  }

  // Obtener todos los sectores
  async findAll() {
    return this.prisma.sector.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  // Obtener un sector por ID
  async findOne(id: number) {
    const sector = await this.prisma.sector.findUnique({
      where: { id },
    });

    if (!sector) {
      throw new NotFoundException(`No existe un sector con el ID ${id}`);
    }

    return sector;
  }
}
