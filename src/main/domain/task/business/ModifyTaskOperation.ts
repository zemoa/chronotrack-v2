import { Task } from "../model/Task";
import { TaskOperationWithExistingTask } from "./TaskOperationWithExistingTask";

export class ModifyTaskOperation extends TaskOperationWithExistingTask {
    constructor(private arg: {
        name?: string
    }){super()}
    doExecute(task: Task): Task {
        if(this.arg.name) {
            task._setName(this.arg.name)
        }
        return task
    }
    
}