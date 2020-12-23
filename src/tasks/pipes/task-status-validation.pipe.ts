import { NotFoundException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly taskStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: string) {
    console.log('pipes triger');
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new NotFoundException();
    }
    return value;
  }
  private isStatusValid(status: any) {
    const idx = this.taskStatus.indexOf(status) != -1;
    return idx;
  }
}
