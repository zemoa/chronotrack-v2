import { BadOperationException } from "./BadOperationException";

export class BadWorkloadEndDateException extends BadOperationException {
    constructor(private _reason: string) {
        super('Bad workload end date format', _reason)
        this.name = 'BadStartDateException'
    }

}