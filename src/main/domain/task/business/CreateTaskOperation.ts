import { Task } from "../model/Task";
import { TaskOperation } from "./TaskOperation";

export class CreateTaskOperation implements TaskOperation {
    execute(task?: Task): Task {
        return new Task()
    }

}