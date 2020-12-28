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
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // taskFilter(taskFilter: TaskFilter): Task[] {
  //   let tasks = this.getAllTasks();
  //   let { status, search } = taskFilter;
  //   if (taskFilter.status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (taskFilter.search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  async createTask(createTaskdto: CreateTaskdto): Promise<Task> {
    return this.taskRepository.createTask(createTaskdto);
  }
  async findTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException({
        description: {
          status_code: 404,
          message: 'id not found',
        },
      });
    }
    return found;
  }
  // deleteTaskById(id: string): void {
  //   const found = this.findTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id != id);
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   let task = this.findTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
