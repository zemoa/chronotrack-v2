import { UCException } from "./UCException"

export class UCTaskNotCreatedException extends UCException {
    constructor() {
        super("Task not created")
        this.name = 'UCTaskNotCreatedException'
    }
}