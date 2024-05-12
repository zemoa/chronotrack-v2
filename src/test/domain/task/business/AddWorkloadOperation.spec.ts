import { AddWorkloadOperation } from "app/domain/task/business/AddWorkloadOperation";
import { BadWorkloadEndDateException } from "app/domain/task/exception/BadWorkloadEndDateException";
import { WorkloadCannotOverlapException } from "app/domain/task/exception/WorkloadCannotOverlapException";
import { Task } from "app/domain/task/model/Task";
import { Workload } from "app/domain/task/model/Workload";

jest.mock('ulid', () => ({ulid: () => '123'}))

describe('Test for adding a workload on a task', () => {
    let task: Task;
    let existingWorkload: Workload;

    beforeEach(() => {
        // Create an existing Workload for overlap testing
        const existingStartDateTime = new Date('2024-05-06T09:00:00');
        const existingEndDateTime = new Date('2024-05-06T12:00:00');
        existingWorkload = new Workload('1', existingStartDateTime, existingEndDateTime);
        task = new Task('123', 'Task Name', [existingWorkload]);
    });

    
    test('Adding a valid Workload to a Task', () => {
    
        const startDateTime = new Date('2024-05-06T13:00:00');
        const endDateTime = new Date('2024-05-06T15:00:00');
    
        const newWorkload = new Workload('123', startDateTime, endDateTime);

        const sut = new AddWorkloadOperation(startDateTime, endDateTime);
        const expectedTask = sut.execute(task);

        // Verify that the new Workload was added
        expect(expectedTask.workloads).toContainEqual(newWorkload);
    });

    test('Failing to add Workload with end date before start date', () => {
        const startDateTime = new Date('2024-05-06T16:00:00');
        const endDateTime = new Date('2024-05-06T14:00:00'); // End date before start date

        // Try to add a Workload with incorrect end date
        const sut = new AddWorkloadOperation(startDateTime, endDateTime);
        expect(() => {
            sut.execute(task);
        }).toThrow(new BadWorkloadEndDateException('End date must be greater than start date'));
    });

    test('Failing to add overlapping Workload', () => {
        const startDateTime = new Date('2024-05-06T10:00:00'); // Overlaps with existing Workload
        const endDateTime = new Date('2024-05-06T11:00:00');

        // Try to add an overlapping Workload
        const sut = new AddWorkloadOperation(startDateTime, endDateTime);
        expect(() => {
            sut.execute(task);
        }).toThrow(new WorkloadCannotOverlapException());
    });

    test('Adding Workload with end date equal to start date (edge case)', () => {
        const startDateTime = new Date('2024-05-06T09:00:00');
        const endDateTime = new Date('2024-05-06T09:00:00'); // End date equal to start date

        // Try to add a Workload with end date equal to start date
        const sut = new AddWorkloadOperation(startDateTime, endDateTime);
        expect(() => {
            sut.execute(task);
        }).toThrow(new BadWorkloadEndDateException('End date must be greater than start date'));
    });

    test('Adding a Workload after an existing Workload without overlap', () => {
        jest.useFakeTimers()
            .setSystemTime(new Date('2024-05-06T09:00:00'));
        const startDateTime = new Date('2024-05-06T13:00:00');
        const endDateTime = new Date('2024-05-06T15:00:00');
        const newWorkload = new Workload('123', startDateTime, endDateTime);

        // Add a Workload after the existing Workload
        const sut = new AddWorkloadOperation(startDateTime, endDateTime);
        const modifiedTask = sut.execute(task)

        // Verify that the new Workload was added
        expect(modifiedTask.workloads).toContainEqual(newWorkload);
    });

    // Add more test cases as needed
});