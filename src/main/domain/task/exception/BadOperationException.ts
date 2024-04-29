export class BadOperationException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'BadOperationException'
    }
}