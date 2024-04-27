import { Task } from "../model/Task";
import { TaskOperator } from "./TaskOperator";

export class TaskOperatorFactory {
    with(task?: Task): TaskOperator {
        return new TaskOperator(task)
    }
}