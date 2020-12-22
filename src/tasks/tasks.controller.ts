import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
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

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.taskSevice.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ): Task {
    return this.taskSevice.updateTaskStatus(id, status);
  }
}
