const electron = require('electron')
const {app, BrowserWindow, Menu} = electron
const path = require('path')
const url = require('url')

// Template for the Menu 
menuTemplate = [
  {
    label: 'Home',
    submenu: [
      {
        label: 'About',
        click: () => {
          openAboutWindow()
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {role: 'undo'},
      {role: 'redo'},
      {type: 'separator'},
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      //{role: 'forcereload'},
      //{role: 'toggledevtools'},
      {type: 'separator'},
      {role: 'resetzoom'},
      {role: 'zoomin'},
      {role: 'zoomout'},
      {type: 'separator'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
      label: 'About Developer',
        click: () => {
          openAboutWindow()
        }
      },
      {
        label: 'About Application',
          click: () => {
            openAppWindow()
          }
        },
      {type: 'separator'},
      {
        label: 'About Framework',
        click () { require('electron').shell.openExternal('https://electronjs.org') }
      }
    ]
  }
]

// Keep a global reference so the garbage collector does not destroy our app
let mainWindow

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    //maxWidth: 1000,
    //maxHeight: 600,
    minWidth:1000,
    minHeight:600,
    icon: path.join(__dirname, 'img/icon/icon.png')
  })

  // Load the index.html file
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'login.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Set up the menu
  var menu = Menu.buildFromTemplate(menuTemplate)
  mainWindow.setMenu(menu)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Opens the about window
function openAboutWindow() {

  let aboutWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 600,
    height: 350,
    maxWidth: 600,
    maxHeight: 350,
    minWidth: 600,
    minHeight: 350,
    icon: path.join(__dirname, 'img/icon/icon.png')
  })
  aboutWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'about.html'),
    protocol: 'file:',
    slashes: true
  }))
  aboutWindow.setMenu(null)
  aboutWindow.once('ready-to-show', () => {
    aboutWindow.show()
  })
}

// Create the window then the app is ready
app.on('ready', () => {
  createWindow()
  electron.powerMonitor.on('on-ac', () => {
    mainWindow.restore()
  })
  electron.powerMonitor.on('on-battery', () => {
    mainWindow.minimize()
  })
})

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Reopen the app on macOS
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function openAppWindow() {

  let appWindow = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    show: false,
    width: 800,
    height: 520,
    maxWidth: 800,
    maxHeight: 520,
    minWidth: 800,
    minHeight: 520,
    icon: path.join(__dirname, 'img/icon/icon.png')
  })
  appWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'aboutApp.html'),
    protocol: 'file:',
    slashes: true
  }))
  appWindow.setMenu(null)
  appWindow.once('ready-to-show', () => {
    appWindow.show()
  })
}