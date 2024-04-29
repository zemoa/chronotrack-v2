import { Task } from "app/domain/task/model/Task";
import { TaskRepository } from "app/domain/task/repository/TaskRepository";


export class UCListTasks {
    constructor(private taskRepository: TaskRepository){}
    public execute(): Task[] {
        return this.taskRepository.findAll()
    }
}