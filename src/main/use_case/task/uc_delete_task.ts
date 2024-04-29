import { TaskRepository } from "app/domain/task/repository/TaskRepository";

export class UCDeleteTask {
    constructor(private taskRepository: TaskRepository) {}
    public execute(id: string) {
        const taskToDelete = this.taskRepository.findById(id)
        if(taskToDelete) {
            this.taskRepository.delete(taskToDelete)
        }
    }
}