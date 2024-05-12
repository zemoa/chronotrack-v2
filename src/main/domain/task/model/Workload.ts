export class Workload {
    constructor(private _id: string, private _start: Date, private _end?: Date) {}

    get id(): string {
        return this._id
    }

    get start(): Date {
        return this._start
    }

    get end(): Date | undefined {
        return this._end
    }
}