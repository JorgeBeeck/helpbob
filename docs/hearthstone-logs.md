# 📜 Documentação dos Logs do Hearthstone

## 📂 Localização dos Logs
Por padrão, o Hearthstone armazena seus logs em:
- Windows: `%LOCALAPPDATA%\Blizzard\Hearthstone\Logs\`
- macOS: `~/Library/Logs/Blizzard/Hearthstone/`
- Linux: `~/.local/share/Blizzard/Hearthstone/Logs/`

## 🗃️ Arquivos de Log Principais

### 1. Power.log
**Localização**: `[pasta_logs]/Power.log`
**Descrição**: Contém informações sobre o estado do jogo e ações
**Eventos importantes**:
- Cartas jogadas
- Dano causado/recebido
- Efeitos ativados
- Mudanças de turno

Exemplo de entrada:
```log
D 19:23:45.8989320 GameState.DebugPrintPower() -     TAG_CHANGE Entity=GameEntity tag=TURN value=1
D 19:23:45.9001570 GameState.DebugPrintPower() - FULL_ENTITY - Создание GameEntity=1 CardID=
```

### 2. LoadingScreen.log
**Localização**: `[pasta_logs]/LoadingScreen.log`
**Descrição**: Indica quando uma partida começa/termina
**Eventos importantes**:
- Início de partida
- Fim de partida
- Transições de tela

### 3. Net.log
**Localização**: `[pasta_logs]/Net.log`
**Descrição**: Informações sobre conexão com os servidores
**Utilidade**: Verificar se o jogo está conectado

### 4. Arena.log
**Localização**: `[pasta_logs]/Arena.log`
**Descrição**: Informações específicas do modo Arena
**Eventos importantes**:
- Escolhas de cartas
- Resultados de partidas

## 🔄 Como o Sistema de Logs Funciona

1. **Ativação dos Logs**
   Para detalhes completos sobre a configuração e exemplos de uso, consulte nossa [documentação detalhada](hearthstone-logs-detalhado.md).
   
   Configuração básica (`log.config`):
   ```config
   [Power]
   LogLevel=1
   FilePrinting=true
   ConsolePrinting=true
   ScreenPrinting=false

   [Zone]
   LogLevel=1
   FilePrinting=true
   ConsolePrinting=true
   ScreenPrinting=false
   ```

2. **Ciclo de Vida dos Logs**
   - Logs são criados quando o Hearthstone inicia
   - São atualizados em tempo real durante o jogo
   - Cada sessão cria novos arquivos ou adiciona ao existente
   - Rotação de logs após certo tamanho

## 📊 Estrutura das Entradas de Log

### Power.log Format
```
D [Timestamp] [Component] - [Action] [Details]
```
Onde:
- D: Debug level
- Timestamp: Hora exata do evento
- Component: Parte do jogo gerando o log
- Action: Tipo de ação ocorrendo
- Details: Informações específicas

### Eventos Importantes para Tracking

1. **Início de Jogo**
```log
D [Timestamp] GameState.DebugPrintPower() - CREATE_GAME
```

2. **Jogada de Carta**
```log
D [Timestamp] GameState.DebugPrintPower() - FULL_ENTITY - Creating [CardID]
```

3. **Mudança de Turno**
```log
D [Timestamp] GameState.DebugPrintPower() - TAG_CHANGE Entity=GameEntity tag=TURN
```

## 🔍 Como Monitorar

1. **File System Watcher**
   - Monitorar alterações na pasta de logs
   - Usar eventos de modificação de arquivo
   - Implementar buffer para evitar sobrecarga

2. **Parser Recomendado**
   - Usar Regex para parsing inicial
   - Manter estado em memória
   - Usar sistema de eventos para notificar mudanças

3. **Estrutura de Dados Sugerida**
```typescript
interface GameEvent {
  timestamp: Date;
  type: EventType;
  data: any;
  rawLog: string;
}

enum EventType {
  GAME_START,
  CARD_PLAYED,
  TURN_CHANGE,
  DAMAGE_DEALT,
  GAME_END
}
```

## ⚠️ Considerações Importantes

1. **Performance**
   - Logs podem crescer rapidamente
   - Implementar sistema de rotação de buffer
   - Limitar histórico em memória

2. **Resiliência**
   - Tratar casos de arquivo bloqueado
   - Lidar com logs corrompidos
   - Recuperar de crashes

3. **Precisão**
   - Validar timestamps
   - Confirmar sequência de eventos
   - Manter estado consistente

## 🔄 Próximos Passos

1. Implementar FileSystemWatcher básico
2. Criar parser para Power.log
3. Desenvolver sistema de eventos
4. Integrar com interface do overlay

## 🚫 Limitações Conhecidas

1. Logs podem estar desativados
2. Atraso entre ação e log
3. Formato pode mudar com atualizações
4. Alguns eventos podem não ser logados
