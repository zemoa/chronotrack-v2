import { ulid } from "ulid";
import { BadWorkloadEndDateException } from "../exception/BadWorkloadEndDateException";
import { BadWorkloadStartDateException } from "../exception/BadWorkloadStartDateException";
import { WorkloadCannotOverlapException } from "../exception/WorkloadCannotOverlapException";
import { Task } from "../model/Task";
import { Workload } from "../model/Workload";
import { TaskOperationWithExistingTask } from "./TaskOperationWithExistingTask";

export class AddWorkloadOperation extends TaskOperationWithExistingTask {
    constructor(private start: Date, private end?: Date) {super()}
    doExecute(task: Task): Task {

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
    
        task._setWorkloads([...task.workloads, new Workload(ulid(), this.start, this.end)])
        return task;
    }

}