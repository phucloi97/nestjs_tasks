import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { TaskFilter } from './dto/task_filter.dto';
import { CreateTaskdto } from './dto/task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  taskFilter(taskFilter: TaskFilter): Task[] {
    let tasks = this.getAllTasks();
    let { status, search } = taskFilter;
    if (taskFilter.status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (taskFilter.search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
  createTask(createTaskdto: CreateTaskdto): Task {
    const { title, description } = createTaskdto;
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
