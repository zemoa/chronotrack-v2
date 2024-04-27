import { CreateTaskOperation } from "app/domain/task/business/CreateTaskOperation"

describe('Test for creating a Task', () => {
    test('Just create a task', () => {
        const sut = new CreateTaskOperation()
        const result = sut.execute()
        expect(result).toBeDefined()
    })
})