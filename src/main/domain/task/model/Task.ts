import { WorkingTaskItems } from "./WorkingTaskItem";

export class Task {
    private _id: string;
    private _name: string;
    private _workingList: WorkingTaskItems[];

    get id(): string {
        return this.id
    }

    set _setId(id: string) {
        this._id = id
    }
}