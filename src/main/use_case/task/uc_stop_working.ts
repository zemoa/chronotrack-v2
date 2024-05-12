import { ModifyTaskOperation } from "app/domain/task/business/ModifyTaskOperation";
import { ModifyWorkloadOperation } from "app/domain/task/business/ModifyWorkloadOperation";
import { TaskOperatorFactory } from "app/domain/task/business/TaskOperatorFactory";
import { TaskRepository } from "app/domain/task/repository/TaskRepository";
import { UCTaskNotModifiedException } from "./exception/UCTaskNotModifiedException";

export class UCStopWorking {
    constructor(private taskRepository: TaskRepository, private taskOperatorFactory: TaskOperatorFactory) {}
    public execute(taskId: string) {
        const task = this.taskRepository.findById(taskId)
        const lastWorkload = task?.lastWorkload
        if(!lastWorkload || lastWorkload.end) {
            return
        }
        const taskOperator = this.taskOperatorFactory.with(task)
        taskOperator.apply(new ModifyWorkloadOperation(lastWorkload?.id, undefined, new Date()))
        const modifiedTask = taskOperator.retrieve();
        if(!modifiedTask) {
            throw new UCTaskNotModifiedException()
        }
        this.taskRepository.update(modifiedTask)
    }
}