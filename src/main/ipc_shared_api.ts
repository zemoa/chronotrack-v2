export interface IpcApi {
}

export interface IpcHandlerCatalogApiEntry {
    name: string
    channels: IpcHandlerChannelsEntry[]
    interface: IpcApi
}
export interface IpcHandlerChannelsEntry {
    name: string
    methodName: string
}