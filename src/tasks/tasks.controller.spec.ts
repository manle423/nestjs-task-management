import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', () => {
      const taskData = { title: 'Test Task', description: 'Test Description' };
      const createdTask = { id: '1', ...taskData }; // Assuming your task object has an id

      jest.spyOn(service, 'createTask').mockImplementation(() => createdTask);

      expect(controller.createTask(taskData)).toEqual(createdTask);
      expect(service.createTask).toHaveBeenCalledWith(taskData);
    });
  });
});
