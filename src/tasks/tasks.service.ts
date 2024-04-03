import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
// yarn add uuid (to import this) and this is for gen id for task

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}