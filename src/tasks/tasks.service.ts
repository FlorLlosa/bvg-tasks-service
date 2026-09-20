import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTaskItemDto } from './dto/create-task-item.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { AssignTaskDto } from './dto/assign-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        priority: createTaskDto.priority,
        assignedUserId: createTaskDto.assignedUserId,
        createdByUserId: createTaskDto.createdByUserId,
        dueDate: createTaskDto.dueDate
          ? new Date(createTaskDto.dueDate)
          : undefined,
      },
    });
  }
  async findAll() {
    return this.prisma.task.findMany({
      include: {
        items: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });

    if (!task) {
      throw new NotFoundException(`No existe una tarea con el ID ${id}`);
    }

    return task;
  }
  async addItem(taskId: number, createTaskItemDto: CreateTaskItemDto) {
    await this.findOne(taskId);

    return this.prisma.taskItem.create({
      data: {
        description: createTaskItemDto.description,
        taskId,
      },
    });
  }
  async completeItem(taskId: number, itemId: number) {
    const item = await this.prisma.taskItem.findFirst({
      where: {
        id: itemId,
        taskId,
      },
    });

    if (!item) {
      throw new NotFoundException(
        `No existe el ítem ${itemId} en la tarea ${taskId}`,
      );
    }

    return this.prisma.taskItem.update({
      where: { id: itemId },
      data: {
        isCompleted: true,
        completedAt: new Date(),
      },
    });
  }
  async updateStatus(id: number, updateTaskStatusDto: UpdateTaskStatusDto) {
    await this.findOne(id);

    return this.prisma.task.update({
      where: { id },
      data: {
        status: updateTaskStatusDto.status,
      },
    });
  }
  async assign(id: number, assignTaskDto: AssignTaskDto) {
    await this.findOne(id);

    return this.prisma.task.update({
      where: { id },
      data: {
        assignedUserId: assignTaskDto.assignedUserId,
      },
    });
  }
  async findByAssignedUser(userId: number) {
    return this.prisma.task.findMany({
      where: {
        assignedUserId: userId,
      },
      include: {
        items: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    return this.prisma.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
        priority: updateTaskDto.priority,
        dueDate: updateTaskDto.dueDate
          ? new Date(updateTaskDto.dueDate)
          : undefined,
      },
    });
  }
}
