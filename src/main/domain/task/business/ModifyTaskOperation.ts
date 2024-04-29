import { BadOperationException } from "../exception/BadOperationException";
import { Task } from "../model/Task";
import { TaskOperation } from "./TaskOperation";

export class ModifyTaskOperation implements TaskOperation {
    constructor(private arg: {
        name?: string
    }){}
    execute(task?: Task): Task {
        if(!task) {
            throw new BadOperationException("Cannot apply modiying task on undefined task")
        }
        if(this.arg.name) {
            task._setName(this.arg.name)
        }
        return task
    }
    
}