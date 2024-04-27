import { Task } from "../model/Task";
import { TaskOperation } from "./TaskOperation";
import {ulid} from 'ulid'
export class CreateTaskOperation implements TaskOperation {
    constructor(private name: string) {}
    execute(task?: Task): Task {
        const newTask = new Task()
        const id = ulid()
        newTask._setId(ulid())
        newTask._setName(this.name)
        newTask._setWorkingList([])
        return newTask
    }

}