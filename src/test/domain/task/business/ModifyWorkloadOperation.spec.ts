import { ModifyWorkloadOperation } from "app/domain/task/business/ModifyWorkloadOperation";
import { TaskOperation } from "app/domain/task/business/TaskOperation";
import { Task } from "app/domain/task/model/Task";
import { Workload } from "app/domain/task/model/Workload";


describe('Tests for modifying a workload', () => {
    let task: Task;

    beforeEach(() => {
        // Create a task with two initial workloads
        const initialWorkload1 = new Workload('1', new Date(2024, 4, 12), new Date(2024, 4, 14));
        const initialWorkload2 = new Workload('2', new Date(2024, 4, 16), new Date(2024, 4, 18));
        task = new Task('1', 'Task 1', [initialWorkload1, initialWorkload2]);
    });

    it('should modify the specified workload', () => {
        // Exécuter l'opération
        const sut = new ModifyWorkloadOperation();
        const modifiedTask = sut.execute(task);
        // Récupérer le dernier travail de la tâche modifiée
        const lastWorkload = modifiedTask?.lastWorkload;

        // Vérifier que le dernier travail correspond à celui que nous avons modifié
        expect(lastWorkload?.start).toEqual(new Date(2024, 4, 15));
        expect(lastWorkload?.end).toEqual(new Date(2024, 4, 16));
    });

    // it('should return the original task if the workload to modify is not found', () => {
    //     // Créer une nouvelle opération avec un ID de travail non existant
    //     const invalidOperation = new ModifyWorkloadOperation('2', new Workload(new Date(2024, 4, 15), new Date(2024, 4, 16)));
    //     // Exécuter l'opération
    //     const modifiedTask = invalidOperation.execute(task);

    //     // Vérifier que la tâche modifiée est la même que la tâche d'origine car aucune modification n'a été apportée
    //     expect(modifiedTask).toEqual(task);
    // });
    // it('should modify the specified workload if it exists and does not overlap with other workloads', () => {
    //     const operation = new ModifyWorkloadOperation('1', new Workload(new Date(2024, 4, 15), new Date(2024, 4, 16)));
    //     const modifiedTask = operation.execute(task);
    //     expect(modifiedTask?.workloads[0].start).toEqual(new Date(2024, 4, 15));
    //     expect(modifiedTask?.workloads[0].end).toEqual(new Date(2024, 4, 16));
    // });

    // it('should return the original task if the workload to modify is not found', () => {
    //     const operation = new ModifyWorkloadOperation('2', new Workload(new Date(2024, 4, 15), new Date(2024, 4, 16)));
    //     const modifiedTask = operation.execute(task);
    //     expect(modifiedTask).toEqual(task);
    // });

    // it('should not modify the workload if it overlaps with other workloads', () => {
    //     const operation = new ModifyWorkloadOperation('1', new Workload(new Date(2024, 4, 13), new Date(2024, 4, 17)));
    //     const modifiedTask = operation.execute(task);
    //     expect(modifiedTask).toEqual(task);
    // });

    // it('should not modify the workload if the start date is after the end date', () => {
    //     const operation = new ModifyWorkloadOperation('1', new Workload(new Date(2024, 4, 18), new Date(2024, 4, 17)));
    //     const modifiedTask = operation.execute(task);
    //     expect(modifiedTask).toEqual(task);
    // });

    // it('should not modify the workload if the start date and end date are the same', () => {
    //     const operation = new ModifyWorkloadOperation('1', new Workload(new Date(2024, 4, 15), new Date(2024, 4, 15)));
    //     const modifiedTask = operation.execute(task);
    //     expect(modifiedTask).toEqual(task);
    // });

    // it('should not modify the workload if the end date is missing', () => {
    //     const operation = new ModifyWorkloadOperation('1', new Workload(new Date(2024, 4, 15)));
    //     const modifiedTask = operation.execute(task);
    //     expect(modifiedTask).toEqual(task);
    // });

    // it('should not modify the workload if the start date is missing', () => {
    //     const operation = new ModifyWorkloadOperation('1', new Workload(undefined, new Date(2024, 4, 16)));
    //     const modifiedTask = operation.execute(task);
    //     expect(modifiedTask).toEqual(task);
    // });

    // it('should not modify the workload if the ID is incorrect or empty', () => {
    //     const operation = new ModifyWorkloadOperation('', new Workload(new Date(2024, 4, 15), new Date(2024, 4, 16)));
    //     const modifiedTask = operation.execute(task);
    //     expect(modifiedTask).toEqual(task);
    // });

    // it('should not modify the workload if the task is empty or undefined', () => {
    //     const operation = new ModifyWorkloadOperation('1', new Workload(new Date(2024, 4, 15), new Date(2024, 4, 16)));
    //     const modifiedTask = operation.execute(undefined);
    //     expect(modifiedTask).toEqual(undefined);
    // });
});
