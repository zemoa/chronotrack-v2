import { Task } from "app/domain/task/model/Task"
import { TaskRepository } from "../../../src/domain/task/repository/TaskRepository"
import { UCListTasks } from "../../../src/use_case/task/uc_list_task"

describe('Tests for UC List tasks', () => {
    let taskRepository: TaskRepository
    beforeAll(() => {
        taskRepository = {
            findByUser: jest.fn((id) => [new Task(), new Task(), new Task()])
        }
        
    })
    test("Given an user's id and 3 tasks saved when uc is called then it should return 3 tasks", () => {
        const sut = new UCListTasks(taskRepository);
        const tasksList = sut.execute("123");
        expect(tasksList.length).toBe(3)
    })
})