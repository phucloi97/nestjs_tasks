import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskSevice: TasksService) {}

  @Get()
  getAllTask() {
    return this.taskSevice.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskSevice.createTask(title, description);
  }

  @Get('/:id')
  getTaskById(@Param('id') id): Task {
    return this.taskSevice.findTaskById(id);
  }
}
