import { Task } from "app/domain/task/model/Task";
import { Workload } from "app/domain/task/model/Workload";

describe('Test for adding a workload on a task', () => {
    let task: Task;
    let existingWorkload: Workload;

    beforeEach(() => {
        // Create an existing Workload for overlap testing
        const existingStartDateTime = new Date('2024-05-06T09:00:00');
        const existingEndDateTime = new Date('2024-05-06T12:00:00');
        existingWorkload = new Workload(existingStartDateTime, existingEndDateTime);
        task = new Task('123', 'Task Name', [existingWorkload]);
    });

    test('Adding a valid Workload to a Task', () => {
        const startDateTime = new Date('2024-05-06T13:00:00');
        const endDateTime = new Date('2024-05-06T15:00:00');
        const newWorkload = new Workload(startDateTime, endDateTime);

        // Add a valid Workload
        task.addWorkload(newWorkload);

        // Verify that the new Workload was added
        expect(task.getWorkloads()).toContain(newWorkload);
    });

    test('Failing to add Workload with empty start date', () => {
        const startDateTime = null; // Empty start date

        // Try to add a Workload with empty start date
        expect(() => {
            task.addWorkload(new Workload(startDateTime));
        }).toThrowError('Workload start date cannot be empty');
    });

    test('Failing to add Workload with end date before start date', () => {
        const startDateTime = new Date('2024-05-06T16:00:00');
        const endDateTime = new Date('2024-05-06T14:00:00'); // End date before start date

        // Try to add a Workload with incorrect end date
        expect(() => {
            task.addWorkload(new Workload(startDateTime, endDateTime));
        }).toThrowError('End date must be greater than or equal to start date');
    });

    test('Failing to add overlapping Workload', () => {
        const startDateTime = new Date('2024-05-06T10:00:00'); // Overlaps with existing Workload
        const endDateTime = new Date('2024-05-06T11:00:00');
        const overlappingWorkload = new Workload(startDateTime, endDateTime);

        // Try to add an overlapping Workload
        expect(() => {
            task.addWorkload(overlappingWorkload);
        }).toThrowError('Workloads cannot overlap');
    });

    test('Failing to add Workload with invalid start date', () => {
        const startDateTime = '2024-05-06T09:00:00'; // Invalid start date

        // Try to add a Workload with an invalid start date
        expect(() => {
            task.addWorkload(new Workload(startDateTime));
        }).toThrowError('Workload start date must be an instance of Date');
    });

    test('Failing to add Workload without start date', () => {
        // Try to add a Workload without a start date
        expect(() => {
            task.addWorkload(new Workload());
        }).toThrowError('Workload start date cannot be empty');
    });

    test('Failing to add Workload with invalid end date', () => {
        const startDateTime = new Date('2024-05-06T09:00:00');
        const endDateTime = '2024-05-06T12:00:00'; // Invalid end date

        // Try to add a Workload with an invalid end date
        expect(() => {
            task.addWorkload(new Workload(startDateTime, endDateTime));
        }).toThrowError('Workload end date must be an instance of Date');
    });

    test('Adding Workload with end date equal to start date (edge case)', () => {
        const startDateTime = new Date('2024-05-06T09:00:00');
        const endDateTime = new Date('2024-05-06T09:00:00'); // End date equal to start date

        // Try to add a Workload with end date equal to start date
        expect(() => {
            task.addWorkload(new Workload(startDateTime, endDateTime));
        }).toThrowError('End date must be greater than or equal to start date');
    });

    test('Adding a Workload after an existing Workload without overlap', () => {
        const startDateTime = new Date('2024-05-06T13:00:00');
        const endDateTime = new Date('2024-05-06T15:00:00');
        const newWorkload = new Workload(startDateTime, endDateTime);

        // Add a Workload after the existing Workload
        task.addWorkload(newWorkload);

        // Verify that the new Workload was added
        expect(task.getWorkloads()).toContain(newWorkload);
    });

    // Add more test cases as needed
});