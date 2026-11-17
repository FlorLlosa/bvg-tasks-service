import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { InternalServiceGuard } from '../auth/guards/internal-service.guard';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService, InternalServiceGuard],
})
export class TasksModule {}
