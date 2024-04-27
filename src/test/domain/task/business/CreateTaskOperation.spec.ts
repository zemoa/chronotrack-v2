import { CreateTaskOperation } from "app/domain/task/business/CreateTaskOperation"

describe('Test for creating a Task', () => {
    test('Just create a task', () => {
        const name = "A test"
        const sut = new CreateTaskOperation(name)
        const result = sut.execute()
        expect(result).toBeDefined()
        expect(result.id).toBeDefined()
        expect(result.name).toBe(name)
        expect(result.workingList.length).toBe(0)
    })
})