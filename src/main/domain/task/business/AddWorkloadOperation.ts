import { BadOperationException } from "../exception/BadOperationException";
import { BadWorkloadEndDateException } from "../exception/BadWorkloadEndDateException";
import { BadWorkloadStartDateException } from "../exception/BadWorkloadStartDateException";
import { WorkloadCannotOverlapException } from "../exception/WorkloadCannotOverlapException";
import { Task } from "../model/Task";
import { Workload } from "../model/Workload";
import { TaskOperation } from "./TaskOperation";

export class AddWorkloadOperation implements TaskOperation {
    constructor(private start: Date, private end?: Date) {}
    execute(task?: Task): Task {
        if(!task) {
            throw new BadOperationException("Cannot add workload on an undefined task", "")
        }

        if(!this.start) {
            throw new BadWorkloadStartDateException()
        }

        if(this.end && this.end <= this.start) {
            throw new BadWorkloadEndDateException("End date must be greater than start date")
        }

        const lastWorkload = task.lastWorkload;
        if(lastWorkload && lastWorkload.end && lastWorkload.end > this.start) {
            throw new WorkloadCannotOverlapException();
        }
        task._setWorkloads([...task.workloads, new Workload(this.start, this.end)])
        return task;
    }

}