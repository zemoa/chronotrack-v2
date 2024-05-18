import { BrowserWindow } from "electron";
import Logger from "electron-log/main";
import { IPCChannelInterface } from "../IPCChannelInterface";
import { IPC_MAXUNMAX } from "../ipc_catalog_api";

export class IPCMaxUnmax implements IPCChannelInterface {
    name = IPC_MAXUNMAX;
    constructor(private mainWindow: BrowserWindow) {}
    handle(event: Electron.IpcMainInvokeEvent, request: any): void {
        Logger.debug("MaxUnmaxcalled")
        if(this.mainWindow.isMaximized()) {
            this.mainWindow.unmaximize()
        } else {
            this.mainWindow.maximize()
        }
    }
}