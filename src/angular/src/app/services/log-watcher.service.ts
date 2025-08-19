import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface LogEvent {
  type: 'created' | 'changed' | 'deleted';
  filePath: string;
  content?: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LogWatcherService {
  private logEvents = new Subject<LogEvent>();
  public events$ = this.logEvents.asObservable();

  constructor() {
    // Inicializa o serviço quando o Angular carregar
    this.initialize();
  }

  private initialize() {
    // Aqui vamos integrar com o Electron para monitorar os arquivos
    // O Electron irá usar o fs.watch do Node.js para monitorar as mudanças
    
    // Enviamos uma mensagem para o processo principal do Electron
    if (window.electron) {
      window.electron.send('start-log-watch', {
        logFiles: [
          'Power.log',
          'Zone.log',
          'Asset.log',
          'Bob.log',
          'Net.log'
        ]
      });

      // Recebemos as atualizações do processo principal
      window.electron.receive('log-event', (event: LogEvent) => {
        this.logEvents.next(event);
      });
    }
  }

  // Método para parar o monitoramento
  public stopWatching() {
    if (window.electron) {
      window.electron.send('stop-log-watch');
    }
  }
}
