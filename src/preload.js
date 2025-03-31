const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  fetchTranscript: (videoId) => ipcRenderer.invoke('fetch-transcript', videoId),
});