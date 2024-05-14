// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { registeredHandlers } from "./infrastructure/ipc/RegisteredHandlerCatalog";

declare global {
    interface Window {
        windowApi: {
            maxunmax: () => void
        }
    }
}
registeredHandlers
contextBridge.exposeInMainWorld('windowApi', {
    maxunmax: () => ipcRenderer.invoke("window:maxunmax")
  })