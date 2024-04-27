import { Task } from "app/domain/task/model/Task";
import { TaskRepository } from "app/domain/task/repository/TaskRepository";

export class UCListTasks {
    constructor(private taskRepository: TaskRepository){}
    public execute(idUser: string): Task[] {
        return this.taskRepository.findByUser(idUser)
    }
}