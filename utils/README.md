# 🛠️ Utilitários do HelpBob

Esta pasta contém utilitários para auxiliar no desenvolvimento do HelpBob.

## 📜 Scripts Disponíveis

### Verificador de Logs do Hearthstone
Utilitário para verificar e configurar os logs do Hearthstone.

**Como usar:**
```bash
# Na pasta utils
node open-logs.js

# Ou na raiz do projeto
npm run logs
```

**O que ele faz:**
1. Verifica se o Hearthstone está instalado
2. Checa a existência dos arquivos de log
3. Cria/verifica arquivo de configuração de logs
4. Mostra status detalhado de todos os arquivos

**Saída esperada:**
```
🔍 Verificador de Logs do Hearthstone (Windows)
============================================

🎮 Status do Hearthstone:
----------------------------------------
Instalação: ✅
📁 Local: C:\Program Files (x86)\Hearthstone

📝 Arquivos de Log:
----------------------------------------
Config: ✅
Power: ✅
Output: ✅
```

### Estrutura de Arquivos
```
utils/
├── hearthstone-logs.js  # Classe principal para gerenciar logs
├── open-logs.js         # Script executável para verificar logs
└── README.md           # Esta documentação
```

### Requisitos
- Node.js instalado
- Hearthstone instalado (para funcionalidade completa)
- Windows 11

### Possíveis Erros e Soluções

1. **Hearthstone não encontrado**
   - Verifique se está instalado em `C:\Program Files (x86)\Hearthstone`

2. **Erro ao criar config**
   - Execute o PowerShell como administrador
   - Verifique permissões da pasta

3. **Logs não aparecem**
   - Reinicie o Hearthstone após criar a configuração
   - Verifique se o arquivo `log.config` foi criado corretamente
