import { IpcMain } from "electron";
import { IPCChannelInterface } from "./IPCChannelInterface";
import Logger from "electron-log/main";


export class IPCRegisterer {
    private _ipcHandlers: IPCChannelInterface[] = []

    register(ipcHandler: IPCChannelInterface) {
        Logger.debug('register ipchandler')
        this._ipcHandlers.push(ipcHandler)
    }

    connect(ipcMain: IpcMain) {
        this._ipcHandlers.forEach(ipcHandler => {
            Logger.debug(`add ${ipcHandler.name} events`)
            ipcMain.handle(ipcHandler.name, (event, args) => ipcHandler.handle(event, args))
        })
    }
}