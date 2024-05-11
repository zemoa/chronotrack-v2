import { AddWorkloadOperation } from "app/domain/task/business/AddWorkloadOperation";
import { TaskOperatorFactory } from "app/domain/task/business/TaskOperatorFactory";
import { Task } from "app/domain/task/model/Task";
import { TaskRepository } from "app/domain/task/repository/TaskRepository";
import { UCTaskNotModifiedException } from "./exception/UCTaskNotModifiedException";

export class UCStartWorking {
    constructor(private taskRepository: TaskRepository, private taskOperatorFactory: TaskOperatorFactory) {}
    execute(taskId: string): Task {
        const task = this.taskRepository.findById(taskId)
        const taskOperator = this.taskOperatorFactory.with(task)
        taskOperator.apply(new AddWorkloadOperation(new Date()))
        const modifiedTask = taskOperator.retrieve();
        if(!modifiedTask) {
            throw new UCTaskNotModifiedException()
        }
        return this.taskRepository.update(modifiedTask)
    }
}