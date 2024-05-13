import log from 'electron-log/main'
import { IPCFunctionHandler } from '../IPCApiHandler'
export class MaxUnMaximizeHandler implements IPCFunctionHandler {
    get name(): string {
        return "maxUnMaximizeHandler"
    }
    handle(): void {
        log.debug('maxUnMaximizeHandler')
    }
}