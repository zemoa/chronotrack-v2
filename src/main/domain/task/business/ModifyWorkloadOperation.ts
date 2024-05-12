import { BadWorkloadEndDateException } from "../exception/BadWorkloadEndDateException";
import { WorkloadCannotOverlapException } from "../exception/WorkloadCannotOverlapException";
import { Task } from "../model/Task";
import { Workload } from "../model/Workload";
import { TaskOperationWithExistingTask } from "./TaskOperationWithExistingTask";
import { WorkloadOperation } from "./WorkloadOperation";

export class ModifyWorkloadOperation extends WorkloadOperation {
    constructor(private id: string, private start?: Date, private end?: Date) {super()}
    doExecute(task: Task): Task {
        const workloadIndex = task.workloads.findIndex(workload => workload.id === this.id)
        if(workloadIndex < 0) {
            return task;
        }
        const targetedWorkload = task.workloads[workloadIndex]
        const modifiedWorkload = new Workload(
            targetedWorkload.id, 
            this.start ?? targetedWorkload.start,
            this.end ?? targetedWorkload.end)

        this._checkWorkloadConsistency(modifiedWorkload)
        const modifiedWorkloads = [...task.workloads.splice(workloadIndex, 0)]
        
        this._checkNoOverlaps(modifiedWorkload, modifiedWorkloads)
        modifiedWorkloads.push(modifiedWorkload)

        task._setWorkloads(modifiedWorkloads)
        return task;
    }
}