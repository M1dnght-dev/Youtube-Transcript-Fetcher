const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('node:path');
const { YoutubeTranscript } = require('youtube-transcript');
const { writeFile } = require('fs').promises;

let mainWindow;

const createWindow = () => {
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
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Function to fetch transcript
const fetchTranscript = async (videoId) => {
  if (!videoId) {
    throw new Error('Invalid video ID.');
  }
  const transcript = await YoutubeTranscript.fetchTranscript(videoId);
  return transcript.map(entry => entry.text).join(' ');
};

// Function to save transcript to a file
const saveTranscriptToFile = async (text, videoId) => {
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    title: 'Save Transcript',
    defaultPath: `${videoId}.txt`,
    filters: [{ name: 'Text Files', extensions: ['txt'] }],
  });

  if (canceled || !filePath) {
    throw new Error('Save operation was canceled.');
  }

  await writeFile(filePath, text, 'utf8');
  return filePath;
};

// IPC handler for fetching and saving transcript
ipcMain.handle('fetch-transcript', async (event, videoId) => {
  try {
    const text = await fetchTranscript(videoId);
    const filePath = await saveTranscriptToFile(text, videoId);
    return { success: true, filePath };
  } catch (error) {
    console.error('Error in fetch-transcript handler:', error);
    return { success: false, error: error.message };
  }
});
