import { BadOperationException } from "./BadOperationException";

export class WorkloadCannotOverlapException extends BadOperationException {
    constructor() {
        super('Bad workload start and end date format', 'Workloads cannot overlap')
        this.name = 'BadStartDateException'
    }
}