import { ipcMain } from 'electron';
import log from 'electron-log/main';
import { IPCRegisterer } from './infrastructure/ipc/IPCRegisterer';
import { RegisteredHandlerCatalog, registeredHandlers } from './infrastructure/ipc/RegisteredHandlerCatalog';

export let registeredHandlerCatalog: RegisteredHandlerCatalog
export function initApp() {
    log.initialize();

    registeredHandlerCatalog = initIpc()
}


function initIpc(): RegisteredHandlerCatalog {
    log.debug("InitIpc")
    const ipcRegister = new IPCRegisterer()
    registeredHandlers.forEach(handler => ipcRegister.register(handler))
    ipcRegister.connect(ipcMain)
    return ipcRegister
}