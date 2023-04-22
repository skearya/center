const windowStateManager = require('electron-window-state')
const { app, BrowserWindow, ipcMain } = require('electron')
const contextMenu = require('electron-context-menu')
const serve = require('electron-serve')
const path = require('path')
const spotify = require('spotify-node-applescript')

try {
	require('electron-reloader')(module)
} catch (e) {
	console.error(e)
}

const serveURL = serve({ directory: '.' })
const port = process.env.PORT || 5173
const dev = !app.isPackaged
let mainWindow

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 1000,
		defaultHeight: 1400,
	})

	const mainWindow = new BrowserWindow({
		backgroundColor: '#0F1014',
		titleBarStyle: 'hidden',
		autoHideMenuBar: true,
		minHeight: 450,
		minWidth: 500,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: true,
			preload: path.join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
	})

	windowState.manage(mainWindow)

	mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		mainWindow.focus()
	})

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow)
	})

	return mainWindow
}

contextMenu()

function loadVite() {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e)
		setTimeout(() => {
			loadVite()
		}, 200)
	})
}

function createMainWindow() {
	mainWindow = createWindow()
	mainWindow.once('close', () => {
		mainWindow = null
	})

	if (dev) loadVite()
	else serveURL(mainWindow)
}

app.once('ready', createMainWindow)
app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow()
	}
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('song', () => {
	spotify.getTrack((err, track) => {
		if (err) return mainWindow.webContents.send('err', err)
		return mainWindow.webContents.send('track', track)
	})
})

ipcMain.on('state', () => {
	spotify.getState((err, state) => {
		if (err) return mainWindow.webContents.send('err', err)
		return mainWindow.webContents.send('state', state)
	})
})

ipcMain.on('previous', () => {
	spotify.previous()
})

ipcMain.on('playPause', () => {
	spotify.playPause()
})

ipcMain.on('next', () => {
	spotify.next()
})
