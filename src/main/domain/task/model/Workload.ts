export class Workload {
    constructor(private _start: Date, private _end?: Date) {}

    get start(): Date {
        return this._start
    }

    get end(): Date | undefined {
        return this._end
    }
}