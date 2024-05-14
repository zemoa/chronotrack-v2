import { IpcMainInvokeEvent } from "electron";

export interface IPCChannelInterface {
    name: string
    handle(event: IpcMainInvokeEvent, request: any): void;
}