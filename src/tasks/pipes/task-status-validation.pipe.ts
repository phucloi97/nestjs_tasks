import {
  MethodNotAllowedException,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../status.enum';

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
// khác nhau giữ implements và extends
// extends có thể sử dụng phương thức mà k phải override lại Method
// còn implement thì bắt buộc phải override lại tất cả các method
