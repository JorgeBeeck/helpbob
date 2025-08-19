// Interface para comunicação entre Electron e Angular
interface ElectronAPI {
  send(channel: string, data?: any): void;
  receive(channel: string, callback: (data: any) => void): void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
  }
}
