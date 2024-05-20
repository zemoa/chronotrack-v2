import { BrowserWindow } from "electron";
import Logger from "electron-log/main";
import { IPCChannelInterface } from "../IPCChannelInterface";
import { IPC_MAXUNMAX, IPC_MINIMIZE } from "../ipc_catalog_api";

export class IPCMinimize implements IPCChannelInterface {
    name = IPC_MINIMIZE;
    constructor(private mainWindow: BrowserWindow) {}
    handle(event: Electron.IpcMainInvokeEvent, request: any): void {
        Logger.debug("Minimize called")
        this.mainWindow.minimize()
    }
}