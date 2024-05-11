export class UCException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'UCException'
    }
}