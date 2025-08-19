const HearthstoneLogUtils = require('./hearthstone-logs');

console.log('🔍 Verificador de Logs do Hearthstone (Windows)');
console.log('============================================');

const logUtils = new HearthstoneLogUtils();

// Mostrar status atual
logUtils.showInfo();

// Sempre verifica e atualiza a configuração
console.log('\n🛠️  Verificando configuração...');
logUtils.setupConfig();

// Sempre verifica o conteúdo da pasta
logUtils.checkLogContent();

console.log('\n✨ Verificação concluída!');
