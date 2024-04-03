import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'; // yarn add uuid (to import this) and this is for gen id for task
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    // define a temp array to hold the result
    let tasks = this.getAllTasks();

    // do sth with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    // do sth with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskByID(id: string): Task {
    //try to get task 
    const found = this.tasks.find((task) => task.id === id);

    //if not found throw error
    if(!found) {
      throw new NotFoundException(`Task with "${id}" not found`);
    }

    //otherwise return foundtask
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskByID(id: string): void {
    const task = this.getTaskByID(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(status: TaskStatus, id: string): Task {
    const task = this.getTaskByID(id);
    task.status = status;
    return task;
  }
}
