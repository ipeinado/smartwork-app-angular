const { app, BrowserWindow, screen } = require('electron');

const path = require('path');
const url = require('url');

let mainWindow;

const args = process.argv.slice(1);
const serve = args.some(val => val === '--serve');

function createWindow() {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    minWidth: 960,
    minHeight: 600,
    icon: path.join(__dirname, `electron_src/assets/icons/png/icon_32x32@2x.png`)
  });

  if (serve) {
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL('http://localhost:4200');
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/smartwork-app-angular/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

try {
  app.allowRendererProcessReuse = true;

  app.on('ready', createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch error
  // Throw e
}