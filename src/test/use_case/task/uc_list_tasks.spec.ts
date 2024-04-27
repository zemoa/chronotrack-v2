import { Task } from "app/domain/task/model/Task"
import { TaskRepository } from "app/domain/task/repository/TaskRepository"
import { UCListTasks } from "app/use_case/task/uc_list_task"

describe('Tests for UC List tasks', () => {
    let taskRepository: TaskRepository
    beforeEach(() => {
        taskRepository = {
            findByUser: jest.fn((id) => [])
        }
        
    })
    test("Given an user's id and 3 tasks saved when uc is called then it should return 3 tasks", () => {
        taskRepository = {
            findByUser: jest.fn((id) => [new Task("123", "a name"), new Task("123", "a name"), new Task("123", "a name")])
        }
        const sut = new UCListTasks(taskRepository);
        const tasksList = sut.execute("123");
        expect(tasksList.length).toBe(3)
    })

    test("Given an user's id and 0 tasks saved when uc is called then it should return 0 tasks", () => {
        const sut = new UCListTasks(taskRepository);
        const tasksList = sut.execute("123");
        expect(tasksList.length).toBe(0)
    })
})