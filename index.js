const {app} = require('electron')
const {BrowserWindow} = require('electron')

app.on('ready', function() {
  var mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
  //  resizable: false,
    title: 'MOB - Search Tool For Http',
    icon: __dirname + '/icon.ico'
  })
  //mainWindow.setMenu(null);
  mainWindow.loadURL('file://' + __dirname + '/app/index.html')
})
