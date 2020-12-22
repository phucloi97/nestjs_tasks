import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { createTaskdto } from './dto/task.dto';
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
  createTask(@Body() createTaskdto: createTaskdto): Task {
    return this.taskSevice.createTask(createTaskdto);
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
  updateTask(@Param('id') id: string, @Body('status') status: TaskStatus) {
    return this.taskSevice.updateTaskStatus(id, status);
  }
}
