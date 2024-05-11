import { CreateTaskOperation } from "app/domain/task/business/CreateTaskOperation";
import { TaskOperatorFactory } from "app/domain/task/business/TaskOperatorFactory";
import { Task } from "app/domain/task/model/Task";
import { TaskRepository } from "app/domain/task/repository/TaskRepository";
import { UCException } from "./exception/UCException";
import { UCTaskNotCreatedException } from "./exception/UCTaskNotCreatedException";

export class UCCreateTask {
    constructor(private taskRepository: TaskRepository, private taskOperatorFactory: TaskOperatorFactory){}
    execute(name: string) : Task {
        const taskOperator = this.taskOperatorFactory.with()
        taskOperator.apply(new CreateTaskOperation(name))
        const createdTask = taskOperator.retrieve();
        if(!createdTask) {
            throw new UCTaskNotCreatedException()
        }
        const savedTask = this.taskRepository.create(createdTask)
        return savedTask
    }
}