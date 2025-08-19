const path = require('path');
const fs = require('fs');

class HearthstoneLogUtils {
    constructor() {
        this.hsPath = path.join(process.env['PROGRAMFILES(X86)'], 'Hearthstone');
        this.hsDataPath = path.join(this.hsPath, 'Hearthstone_Data');
        this.configPath = path.join(process.env.LOCALAPPDATA, 'Blizzard', 'Hearthstone', 'log.config');
        this.outputPath = path.join(this.hsDataPath, 'output_log.txt');
        // Novo: logs estão sendo gerados direto na pasta Hearthstone_Data
        this.powerPath = path.join(this.hsDataPath, 'Power.log');
        
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
        return {
            instalado: fs.existsSync(this.hsPath),
            config: fs.existsSync(this.configPath),
            power: fs.existsSync(this.powerPath),
            output: fs.existsSync(this.outputPath)
        };
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
