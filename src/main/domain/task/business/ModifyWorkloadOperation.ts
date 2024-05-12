import { BadWorkloadEndDateException } from "../exception/BadWorkloadEndDateException";
import { WorkloadCannotOverlapException } from "../exception/WorkloadCannotOverlapException";
import { Task } from "../model/Task";
import { Workload } from "../model/Workload";
import { TaskOperationWithExistingTask } from "./TaskOperationWithExistingTask";

export class ModifyWorkloadOperation extends TaskOperationWithExistingTask {
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

        this.checkWorkloadConsistency(modifiedWorkload)
        const modifiedWorkloads = [...task.workloads.splice(workloadIndex, 0)]
        
        this.checkNoOverlaps(modifiedWorkload, modifiedWorkloads)
        modifiedWorkloads.push(modifiedWorkload)

        task._setWorkloads(modifiedWorkloads)
        return task;
    }

    private checkWorkloadConsistency(workload: Workload) {
        if(workload.end && workload.start >= workload.end) {
            throw new BadWorkloadEndDateException("End date must be greater than start date")
        }
    }

    private checkNoOverlaps(workload: Workload, workloads: Workload[]) {
        workloads.forEach(existingWorkload => {
            if(workload.start < existingWorkload.start && 
                ( !workload.end || 
                    existingWorkload.end && existingWorkload.end < workload.end
                )
            ) {
                throw new WorkloadCannotOverlapException()
            }
        })
    }
}