import { Task } from "../model/Task";

export interface TaskRepository {
    findByUser(id: string): Task[]
    create(task: Task): Task
}