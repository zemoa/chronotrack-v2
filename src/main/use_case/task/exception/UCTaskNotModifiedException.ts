import { UCException } from "./UCException"

export class UCTaskNotModifiedException extends UCException {
    constructor() {
        super("Task not modified")
        this.name = 'UCTaskNotModifiedException'
    }
}