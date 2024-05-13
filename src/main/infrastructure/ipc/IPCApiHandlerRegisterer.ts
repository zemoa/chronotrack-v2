export interface IPCApiHandlerRegisterer {
    handlers(): {name: string, handler: (args: any) => void}[]
}