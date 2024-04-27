import { Task } from "../model/Task";

export interface TaskOperation {
    execute(task?: Task): void
}