'use strict';
const electron = require('electron');
const app = electron.app;
let mainWindow;

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 400,
		height: 400,
		top: 0,
		left: 0,
		transparent: true,
		frame: false,
		alwaysOnTop: true
	});

	win.setIgnoreMouseEvents(true);
	win.maximize();
	win.loadURL(`file://${__dirname}/index.html`);

	win.on('closed', () => {
		mainWindow = null;
	});
	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
});
