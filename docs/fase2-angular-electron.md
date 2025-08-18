# Integração Angular + Electron (18/08/2025)

## Estrutura implementada
```
helpbob/
├── src/
│   ├── angular/         # Aplicação Angular
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── overlay-window/    # Componente de teste
│   │   │   │   ├── app.ts             # Componente principal
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── ...
│   └── electron/       # Aplicação Electron
│       ├── main.js     # Processo principal
│       └── index.html  # Página inicial (backup)
└── package.json        # Scripts e dependências
```

## Configurações Implementadas

1. **Electron (main.js)**:
   - Configurado para carregar aplicação Angular do localhost:4200
   - Implementado sistema de logs para debugging
   - Configurada janela transparente base

2. **Angular**:
   - Criado projeto base com Angular CLI
   - Implementado componente de teste (overlay-window)
   - Configurado para modo standalone
   - Estilização básica implementada

3. **Scripts de Desenvolvimento (package.json)**:
   - `angular:serve`: Inicia o servidor de desenvolvimento Angular
   - `electron:serve`: Inicia a aplicação Electron
   - `dev`: Executa ambos em paralelo usando concurrently

## Dependências Adicionadas
- concurrently: Para executar múltiplos scripts
- wait-on: Para aguardar o servidor Angular iniciar

## Como Executar
```bash
npm run dev
```

## Próximos Passos
- Implementar sistema de build para produção
- Configurar comunicação IPC entre Angular e Electron
- Implementar leitura de logs do Hearthstone
