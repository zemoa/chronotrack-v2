import { BadOperationException } from "../exception/BadOperationException";
import { Task } from "../model/Task";
import { TaskOperation } from "./TaskOperation";

export abstract class TaskOperationWithExistingTask implements TaskOperation {
    execute(task?: Task): Task {
        if(!task) {
            throw new BadOperationException("Cannot apply modiying task on undefined task", "")
        }
        return this.doExecute(task);
    }

    protected abstract doExecute(task: Task): Task;
}