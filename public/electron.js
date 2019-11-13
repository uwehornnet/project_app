const electron = require('electron');
const {app, BrowserWindow, dialog, systemPreferences, ipcMain} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
let mainWindow;

function initApp() {
	createMainWindow();
}


function createMainWindow() {
	const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

	mainWindow = new BrowserWindow({
		minWidth: 900,
		minHeight: 600,
		width: width,
		height: height,
		frame: false,
		titleBarStyle: 'hidden',
		webPreferences: {
			webSecurity: false,
			nodeIntegration: false,
			preload: __dirname + '/preload.js'
		}
	});
	mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './index.html')}`);
	mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', initApp);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		initApp();
	}
});

function openFile() {
	dialog.showOpenDialog(mainWindow, {
		properties: ['openFile'],
	}).then(result => {
		sendFilePath(result)
	}).catch(error => console.log(error));
}

function sendFilePath(file) {
	const fileContent = fs.readFileSync(file.filePaths[0]).toString();
	mainWindow.webContents.send('send-file', fileContent);
}

ipcMain.on('open-dialog', () => {
	openFile()
});