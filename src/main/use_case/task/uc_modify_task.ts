import { ModifyTaskOperation } from "app/domain/task/business/ModifyTaskOperation"
import { TaskOperatorFactory } from "app/domain/task/business/TaskOperatorFactory"
import { Task } from "app/domain/task/model/Task"
import { TaskRepository } from "app/domain/task/repository/TaskRepository"

export class UCModifyTask {
    constructor(private taskRepository: TaskRepository, private taskOperatorFactory: TaskOperatorFactory){}
    execute(id: string, arg: {
        name?: string
    }) : Task {
        let task = this.taskRepository.findById(id)
        const taskOperator = this.taskOperatorFactory.with(task)
        taskOperator.apply(new ModifyTaskOperation({
            name: arg.name
        }))
        return this.taskRepository.update(taskOperator.retrieve())
    }
}