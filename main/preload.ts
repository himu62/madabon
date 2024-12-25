import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import electronPackage from "electron/package.json";
import nextPackage from "next/package.json";
import reactPackage from "react/package.json";

const handler = {
  send(channel: string, value: unknown) {
    ipcRenderer.send(channel, value);
  },
  on(channel: string, callback: (...args: unknown[]) => void) {
    const subscription = (_event: IpcRendererEvent, ...args: unknown[]) => callback(...args);
    ipcRenderer.on(channel, subscription);

    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

contextBridge.exposeInMainWorld("ipc", handler);

export type IpcHandler = typeof handler;

contextBridge.exposeInMainWorld("versions", {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: electronPackage.version,
  next: nextPackage.version,
  react: reactPackage.version,
});
