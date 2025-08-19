const path = require('path');
const fs = require('fs');

class HearthstoneLogUtils {
    constructor() {
        this.hsPath = path.join(process.env['PROGRAMFILES(X86)'], 'Hearthstone');
        this.hsDataPath = path.join(this.hsPath, 'Hearthstone_Data');
        this.configPath = path.join(process.env.LOCALAPPDATA, 'Blizzard', 'Hearthstone', 'log.config');
        this.outputPath = path.join(this.hsDataPath, 'output_log.txt');
        
        // Define os caminhos para todos os logs
        this.logPaths = {
            power: path.join(this.hsDataPath, 'Power.log'),
            zone: path.join(this.hsDataPath, 'Zone.log'),
            asset: path.join(this.hsDataPath, 'Asset.log'),
            bob: path.join(this.hsDataPath, 'Bob.log'),
            net: path.join(this.hsDataPath, 'Net.log')
        };
        
        this.configContent = `[Power]
LogLevel=1
FilePrinting=true
ConsolePrinting=false
ScreenPrinting=false
Verbose=true

[Zone]
LogLevel=1
FilePrinting=true
ConsolePrinting=false
ScreenPrinting=false
Verbose=true

[Asset]
LogLevel=1
FilePrinting=true
ConsolePrinting=false
ScreenPrinting=false

[Bob]
LogLevel=1
FilePrinting=true
ConsolePrinting=false
ScreenPrinting=false

[Net]
LogLevel=1
FilePrinting=true
ConsolePrinting=false
ScreenPrinting=false`;
    }

    checkStatus() {
        const status = {
            instalado: fs.existsSync(this.hsPath),
            config: fs.existsSync(this.configPath),
            logs: {}
        };

        // Verifica cada arquivo de log
        for (const [key, path] of Object.entries(this.logPaths)) {
            status.logs[key] = {
                exists: fs.existsSync(path),
                size: fs.existsSync(path) ? fs.statSync(path).size : 0,
                updatedAt: fs.existsSync(path) ? fs.statSync(path).mtime : null
            };
        }

        return status;
    }

    async verifyLogsSetup() {
        console.log('\n🔍 Verificando configuração dos logs:');
        console.log('----------------------------------------');

        // 1. Verifica o processo do Hearthstone
        const isRunning = await this.isHearthstoneRunning();
        console.log(`Hearthstone em execução: ${isRunning ? '✅' : '❌'}`);

        // 2. Verifica o arquivo de configuração
        if (fs.existsSync(this.configPath)) {
            const content = fs.readFileSync(this.configPath, 'utf8');
            const configOk = content.includes('[Power]') && 
                           content.includes('[Zone]') && 
                           content.includes('[Asset]') &&
                           content.includes('[Bob]') &&
                           content.includes('[Net]');
            
            console.log(`\nArquivo de configuração:`);
            console.log(`├── Existe: ✅`);
            console.log(`└── Configuração correta: ${configOk ? '✅' : '❌'}`);

            if (!configOk) {
                console.log('\n⚠️  Configuração atual pode estar incompleta.');
                console.log('💡 Dica: Execute setupConfig() para atualizar.');
            }
        }

        // 3. Verifica os arquivos de log
        console.log('\nArquivos de log:');
        const status = this.checkStatus();
        
        for (const [key, info] of Object.entries(status.logs)) {
            const symbol = info.exists ? '✅' : '❌';
            const details = info.exists 
                ? `(${Math.round(info.size / 1024)}KB, última atualização: ${info.updatedAt.toLocaleTimeString()})`
                : '(arquivo não existe)';
            
            console.log(`├── ${key}.log: ${symbol} ${details}`);
            
            if (info.exists && info.size === 0) {
                console.log(`│   ⚠️  Arquivo vazio! Pode indicar problemas de permissão.`);
            }
        }

        // 4. Verifica permissões
        try {
            const testFile = path.join(this.hsDataPath, 'test.tmp');
            fs.writeFileSync(testFile, 'test');
            fs.unlinkSync(testFile);
            console.log('\n✅ Permissões de escrita OK');
        } catch (error) {
            console.log('\n❌ Problemas com permissões de escrita!');
            console.log('💡 Dica: Execute o Hearthstone como administrador.');
        }
    }

    async isHearthstoneRunning() {
        try {
            const { execSync } = require('child_process');
            const output = execSync('tasklist /FI "IMAGENAME eq Hearthstone.exe" /FO CSV /NH', { encoding: 'utf8' });
            return output.includes('Hearthstone.exe');
        } catch {
            return false;
        }
    }

    async showInfo() {
        const status = this.checkStatus();

        console.log('\n🎮 Status do Hearthstone:');
        console.log('----------------------------------------');
        console.log(`Instalação: ${status.instalado ? '✅' : '❌'}`);
        if (status.instalado) {
            console.log(`📁 Local: ${this.hsPath}`);
        }

        console.log('\n📝 Arquivos de Log:');
        console.log('----------------------------------------');
        console.log(`Config: ${status.config ? '✅' : '❌'}`);
        console.log(`└── ${this.configPath}`);

        // Verificar configuração detalhada
        await this.verifyLogsSetup();

        // Monitora os logs ativamente
        await this.monitorLogs();

        if (!status.config) {
            console.log('\n⚠️  Config não encontrado! Execute setupConfig() para criar.');
        }
    }

    async monitorLogs() {
        console.log('\n📝 Monitorando logs do Hearthstone:');
        console.log('----------------------------------------');

        const expectedLogs = ['Power.log', 'Zone.log', 'Asset.log', 'Bob.log', 'Net.log'];
        const foundLogs = [];

        for (const logFile of expectedLogs) {
            const logPath = path.join(this.hsDataPath, logFile);
            if (fs.existsSync(logPath)) {
                foundLogs.push(logFile);
                const stats = fs.statSync(logPath);
                console.log(`✅ ${logFile} (${Math.round(stats.size / 1024)}KB)`);
                
                // Tenta ler as últimas linhas do arquivo
                try {
                    const content = fs.readFileSync(logPath, 'utf8');
                    const lines = content.split('\n').slice(-5);
                    console.log('   Últimas linhas:');
                    lines.forEach(line => console.log(`   ${line.slice(0, 100)}...`));
                } catch (err) {
                    console.log(`   ⚠️ Não foi possível ler o conteúdo: ${err.message}`);
                }
            } else {
                console.log(`❌ ${logFile} não encontrado`);
            }
        }

        return foundLogs;
    }

    setupConfig() {
        if (!fs.existsSync(this.hsPath)) {
            console.log('❌ Hearthstone não encontrado!');
            return false;
        }

        try {
            // Verifica se já existe e lê o conteúdo
            if (fs.existsSync(this.configPath)) {
                const currentConfig = fs.readFileSync(this.configPath, 'utf8');
                console.log('\n📄 Configuração atual:');
                console.log('----------------------------------------');
                console.log(currentConfig);
                
                // Se a configuração estiver diferente, atualiza
                if (currentConfig !== this.configContent) {
                    console.log('\n⚠️  Configuração diferente detectada, atualizando...');
                    fs.writeFileSync(this.configPath, this.configContent);
                    console.log('✅ Arquivo de configuração atualizado!');
                    console.log('🎮 Reinicie o Hearthstone para aplicar as alterações.');
                }
            } else {
                // Cria novo arquivo de configuração
                fs.writeFileSync(this.configPath, this.configContent);
                console.log('✅ Arquivo de configuração criado com sucesso!');
                console.log('🎮 Reinicie o Hearthstone para ativar os logs.');
            }
            return true;
        } catch (error) {
            console.log('❌ Erro ao criar/atualizar arquivo de configuração:', error.message);
            console.log('💡 Tente executar como administrador');
            return false;
        }
    }

    checkLogContent() {
        console.log('\n🔍 Verificando conteúdo dos logs:');
        console.log('----------------------------------------');
        
        try {
            // Verifica todos os arquivos .log na pasta Hearthstone_Data
            if (fs.existsSync(this.hsDataPath)) {
                const files = fs.readdirSync(this.hsDataPath);
                const logFiles = files.filter(f => f.endsWith('.log'));
                
                console.log(`📁 Pasta: ${this.hsDataPath}`);
                console.log(`📊 Arquivos de log encontrados: ${logFiles.length}\n`);
                
                logFiles.forEach(file => {
                    const filePath = path.join(this.hsDataPath, file);
                    const stats = fs.statSync(filePath);
                    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
                    console.log(`📄 ${file}: ${sizeMB}MB`);
                    
                    // Se for o Power.log ou output_log.txt, mostra as últimas linhas
                    if (file === 'Power.log' || file === 'output_log.txt') {
                        const content = fs.readFileSync(filePath, 'utf8');
                        const lines = content.split('\n').slice(-5);
                        console.log('\nÚltimas linhas:');
                        lines.forEach(line => console.log(line));
                        console.log('----------------------------------------');
                    }
                });
            } else {
                console.log('❌ Pasta Hearthstone_Data não encontrada');
            }
        } catch (error) {
            console.log('❌ Erro ao ler logs:', error.message);
        }
    }
}

module.exports = HearthstoneLogUtils;
