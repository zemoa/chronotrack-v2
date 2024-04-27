import { TaskOperation } from "app/domain/task/business/TaskOperation"
import { TaskOperator } from "app/domain/task/business/TaskOperator"
import { Task } from "app/domain/task/model/Task"

describe('Test for Task Operator', () => {
    const mockedOperation : TaskOperation = {
        execute: jest.fn((task) => {})
    }
    test('test that execute on operation is called when an operation is applied', () => {
        const sut = new TaskOperator(new Task())
        const spyOnExecute = jest.spyOn(mockedOperation, 'execute')
        sut.apply(mockedOperation)
        expect(spyOnExecute).toHaveBeenCalledTimes(1)
    })
})