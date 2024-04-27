import { Task } from "../model/Task";
import { TaskOperation } from "./TaskOperation";

export class TaskOperator {
    constructor(private task?: Task) {}

    apply(operation: TaskOperation): void {
        operation.execute(this.task)
    }
}