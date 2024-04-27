import { Workload } from "./Workload";

export class Task {
    constructor(private _id: string, private _name: string, private _workloads: Workload[] = []) {}

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get workloads(): Workload[] {
        return this._workloads
    }

    _setName(name: string) {
        this._name = name
    }

    _setWorkloads(workloads: Workload[]) {
        this._workloads = workloads
    }
}