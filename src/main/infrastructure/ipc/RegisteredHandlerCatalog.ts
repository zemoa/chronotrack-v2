import { IPCChannelInterface } from "./IPCChannelInterface"
import { IPCMaxUnmax } from "./window-api/IPCMaxUnmax"

export interface RegisteredHandlerCatalog {
    handlerNames: string[]
}

export const registeredHandlers: IPCChannelInterface[] = [
    new IPCMaxUnmax()
]