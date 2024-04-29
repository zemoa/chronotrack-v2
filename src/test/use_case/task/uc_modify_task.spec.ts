import { ModifyTaskOperation } from "app/domain/task/business/ModifyTaskOperation"
import { TaskOperator } from "app/domain/task/business/TaskOperator"
import { TaskOperatorFactory } from "app/domain/task/business/TaskOperatorFactory"
import { Task } from "app/domain/task/model/Task"
import { TaskRepository } from "app/domain/task/repository/TaskRepository"
import { UCModifyTask } from "app/use_case/task/uc_modify_task"
import { MockProxy, mock } from "jest-mock-extended"


describe("UC modifying a task", () => {
    let taskRepository: MockProxy<TaskRepository> = mock<TaskRepository>()
    let taskOperatorFactory: MockProxy<TaskOperatorFactory> = mock<TaskOperatorFactory>()
    let taskOperator: MockProxy<TaskOperator> = mock<TaskOperator>()
    beforeEach(() => {
        jest.resetAllMocks()
        taskOperatorFactory.with.mockReturnValue(taskOperator)
    })

    test("Modify a task", () => {
        taskRepository.update.mockImplementation((task) => task)
        taskOperator.retrieve.mockReturnValue(new Task("123", "New name", []))
        const sut = new UCModifyTask(taskRepository, taskOperatorFactory)
        const task = sut.execute("123", {name: "New name"})

        expect(taskOperator.apply).toHaveBeenCalledWith(new ModifyTaskOperation({name: "New name"}))

        expect(taskRepository.update).toHaveBeenCalledTimes(1)
        expect(taskRepository.update).toHaveBeenCalledWith(new Task("123", "New name", []))
        expect(task.name).toBe('New name')
    })
})