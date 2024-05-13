// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { WindowApi } from "./infrastructure/ipc/windowapi/WindowApi";
import { ipcConfigurer } from "./init";
declare global {
    interface Window {
        windowApi: WindowApi;
    }
}

ipcConfigurer.ipcHandlers.forEach(ipcHandler => {
    contextBridge.exposeInMainWorld(ipcHandler.name, ipcHandler.expose(ipcRenderer))
})

