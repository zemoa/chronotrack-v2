import { TaskOperation } from "app/domain/task/business/TaskOperation"
import { TaskOperator } from "app/domain/task/business/TaskOperator"
import { Task } from "app/domain/task/model/Task"

describe('Test for Task Operator', () => {
    
    test('test that execute on operation is called when an operation is applied', () => {
        const initialTask = new Task("123", "a name")
        const mockedOperation : TaskOperation = {
            execute: jest.fn((task?: Task) => task!)
        }
        const sut = new TaskOperator(initialTask)
        const spyOnExecute = jest.spyOn(mockedOperation, 'execute')
        sut.apply(mockedOperation)
        expect(spyOnExecute).toHaveBeenCalledTimes(1)
    })

    test('if new task is created in operation, than it must replace the one in operator', () => {
        const mockedOperation : TaskOperation = {
            execute: jest.fn((task) => new Task("421", "other"))
        }
        const sut = new TaskOperator(new Task("123", "a name"))
        sut.apply(mockedOperation)
        const result = sut.retrieve();

        expect(result!.id).toBe("421")
        expect(result!.name).toBe("other")
    })
})