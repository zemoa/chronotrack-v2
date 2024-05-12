import { ulid } from "ulid";
import { BadWorkloadEndDateException } from "../exception/BadWorkloadEndDateException";
import { BadWorkloadStartDateException } from "../exception/BadWorkloadStartDateException";
import { WorkloadCannotOverlapException } from "../exception/WorkloadCannotOverlapException";
import { Task } from "../model/Task";
import { Workload } from "../model/Workload";
import { WorkloadOperation } from "./WorkloadOperation";

export class AddWorkloadOperation extends WorkloadOperation {
    constructor(private start: Date, private end?: Date) {super()}
    doExecute(task: Task): Task {

        if(!this.start) {
            throw new BadWorkloadStartDateException()
        }

        const newWorkload = new Workload(ulid(), this.start, this.end)
        this._checkWorkloadConsistency(newWorkload)
        
        const lastWorkload = task.lastWorkload;
        if(lastWorkload && lastWorkload.end && lastWorkload.end > this.start) {
            throw new WorkloadCannotOverlapException();
        }
    
        task._setWorkloads([...task.workloads, newWorkload])
        return task;
    }

}