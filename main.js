const { app, BrowserWindow } = require('electron')
const path = require('path')

console.log('Iniciando aplicação...')

function createWindow () {
  console.log('Criando janela...')
  const win = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    show: false  // Não mostrar até estar pronto
  })
  
  // Quando estiver pronto, mostre a janela
  win.once('ready-to-show', () => {
    win.show()
    console.log('Janela mostrada!')
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
