'use strict';

const path = require('path');
const url = require('url');
const electron = require('electron');


function getScreenSize() {
  const { screen } = require('electron')
  return screen.getPrimaryDisplay().workAreaSize;
}

const app = electron.app;
  const BrowserWindow = electron.BrowserWindow;

  let mainWindow;

  function createWindow() {
    const screenSize = getScreenSize();
    const options = {
      webPreferences: {
        nodeIntegration: false,
      },
      width: screenSize.width,
      height: screenSize.height,
    };

    mainWindow = new BrowserWindow(options);
    mainWindow.loadURL(`file://${path.join(__dirname, '..', 'vendor', 'swagger-editor', 'index.html')}`);
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }

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