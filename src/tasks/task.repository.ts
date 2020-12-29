import { NotFoundException } from '@nestjs/common';
import { title } from 'process';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskdto } from './dto/task.dto';
import { TaskFilter } from './dto/task_filter.dto';
import { TaskStatus } from './status.enum';
import { Task } from './task.entity';

@EntityRepository(Task) // look like model moongoose
export class TaskRepository extends Repository<Task> {
  async createTask(createTaskdto: CreateTaskdto): Promise<Task> {
    let task = new Task();
    task.title = createTaskdto.title;
    task.description = createTaskdto.description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
  async findTaskById(id: number): Promise<Task> {
    const found = await Task.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
  async deleteTask(id: number): Promise<void> {
    Task.delete(id);
  }
  // async updateTask(id: number) {
  //   const query = this.createQueryBuilder().update(Task).set({
  //     title: ":title",
  //     description: ":description"
  //   })

  // }
  async getTask(taskFilter: TaskFilter): Promise<Task[]> {
    const { status, search } = taskFilter;
    const query = await this.createQueryBuilder('task');
    // query.delete().where('id= :id', { id: 1 }).execute(); // thu delete kieu nay
    query.andWhere('task.status = :status', { status });
    query.andWhere('task.description LIKE :search', { search: `${search}%` });
    const task = await query.getMany();
    return task;
  }
}
