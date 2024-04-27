import { WorkingTaskItems } from "./WorkingTaskItem";

export class Task {
    private _id: string;
    private _name: string;
    private _workingList: WorkingTaskItems[];

    get id(): string {
        return this._id
    }

    get name(): string {
        return this._name
    }

    get workingList(): WorkingTaskItems[] {
        return this._workingList
    }

    _setId(id: string) {
        this._id = id
    }

    _setName(name: string) {
        this._name = name
    }

    _setWorkingList(workingList: WorkingTaskItems[]) {
        this._workingList = workingList
    }
}