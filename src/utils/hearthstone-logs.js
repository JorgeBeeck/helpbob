const { shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

/**
 * Utilitário para gerenciar logs do Hearthstone
 */
class HearthstoneLogUtils {
    constructor() {
        this.logPaths = this.getLogPaths();
    }

    /**
     * Obtém os caminhos dos logs baseado no sistema operacional
     * @returns {Object} Objeto com os caminhos dos logs
     */
    getLogPaths() {
        const platform = process.platform;
        let basePath;

        switch (platform) {
            case 'win32': // Windows
                basePath = path.join(process.env.LOCALAPPDATA, 'Blizzard', 'Hearthstone', 'Logs');
                break;
            case 'darwin': // macOS
                basePath = path.join(os.homedir(), 'Library', 'Logs', 'Blizzard', 'Hearthstone');
                break;
            case 'linux': // Linux
                basePath = path.join(os.homedir(), '.local', 'share', 'Blizzard', 'Hearthstone', 'Logs');
                break;
            default:
                throw new Error(`Sistema operacional não suportado: ${platform}`);
        }

        return {
            base: basePath,
            power: path.join(basePath, 'Power.log'),
            loading: path.join(basePath, 'LoadingScreen.log'),
            net: path.join(basePath, 'Net.log'),
            arena: path.join(basePath, 'Arena.log')
        };
    }

    /**
     * Verifica se os logs existem
     * @returns {Object} Status de cada arquivo de log
     */
    checkLogsExist() {
        const status = {};
        for (const [key, path] of Object.entries(this.logPaths)) {
            status[key] = fs.existsSync(path);
        }
        return status;
    }

    /**
     * Abre a pasta de logs no explorador de arquivos
     */
    openLogsFolder() {
        if (fs.existsSync(this.logPaths.base)) {
            shell.openPath(this.logPaths.base);
            console.log('Abrindo pasta de logs:', this.logPaths.base);
            return true;
        } else {
            console.error('Pasta de logs não encontrada:', this.logPaths.base);
            return false;
        }
    }

    /**
     * Abre um arquivo de log específico
     * @param {string} logType - Tipo de log ('power', 'loading', 'net', 'arena')
     */
    openLogFile(logType) {
        const logPath = this.logPaths[logType];
        if (fs.existsSync(logPath)) {
            shell.openPath(logPath);
            console.log(`Abrindo arquivo ${logType}:`, logPath);
            return true;
        } else {
            console.error(`Arquivo ${logType} não encontrado:`, logPath);
            return false;
        }
    }
}

module.exports = HearthstoneLogUtils;
