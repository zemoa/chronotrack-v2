import { BadOperationException } from "./BadOperationException";

export class BadWorkloadStartDateException extends BadOperationException {
    constructor() {
        super('Bad workload start date format', 'Workload start date cannot be empty')
        this.name = 'BadStartDateException'
    }
}