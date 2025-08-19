const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

class LogWatcher {
    constructor(window) {
        this.mainWindow = window;
        this.watchers = new Map();
        this.hsDataPath = path.join(process.env['PROGRAMFILES(X86)'], 'Hearthstone', 'Hearthstone_Data');
        
        this.setupIPCHandlers();
    }

    setupIPCHandlers() {
        ipcMain.on('start-log-watch', (_, { logFiles }) => {
            this.startWatching(logFiles);
        });

        ipcMain.on('stop-log-watch', () => {
            this.stopWatching();
        });
    }

    startWatching(logFiles) {
        // Para cada arquivo de log que queremos monitorar
        logFiles.forEach(logFile => {
            const logPath = path.join(this.hsDataPath, logFile);
            
            // Se já estiver monitorando, ignore
            if (this.watchers.has(logPath)) return;

            try {
                // Criar o arquivo se não existir
                if (!fs.existsSync(logPath)) {
                    fs.writeFileSync(logPath, '');
                }

                // Configurar o watcher
                const watcher = fs.watch(logPath, (eventType, filename) => {
                    if (filename) {
                        // Quando detectar mudança, ler o conteúdo e enviar
                        fs.promises.readFile(logPath, 'utf8')
                            .then(content => {
                                this.mainWindow.webContents.send('log-event', {
                                    type: eventType,
                                    filePath: logPath,
                                    content,
                                    timestamp: new Date()
                                });
                            })
                            .catch(error => {
                                console.error(`Erro ao ler ${logPath}:`, error);
                            });
                    }
                });

                this.watchers.set(logPath, watcher);
                console.log(`Monitorando ${logPath}`);
            } catch (error) {
                console.error(`Erro ao configurar watcher para ${logPath}:`, error);
            }
        });
    }

    stopWatching() {
        // Parar todos os watchers
        for (const [path, watcher] of this.watchers) {
            watcher.close();
            console.log(`Parou de monitorar ${path}`);
        }
        this.watchers.clear();
    }
}

module.exports = LogWatcher;
