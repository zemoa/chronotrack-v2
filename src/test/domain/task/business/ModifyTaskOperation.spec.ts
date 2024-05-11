import { ModifyTaskOperation } from "app/domain/task/business/ModifyTaskOperation"
import { BadOperationException } from "app/domain/task/exception/BadOperationException"
import { Task } from "app/domain/task/model/Task"

describe('Modiying a task operation', () => {
    test('Modify the name', () => {
        const sut = new ModifyTaskOperation({name: "The new name"})
        const modifiedTask = sut.execute(new Task("123", "Original Name", []))
        expect(modifiedTask.name).toBe("The new name")
    })
    test('No modification should not modify task', () => {
        const sut = new ModifyTaskOperation({})
        const modifiedTask = sut.execute(new Task("123", "Original Name", []))
        expect(modifiedTask.name).toBe("Original Name")
    })

    test('Modifying empty task must throw error', () => {
        const sut = new ModifyTaskOperation({name: "The new name"})

        expect(() => sut.execute()).toThrow(new BadOperationException("Cannot apply modiying task on undefined task", ''))
    })
})