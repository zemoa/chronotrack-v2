import { ModifyWorkloadOperation } from "app/domain/task/business/ModifyWorkloadOperation";
import { BadWorkloadEndDateException } from "app/domain/task/exception/BadWorkloadEndDateException";
import { Task } from "app/domain/task/model/Task";
import { Workload } from "app/domain/task/model/Workload";

describe('Tests for modifying a workload', () => {
    let task: Task;

    beforeEach(() => {
        // Create a task with two initial workloads
        const initialWorkload1 = new Workload('1', new Date('2024-04-12T09:00:00'), new Date('2024-04-14T09:00:00'))
        const initialWorkload2 = new Workload('2', new Date('2024-04-16T09:00:00'), new Date('2024-04-18T09:00:00'))
        task = new Task('1', 'Task 1', [initialWorkload1, initialWorkload2])
    });

    it('should modify the specified workload', () => {
        const sut = new ModifyWorkloadOperation('2', new Date('2024-04-15T09:00:00'), new Date('2024-04-16T09:00:00'))
        const modifiedTask = sut.execute(task)

        const lastWorkload = modifiedTask?.workloads.find(workload => workload.id === '2')

        expect(lastWorkload?.start).toEqual(new Date('2024-04-15T09:00:00'))
        expect(lastWorkload?.end).toEqual(new Date('2024-04-16T09:00:00'))
    });

    it('should return the original task if the workload to modify is not found', () => {
        const invalidOperation = new ModifyWorkloadOperation('3', new Date(2024, 4, 15), new Date(2024, 4, 16))

        const modifiedTask = invalidOperation.execute(task)

        expect(modifiedTask).toEqual(task)
    });

    it('should modify the specified workload if it exists and does not overlap with other workloads', () => {
        const operation = new ModifyWorkloadOperation('1', new Date(2024, 4, 15), new Date(2024, 4, 16))
        const modifiedTask = operation.execute(task)
        const modifiedWorload = modifiedTask.workloads.find(workload => workload.id === '1')
        expect(modifiedWorload?.start).toEqual(new Date(2024, 4, 15));
        expect(modifiedWorload?.end).toEqual(new Date(2024, 4, 16));
    })

    it('should not modify the workload if the start date is after the end date', () => {
        const operation = new ModifyWorkloadOperation('1', new Date(2024, 4, 18), new Date(2024, 4, 17))
        expect(() =>
            operation.execute(task)
        ).toThrow(new BadWorkloadEndDateException("End date must be greater than start date"))
    })

    it('should not modify the workload if the start date and end date are the same', () => {
        const operation = new ModifyWorkloadOperation('1', new Date(2024, 4, 15), new Date(2024, 4, 15))
        expect(() =>
            operation.execute(task)
        ).toThrow(new BadWorkloadEndDateException("End date must be greater than start date"))
    })

    it('should not modify the workload if the ID is incorrect or empty', () => {
        const operation = new ModifyWorkloadOperation('', new Date(2024, 4, 15), new Date(2024, 4, 16))
        const modifiedTask = operation.execute(task);
        expect(modifiedTask).toEqual(task);
    })
});
