# Hearthstone Logs: Guia de Verificação

## 1. Arquivo de Configuração (`log.config`)
O arquivo deve estar em:
```
Windows: %LOCALAPPDATA%\Blizzard\Hearthstone\log.config
```

Conteúdo recomendado para o arquivo `log.config`:
```ini
[Power]
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
ScreenPrinting=false
```

## 2. Lista de Verificação

### Antes de Iniciar o Hearthstone
1. ✅ Confirmar que o arquivo `log.config` existe no local correto
2. ✅ Verificar se o conteúdo do arquivo está correto
3. ✅ Garantir que o Hearthstone não está em execução

### Após Iniciar o Hearthstone
1. ✅ Verificar se os arquivos de log foram criados em `Hearthstone_Data`:
   - Power.log
   - Zone.log
   - Asset.log
   - Bob.log
   - Net.log
2. ✅ Confirmar que os arquivos estão sendo atualizados
3. ✅ Verificar permissões de leitura

### Como testar se está funcionando
1. Inicie o Hearthstone
2. Entre em uma partida contra o Inkeeper (IA)
3. Jogue algumas cartas
4. Verifique se os arquivos de log estão sendo atualizados
   - Power.log deve conter informações sobre poderes heroicos e ataques
   - Zone.log deve conter informações sobre movimentação de cartas
   - Asset.log deve conter informações sobre recursos carregados

## 3. Resolução de Problemas

Se os logs não estiverem sendo gerados:
1. Feche o Hearthstone completamente
2. Verifique se não há processos do Hearthstone rodando
3. Delete os arquivos de log existentes
4. Recrie o arquivo `log.config`
5. Execute o Hearthstone como administrador
6. Entre em uma partida e verifique novamente

Se ainda assim não funcionar:
1. Verifique as permissões da pasta `Hearthstone_Data`
2. Tente criar os arquivos manualmente para testar permissões
3. Verifique se o antivírus não está bloqueando a criação/modificação dos arquivos
