const Menu = require('electron').Menu;
const i18n = require('../config/i18next.config');

const darwinTemplate = require('../menus/darwinMenu');
const otherTemplate = require('../menus/otherMenu');

const menu = null;
const platform = process.platform;

function MenuFactoryService(menu) {
	this.menu = menu;
  this.buildMenu = buildMenu;
}

function buildMenu(app, mainWindow, i18n) {
  if (platform === 'darwin') {
    this.menu = Menu.buildFromTemplate(darwinTemplate(app, mainWindow, i18n));
    Menu.setApplicationMenu(this.menu);
  } else {
    this.menu = Menu.buildFromTemplate(otherTemplate(app, mainWindow, i18n));
    mainWindow.setMenu(this.menu);
  }
}

module.exports = new MenuFactoryService(menu);