# Logs do Hearthstone: Guia Completo
> Baseado em uma descoberta da comunidade sobre o sistema interno de logs do Hearthstone

## 📋 Introdução
O Hearthstone possui um sistema de logs interno muito útil e pouco conhecido que permite rastrear todo o histórico de jogo sem necessidade de captura de tela ou análise de tráfego TCP.

## 🛠️ Como Ativar os Logs

### 1. Localização do Arquivo de Configuração
Navegue até o diretório de dados locais do Hearthstone:

**Windows:**
```
C:\Users\[SEU_USUARIO]\AppData\Local\Blizzard\Hearthstone
```
ou simplesmente:
```
%LOCALAPPDATA%\Blizzard\Hearthstone
```

**macOS:**
```
~/Library/Application Support/Blizzard/Hearthstone
```

### 2. Criar Arquivo de Configuração
Crie um arquivo chamado `log.config` com o seguinte conteúdo básico:
```ini
[Zone]
LogLevel=1
FilePrinting=true
ConsolePrinting=true
ScreenPrinting=false
```

## 📍 Localização dos Logs
Após configurar, o Hearthstone criará arquivos de log em:

**Windows:**
```
C:\Program Files (x86)\Hearthstone\Hearthstone_Data\output_log.txt
```
(ou `Program Files` para sistemas 32 bits)

**macOS:**
```
/Applications/Hearthstone/Hearthstone.app/Contents/Data/output_log.txt
```

## 📊 Exemplo de Logs
Aqui está um exemplo de log de uma partida contra o Estalajadeiro Paladino:

```log
[Zone] ZoneChangeList.ProcessChanges() - id=1 local=False [name=Garrosh Hellscream id=4 zone=PLAY zonePos=0 cardId=HERO_01 player=1] zone from  -> FRIENDLY PLAY (Hero)
[Zone] ZoneChangeList.ProcessChanges() - id=1 local=False [name=Uther Lightbringer id=36 zone=PLAY zonePos=0 cardId=HERO_04 player=2] zone from  -> OPPOSING PLAY (Hero)
...
[Zone] ZoneChangeList.ProcessChanges() - id=7 local=False [name=The Coin id=68 zone=GRAVEYARD zonePos=0 cardId=GAME_005 player=1] zone from  -> FRIENDLY GRAVEYARD
```

## 🔍 Tipos de Logs Disponíveis
Você pode ativar diferentes tipos de logs substituindo "ZONE" no arquivo de configuração por qualquer um destes:

| Logger | Descrição |
|--------|-----------|
| Asset | Mostra assets Unity carregados |
| BattleNet | Informações da Battle.net |
| Bob | Mostra ranking lendário |
| Power | Poderes heroicos e ataques |
| Net | Informações de rede |
| Kyle | Informações de card backs |
| Sound | Logs de áudio |
| LoadingFile | Arquivos sendo carregados |

## 🛡️ Considerações de Segurança
- Este método é completamente seguro e não viola os Termos de Serviço da Blizzard
- Usa apenas recursos oficiais incorporados ao jogo
- Não requer captura de pacotes ou modificação do cliente

## 💡 Dicas para Desenvolvedores
Para processar os logs via terminal:
```bash
grep '^\[Zone.*\[name=.*zone=(PLAY|HAND).* HAND ' output_log.txt | cut -d' ' -f5- | cut -d'=' -f2- | uniq | sed -e 's/^True/ME:   /;s/^False/THEM: /;s/\[name=\(.*\) id=[0-9]*.*/\1/'
```

Este comando filtra e formata as jogadas para um formato mais legível:
```
ME:    The Coin
ME:    Armorsmith
THEM:  Voidwalker
```

## 📌 Notas Importantes
1. Os logs são mantidos até que o jogo seja fechado
2. É necessário reiniciar o Hearthstone após criar/modificar o arquivo de configuração
3. O arquivo de log é atualizado em tempo real durante o jogo
