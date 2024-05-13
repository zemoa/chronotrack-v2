import { IpcRenderer } from "electron/renderer"

export interface IPCApiHandler<T> {
    name: string
    prefixFunc: string
    handlers: IPCFunctionHandler[]
    expose(ipcRenderer: IpcRenderer): T
}

export interface IPCFunctionHandler {
    name: string
    handle(): void
}