import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  findTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }
  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id != id);
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    let task = this.findTaskById(id);
    task.status = status;
    return task;
  }
}
