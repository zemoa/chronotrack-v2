import log from 'electron-log/main'
import { IPCConfigurer } from './infrastructure/ipc/IPCConfigurer';
import { WindowApidHandler } from './infrastructure/ipc/windowapi/WindowApiHandler';
import { MaxUnMaximizeHandler } from './infrastructure/ipc/windowapi/MaxUnMaximizeHandler';

export const ipcConfigurer = new IPCConfigurer()

export function initApp() {
    log.initialize();

    initIpc()
}

function initIpc() {
    const windowApiHandlers = new WindowApidHandler()
    ipcConfigurer.addHandler(windowApiHandlers)
    ipcConfigurer.init()
}