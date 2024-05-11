import { AddWorkloadOperation } from "app/domain/task/business/AddWorkloadOperation"
import { TaskOperator } from "app/domain/task/business/TaskOperator"
import { TaskOperatorFactory } from "app/domain/task/business/TaskOperatorFactory"
import { Task } from "app/domain/task/model/Task"
import { Workload } from "app/domain/task/model/Workload"
import { TaskRepository } from "app/domain/task/repository/TaskRepository"
import { UCStartWorking } from "app/use_case/task/uc_start_working"
import { MockProxy, mock } from "jest-mock-extended"

describe("Test for start working on a task", () => {
    let taskRepository: MockProxy<TaskRepository> = mock<TaskRepository>()
    let taskOperatorFactory: MockProxy<TaskOperatorFactory> = mock<TaskOperatorFactory>()
    let taskOperator: MockProxy<TaskOperator> = mock<TaskOperator>()
    let task: Task;

    beforeEach(() => {
        jest.resetAllMocks()
        taskOperatorFactory.with.mockReturnValue(taskOperator)
        taskRepository.update.mockImplementation((task) => task)
        const existingStartDateTime = new Date('2024-05-06T09:00:00');
        const existingEndDateTime = new Date('2024-05-06T12:00:00');
        task = new Task('123', 'Task Name', [new Workload(existingStartDateTime, existingEndDateTime)]);
        taskRepository.findById.mockReturnValue(task)
        taskOperator.retrieve.mockReturnValue(task)
    })

    test("Start working on a task", () => {
        jest.useFakeTimers()
            .setSystemTime(new Date('2024-05-06T09:00:00'));
        const sut = new UCStartWorking(taskRepository, taskOperatorFactory);
        sut.execute('123');

        expect(taskRepository.update).toHaveBeenCalledTimes(1)
        expect(taskOperator.apply).toHaveBeenCalledWith(new AddWorkloadOperation(new Date()))
    })
})