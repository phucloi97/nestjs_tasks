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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskdto } from './dto/task.dto';
import { TaskFilter } from './dto/task_filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@UseGuards(AuthGuard()) //sur dung decorator nay de xac thuc
@Controller('tasks')
export class TasksController {
  constructor(private taskSevice: TasksService) {}

  @Get()
  async getTask(
    @Query() taskFilter: TaskFilter,
    @GetUser() user,
  ): Promise<Task[]> {
    console.log(user);
    return this.taskSevice.getAllTasks(taskFilter, user);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true })) // cho pheps kiem tra tu DTO
  async createTask(
    @Body() createTaskdto: CreateTaskdto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskSevice.createTask(createTaskdto, user);
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
