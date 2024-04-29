import { Task } from "../model/Task";
import { TaskOperation } from "./TaskOperation";

export class TaskOperator {
    constructor(private task?: Task) {}

    apply(operation: TaskOperation): void {
        this.task = operation.execute(this.task)
    }

    retrieve(): Task | undefined {
        return this.task
    }
}