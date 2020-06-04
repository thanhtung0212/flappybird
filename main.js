// 1. import các đối tượng của electron
const { app, BrowserWindow, Menu, ipcMain } = require("electron");

// 2. tạo một tham chiếu đến đối tượng cửa sổ
let index, wingame;
// create window
function createWinGame() {
  wingame = new BrowserWindow({
    width: 1000,
    height: 800,
    title: "Add new window",
    icon: __dirname + "/assets/icons/mac/icons.icns",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  wingame.loadURL(`file://${__dirname}/game.html`);
  wingame.openDevTools();
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}
// create win game
function createWin() {
  index = new BrowserWindow({
    width: 500,
    height: 500,
    title: "Welcome game Flappy bird",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  index.openDevTools();
  index.loadURL(`file://${__dirname}/index.html`);
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
}
// 3. chờ đến khi ứng dụng bắt đầu
app.on("ready", createWinGame, createWin);

const menuTemplate = [
  // {label:''},
  {
    label: "File",
    submenu: [
      {
        label: "Add Item",
        accelerator: "Command+N",
        click() {
          createWin();
        },
      },
      { label: "Clear Items" },
      {
        label: "Quit",
        accelerator: "Command+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];
if (process.platform === "darwin") {
  menuTemplate.unshift({ label: "" });
}

app.on("activate", function () {
  /* Trên OS X, việc tạo lại một cửa sổ trong ứng dụng thì phổ biến
  khi biểu tượng dock được nhấp và không có cửa sổ nào khác mở. */
  if (mainWindow === null) {
    createWin();
  }
});
ipcMain.on("name:add", (e, name) => {
  console.log("name: ", name);
  wingame.webContents.send("name", name);
  index.close();
});
