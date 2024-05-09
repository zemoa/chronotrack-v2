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

    get lastWorkload(): Workload | undefined {
        return this._workloads.sort((a, b) => {
            if(a.start < b.start) {
                return 1
            } else if (a.start > b.start) {
                return -1
            }
            return 0
        }).findLast(() => true)
    }
}