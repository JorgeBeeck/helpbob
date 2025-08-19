const path = require('path');
const fs = require('fs');

class HearthstoneLogUtils {
    constructor() {
        this.hsPath = path.join(process.env['PROGRAMFILES(X86)'], 'Hearthstone');
        this.logsPath = path.join(process.env.LOCALAPPDATA, 'Blizzard', 'Hearthstone', 'Logs');
        this.configPath = path.join(process.env.LOCALAPPDATA, 'Blizzard', 'Hearthstone', 'log.config');
        this.outputPath = path.join(this.hsPath, 'Hearthstone_Data', 'output_log.txt');
        this.powerPath = path.join(this.logsPath, 'Power.log');
        
        this.configContent = `[Zone]
LogLevel=1
FilePrinting=true
ConsolePrinting=true
ScreenPrinting=false

[Power]
LogLevel=1
FilePrinting=true
ConsolePrinting=true
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

    showInfo() {
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
        console.log(`\nPower: ${status.power ? '✅' : '❌'}`);
        console.log(`└── ${this.powerPath}`);
        console.log(`\nOutput: ${status.output ? '✅' : '❌'}`);
        console.log(`└── ${this.outputPath}`);

        if (!status.config) {
            console.log('\n⚠️  Config não encontrado! Execute setupConfig() para criar.');
        }
    }

    setupConfig() {
        if (!fs.existsSync(this.hsPath)) {
            console.log('❌ Hearthstone não encontrado!');
            return false;
        }

        try {
            fs.writeFileSync(this.configPath, this.configContent);
            console.log('✅ Arquivo de configuração criado com sucesso!');
            console.log('🎮 Reinicie o Hearthstone para ativar os logs.');
            return true;
        } catch (error) {
            console.log('❌ Erro ao criar arquivo de configuração:', error.message);
            console.log('💡 Tente executar como administrador');
            return false;
        }
    }
}

module.exports = HearthstoneLogUtils;
