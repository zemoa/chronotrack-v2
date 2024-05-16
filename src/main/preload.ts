// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import { WindowApi, ipc_api_catalog } from "./ipc_catalog_api";


declare global {
    interface Window {
        windowApi: WindowApi
    }
}
ipc_api_catalog.forEach(ipcApiEntry => {
    const api = ipcApiEntry.channels.reduce((api, channel) => {
        return {
            ...api,
            [channel.methodName]: () => ipcRenderer.invoke(channel.name)
        }
    }, ipcApiEntry)
    contextBridge.exposeInMainWorld(ipcApiEntry.name, api)
})