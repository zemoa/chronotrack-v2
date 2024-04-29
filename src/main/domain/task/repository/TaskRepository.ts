import { Task } from "../model/Task";

export interface TaskRepository {
    findAll(): Task[]
    findById(id: string): Task | undefined
    create(task: Task): Task
    delete(task: Task): void
    update(task: Task): Task
}