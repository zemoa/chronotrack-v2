import { IpcApi, IpcHandlerCatalogApiEntry } from "./ipc_shared_api"

export interface WindowApi extends IpcApi {
    maxunmax: () => void
}

export const ipc_api_catalog: IpcHandlerCatalogApiEntry[] = [
    {
        name: "windowApi",
        channels: [{ name: "window:maxunmax", methodName: "maxunmax" }],
        interface: {} as WindowApi
    }
]