import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './status.enum';
import { v1 as uuid } from 'uuid';
import { TaskFilter } from './dto/task_filter.dto';
import { CreateTaskdto } from './dto/task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  async getAllTasks(taskFilter: TaskFilter): Promise<Task[]> {
    return this.taskRepository.getTask(taskFilter);
  }
  async createTask(createTaskdto: CreateTaskdto): Promise<Task> {
    return this.taskRepository.createTask(createTaskdto);
  }
  async findTaskById(id: number): Promise<Task> {
    return this.taskRepository.findTaskById(id);
  }
  async deleteTaskById(id: number): Promise<void> {
    this.taskRepository.deleteTask(id);
  }
  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    let found = await this.findTaskById(id);
    // await this.taskRepository.update(id, found)
    found.status = status;
    await found.save();
    return found;
  }
}
