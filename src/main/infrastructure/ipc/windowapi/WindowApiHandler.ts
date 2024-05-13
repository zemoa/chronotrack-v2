import { IpcRenderer } from "electron/renderer";
import { IPCApiHandler, IPCFunctionHandler } from "../IPCApiHandler";
import { WindowApi } from "./WindowApi";
import { MaxUnMaximizeHandler } from "./MaxUnMaximizeHandler";

export class WindowApidHandler implements IPCApiHandler<WindowApi> {
    private maxUnmaximize = new MaxUnMaximizeHandler()
    private _exposedApi: WindowApi = {
        close: () => {},
        maxUnmaximize: () => {},
        minus: () => {}
    }

    get name(): string {
        return "windowApi"
    }
    get prefixFunc(): string {
        return "window"
    }
    get handlers(): IPCFunctionHandler[] {
        return [this.maxUnmaximize]
    }
    expose(ipcRenderer: IpcRenderer): WindowApi {
        this._exposedApi.maxUnmaximize = () => {
            ipcRenderer.send(`${this.name}-${this.maxUnmaximize.name}`)
        }
        return this._exposedApi
    }
} 