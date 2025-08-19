const HearthstoneLogUtils = require('./hearthstone-logs');

// Criar instância do utilitário
const logUtils = new HearthstoneLogUtils();

// Verificar status dos logs
console.log('\nVerificando existência dos logs:');
const status = logUtils.checkLogsExist();
console.log(status);

// Tentar abrir a pasta de logs
console.log('\nTentando abrir pasta de logs...');
const opened = logUtils.openLogsFolder();
if (opened) {
    console.log('Pasta de logs aberta com sucesso!');
} else {
    console.log('Não foi possível abrir a pasta de logs.');
    console.log('Verifique se o Hearthstone está instalado e se já foi executado pelo menos uma vez.');
}

// Exemplo de como abrir um arquivo específico
console.log('\nTentando abrir Power.log...');
logUtils.openLogFile('power');
