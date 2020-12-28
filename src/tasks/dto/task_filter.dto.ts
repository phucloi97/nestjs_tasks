import { TaskStatus } from '../status.enum';

export class TaskFilter {
  status: TaskStatus;
  search: string;
}
