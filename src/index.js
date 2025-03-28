const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const { YoutubeTranscript } = require('youtube-transcript');
const { writeFileSync } = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  mainWindow.setMenuBarVisibility(false);
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// New code: ipcMain handler for fetching transcript
ipcMain.handle('fetch-transcript', async (event, videoId) => {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const text = transcript.map(entry => entry.text).join(' ');

    // Open a save dialog to let the user choose where to save the file
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      title: 'Save Transcript',
      defaultPath: `${videoId}.txt`,
      filters: [{ name: 'Text Files', extensions: ['txt'] }],
    });

    if (canceled) {
      return { success: false, error: 'Save operation was canceled.' };
    }

    // Write the transcript to the selected file path
    writeFileSync(filePath, text);
    return { success: true, filePath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
