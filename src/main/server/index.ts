import { ipcMain } from "electron";
import { ping } from "./usecase/ping";

export const setupServer = (): void => {
  ipcMain.on("ping", () => console.log("pong"));
  ipcMain.handle("ping", ping);
};
