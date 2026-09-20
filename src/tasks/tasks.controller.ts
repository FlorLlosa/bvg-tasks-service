import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskTemplateDto } from './dto/create-task-template.dto';
import { CreateTaskTemplateItemDto } from './dto/create-task-template-item.dto';
import { CreateTaskFromTemplateDto } from './dto/create-task-from-template.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
  @Get('assigned/:userId') findByAssignedUser(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
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
  ) {
    return this.tasksService.updateStatus(id, updateTaskStatusDto);
  }
  @Patch(':id/assign')
  assign(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignTaskDto: AssignTaskDto,
  ) {
    return this.tasksService.assign(id, assignTaskDto);
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
