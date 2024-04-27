import { Task } from "../model/Task";
import { TaskOperation } from "./TaskOperation";
import {ulid} from 'ulid'
export class CreateTaskOperation implements TaskOperation {
    constructor(private name: string) {}
    execute(task?: Task): Task {
        const newTask = new Task(ulid(), this.name)
        return newTask
    }

}