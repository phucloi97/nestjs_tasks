import { title } from 'process';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskdto } from './dto/task.dto';
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
}