import { BadWorkloadEndDateException } from "../exception/BadWorkloadEndDateException";
import { WorkloadCannotOverlapException } from "../exception/WorkloadCannotOverlapException";
import { Workload } from "../model/Workload";
import { TaskOperationWithExistingTask } from "./TaskOperationWithExistingTask";

export abstract class WorkloadOperation extends TaskOperationWithExistingTask {
    _checkWorkloadConsistency(workload: Workload) {
        if(workload.end && workload.start >= workload.end) {
            throw new BadWorkloadEndDateException("End date must be greater than start date")
        }
    }

    _checkNoOverlaps(workload: Workload, workloads: Workload[]) {
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