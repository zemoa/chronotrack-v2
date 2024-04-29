import { Task } from "app/domain/task/model/Task"
import { TaskRepository } from "app/domain/task/repository/TaskRepository"
import { UCDeleteTask } from "app/use_case/task/uc_delete_task"
import { mock } from "jest-mock-extended"

describe('Deleting a task', () => {
    test('Deleting an existing task', () => {
        const taskRepository = mock<TaskRepository>()
        taskRepository.findById.mockReturnValue(new Task('123', 'name', []))
        const sut = new UCDeleteTask(taskRepository)
        sut.execute('123')

        expect(taskRepository.delete).toHaveBeenCalledTimes(1)
        expect(taskRepository.delete).toHaveBeenCalledWith(new Task('123', 'name', []))
    })

    test('Deleting a not existing Task should not fail', () => {
        const taskRepository = mock<TaskRepository>()
        taskRepository.findById.mockReturnValue(undefined)
        const sut = new UCDeleteTask(taskRepository)
        sut.execute('123')

        expect(taskRepository.delete).toHaveBeenCalledTimes(0)
    })
})