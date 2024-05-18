// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { WindowApi } from "./infrastructure/ipc/ipc_ui_api";
import { IPC_MAXUNMAX, IPC_MINIMIZE } from "./infrastructure/ipc/ipc_catalog_api";


declare global {
    interface Window {
        windowApi: WindowApi
    }
}

contextBridge.exposeInMainWorld("windowApi", {
maxunmax: () => ipcRenderer.invoke(IPC_MAXUNMAX),
minimize: () => ipcRenderer.invoke(IPC_MINIMIZE)
} as WindowApi)
