import Logger from "electron-log/main";
import { IPCChannelInterface } from "../IPCChannelInterface";

export class IPCMaxUnmax implements IPCChannelInterface {
    name = "window:maxunmax";
    handle(event: Electron.IpcMainInvokeEvent, request: any): void {
        Logger.debug("MaxUnmaxcalled")
    }

}