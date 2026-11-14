import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

// Seguridad
import { InternalServiceGuard } from '../auth/guards/internal-service.guard';

// DTO - Tareas
import { AssignTaskDto } from './dto/assign-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

// DTO - Plantillas
import { CreateTaskFromTemplateDto } from './dto/create-task-from-template.dto';
import { CreateTaskTemplateDto } from './dto/create-task-template.dto';
import { CreateTaskTemplateItemDto } from './dto/create-task-template-item.dto';

// Servicio
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(InternalServiceGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Headers('x-actor-user-id') actorUserIdHeader: string | undefined,
  ) {
    const actorUserId = Number(actorUserIdHeader);

    if (
      !actorUserIdHeader ||
      !Number.isSafeInteger(actorUserId) ||
      actorUserId <= 0
    ) {
      throw new BadRequestException(
        'El identificador del usuario autenticado es inválido',
      );
    }

    return this.tasksService.create(createTaskDto, actorUserId);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('assigned/:userId')
  findByAssignedUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.tasksService.findByAssignedUser(userId);
  }

  @Post('templates')
  createTemplate(@Body() createTaskTemplateDto: CreateTaskTemplateDto) {
    return this.tasksService.createTemplate(createTaskTemplateDto);
  }

  @Get('templates/:id')
  findTemplate(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findTemplate(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id);
  }

  @Post(':id/items')
  addItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTaskItemDto: CreateTaskItemDto,
  ) {
    return this.tasksService.addItem(id, createTaskItemDto);
  }

  @Patch(':taskId/items/:itemId/complete')
  completeItem(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.tasksService.completeItem(taskId, itemId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @Headers('x-actor-user-id') actorUserIdHeader: string | undefined,
  ) {
    const actorUserId = Number(actorUserIdHeader);

    if (
      !actorUserIdHeader ||
      !Number.isSafeInteger(actorUserId) ||
      actorUserId <= 0
    ) {
      throw new BadRequestException(
        'El identificador del usuario autenticado es inválido',
      );
    }

    return this.tasksService.updateStatus(id, updateTaskStatusDto, actorUserId);
  }

  @Patch(':id/assign')
  assign(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignTaskDto: AssignTaskDto,
    @Headers('x-actor-user-id') actorUserIdHeader: string | undefined,
  ) {
    const actorUserId = Number(actorUserIdHeader);

    if (
      !actorUserIdHeader ||
      !Number.isSafeInteger(actorUserId) ||
      actorUserId <= 0
    ) {
      throw new BadRequestException(
        'El identificador del usuario autenticado es inválido',
      );
    }

    return this.tasksService.assign(id, assignTaskDto, actorUserId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Post('templates/:templateId/items')
  addTemplateItem(
    @Param('templateId', ParseIntPipe) templateId: number,
    @Body() createTaskTemplateItemDto: CreateTaskTemplateItemDto,
  ) {
    return this.tasksService.addTemplateItem(
      templateId,
      createTaskTemplateItemDto,
    );
  }

  @Post('templates/:templateId/create-task')
  createFromTemplate(
    @Param('templateId', ParseIntPipe) templateId: number,
    @Body() createTaskFromTemplateDto: CreateTaskFromTemplateDto,
  ) {
    return this.tasksService.createFromTemplate(
      templateId,
      createTaskFromTemplateDto,
    );
  }
}
