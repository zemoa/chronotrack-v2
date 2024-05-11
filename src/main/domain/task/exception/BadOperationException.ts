export class BadOperationException extends Error {
    constructor(message: string, reason: string) {
        super(message)
        this.name = 'BadOperationException'
    }
}