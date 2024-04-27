import { TaskOperator } from "app/domain/task/business/TaskOperator";
import { TaskOperatorFactory } from "app/domain/task/business/TaskOperatorFactory";
import { TaskRepository } from "app/domain/task/repository/TaskRepository"
import { UCCreateTask } from "app/use_case/task/uc_create_task"
import { MockProxy, mock } from 'jest-mock-extended';

describe("UC creating a task", () => {
    let taskRepository: MockProxy<TaskRepository> = mock<TaskRepository>()
    let taskOperatorFactory: MockProxy<TaskOperatorFactory> = mock<TaskOperatorFactory>()
    let taskOperator: MockProxy<TaskOperator> = mock<TaskOperator>()
    beforeEach(() => {
        jest.resetAllMocks()
        taskOperatorFactory.with.mockReturnValue(taskOperator)
    })

    test("Create a task", () => {
        taskRepository.create.mockImplementation((task) => task)
        const sut = new UCCreateTask(taskRepository, taskOperatorFactory)
        const task = sut.execute("name")

        expect(taskRepository.create).toHaveBeenCalledTimes(1)
    })
})