import { ipcMain } from "electron";
import { ping } from "./usecase/ping";

export const setupServer = (): void => {
  ipcMain.handle("ping", ping);
};
