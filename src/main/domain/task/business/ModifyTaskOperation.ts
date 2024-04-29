import { BadOperationException } from "../exception/BadOperationException";
import { Task } from "../model/Task";
import { TaskOperation } from "./TaskOperation";

interface ModifyArg {
    name?: string
}

export class ModifyTaskOperation implements TaskOperation {
    constructor(private modifyArg: ModifyArg){}
    execute(task?: Task): Task {
        if(!task) {
            throw new BadOperationException("Cannot apply modiying task on undefined task")
        }
        if(this.modifyArg.name) {
            task._setName(this.modifyArg.name)
        }
        return task
    }
    
}