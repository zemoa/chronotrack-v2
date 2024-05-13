import { ipcMain } from "electron";
import { IPCApiHandler } from "./IPCApiHandler";

export class IPCConfigurer {
    ipcHandlers: IPCApiHandler<any>[] = []
    public init() {
        this.ipcHandlers.forEach(ipcHandler => {
            const name = ipcHandler.name
            ipcHandler.handlers.forEach(ipcFunctionHandler => {
                ipcMain.on(`${name}-${ipcFunctionHandler.name}`, ipcFunctionHandler.handle)
            })
            
        })
    }

    public addHandler(ipcApiHandler: IPCApiHandler<any>) {
        this.ipcHandlers.push(ipcApiHandler)
    }
}