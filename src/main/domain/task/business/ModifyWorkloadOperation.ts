import { Task } from "../model/Task";
import { TaskOperationWithExistingTask } from "./TaskOperationWithExistingTask";

export class ModifyWorkloadOperation extends TaskOperationWithExistingTask {
    constructor(private start: Date, private end?: Date) {super()}
    doExecute(task: Task): Task {

        return task;
    }

}