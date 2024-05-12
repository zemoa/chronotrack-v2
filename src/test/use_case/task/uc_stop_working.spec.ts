import { ModifyWorkloadOperation } from "app/domain/task/business/ModifyWorkloadOperation";
import { TaskOperator } from "app/domain/task/business/TaskOperator";
import { TaskOperatorFactory } from "app/domain/task/business/TaskOperatorFactory";
import { Task } from "app/domain/task/model/Task";
import { Workload } from "app/domain/task/model/Workload";
import { TaskRepository } from "app/domain/task/repository/TaskRepository";
import { UCStopWorking } from "app/use_case/task/uc_stop_working";
import { MockProxy, mock } from "jest-mock-extended";

describe("Test for stop working on a task", () => {
    let taskRepository: MockProxy<TaskRepository> = mock<TaskRepository>()
    let taskOperatorFactory: MockProxy<TaskOperatorFactory> = mock<TaskOperatorFactory>()
    let taskOperator: MockProxy<TaskOperator> = mock<TaskOperator>()
    let task: Task;

    beforeEach(() => {
        jest.resetAllMocks()
        taskOperatorFactory.with.mockReturnValue(taskOperator)
        taskRepository.update.mockImplementation((_task) => _task)
        const existingStartDateTime = new Date('2024-05-06T09:00:00');
        task = new Task('123', 'Task Name', [new Workload('1', existingStartDateTime)]);
        taskRepository.findById.mockReturnValue(task)
        taskOperator.retrieve.mockReturnValue(task)
    })

    test("Stop working on a task", () => {
        jest.useFakeTimers()
            .setSystemTime(new Date('2024-05-07T09:00:00'));

        const sut = new UCStopWorking(taskRepository, taskOperatorFactory);
        sut.execute('123');

        expect(taskRepository.update).toHaveBeenCalledTimes(1)
        expect(taskOperator.apply).toHaveBeenCalledWith(new ModifyWorkloadOperation('1', undefined, new Date('2024-05-07T09:00:00')))
    })

    test("Stop working on a not working task should do nothing", () => {
        jest.useFakeTimers()
            .setSystemTime(new Date('2024-05-08T09:00:00'));

        const notWorkingTask = new Task('1234', 'Task Name', [new Workload('1', new Date('2024-05-06T09:00:00'), new Date('2024-05-07T09:00:00'))]);
        taskRepository.findById.mockReturnValue(notWorkingTask)
        taskOperator.retrieve.mockReturnValue(notWorkingTask)

        const sut = new UCStopWorking(taskRepository, taskOperatorFactory);
        sut.execute('1234');

        expect(taskRepository.update).toHaveBeenCalledTimes(0)
        expect(taskOperator.apply).toHaveBeenCalledTimes(0)
    })
})