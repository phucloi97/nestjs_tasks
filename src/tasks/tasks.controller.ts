import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskdto } from './dto/task.dto';
import { TaskFilter } from './dto/task_filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskSevice: TasksService) {}

  // @Get()
  // getTask(@Query() taskFilter: TaskFilter): Task[] {
  //   if (Object.keys(taskFilter).length) {
  //     return this.taskSevice.taskFilter(taskFilter);
  //   } else {
  //     return this.taskSevice.getAllTasks();
  //   }
  // }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) // cho pheps kiem tra tu DTO
  async createTask(@Body() createTaskdto: CreateTaskdto): Promise<Task> {
    return this.taskSevice.createTask(createTaskdto);
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id): Promise<Task> {
    return this.taskSevice.findTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    this.taskSevice.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ) {
    return this.taskSevice.updateTaskStatus(id, status);
  }
}
