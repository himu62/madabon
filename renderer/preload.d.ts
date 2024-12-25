import { IpcHandler } from "../main/preload";

declare global {
  interface Window {
    ipc: IpcHandler;
    versions: {
      node: string;
      electron: string;
      next: string;
      react: string;
    };
  }
}
