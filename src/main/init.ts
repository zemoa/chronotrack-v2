import { BrowserWindow, ipcMain } from 'electron';
import log from 'electron-log/main';
import { IPCRegisterer } from './infrastructure/ipc/IPCRegisterer';
import { IPCMaxUnmax } from './infrastructure/ipc/window-api/IPCMaxUnmax';
import { IPCMinimize } from './infrastructure/ipc/window-api/IPCMinimize';

export function initApp(mainWindow: BrowserWindow) {
    log.initialize();

    initIpc(mainWindow)
}

function initIpc(mainWindow: BrowserWindow) {
    log.debug("InitIpc")
    const ipcRegister = new IPCRegisterer()
    ipcRegister.register(new IPCMaxUnmax(mainWindow))
    ipcRegister.register(new IPCMinimize(mainWindow))
    ipcRegister.connect(ipcMain)
    return ipcRegister
}