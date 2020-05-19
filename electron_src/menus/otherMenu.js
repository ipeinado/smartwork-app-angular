const config = require('../config/app.config');

module.exports = (app, mainWindow, i18n) => {
  let menu = [
    // { role: 'SmartWork services' }
    {
      label: i18n.t('Services'),
      submenu: [
        {
          label: i18n.t('Dashboard'),
          click: () => console.log('Dashboard')
        },
        {
          label: 'HealthyMe',
          click: () => console.log('HealthyMe')
        },
        {
          label: 'DigiTeam',
          click: () => console.log('DigiTeam')
        }
      ]
    },
    // { role: 'editMenu' }
    {
      label: i18n.t('Edit'),
      submenu: [
        {
          label: i18n.t('Undo'),
          role: 'undo'
        },
        {
          label: i18n.t('Redo'),
          role: 'redo'
        },
        { type: 'separator' },
        {
          label: i18n.t('Cut'),
          role: 'cut'
        },
        {
          label: i18n.t('Copy'),
          role: 'copy'
        },
        {
          label: i18n.t('Paste'),
          role: 'paste'
        },
        {
          label: i18n.t('Delete'),
          role: 'delete'
        },
        { type: 'separator' },
        {
          label: i18n.t('Select All'),
          role: 'selectAll'
        }
      ]
    },
    // { role: 'viewMenu' }
    {
      label: i18n.t('View'),
      submenu: [
        { 
          label: i18n.t('Reload'),
          role: 'reload' 
        },
        { 
          label: i18n.t('Force Reload'),
          role: 'forcereload' 
        },
        { 
          label: i18n.t('Toggle Developer Tools'),
          role: 'toggledevtools' 
        },
        { type: 'separator' },
        {
          label: i18n.t('Actual Size'), 
          role: 'resetzoom' 
        },
        { 
          label: i18n.t('Zoom In'),
          role: 'zoomin' 
        },
        { 
          label: i18n.t('Zoom Out'),
          role: 'zoomout' 
        },
        { type: 'separator' },
        {
          label: i18n.t('Toggle Full Screen'), 
          role: 'togglefullscreen' 
        }
      ]
    },
    {
      label: i18n.t('Window'),
      submenu: [
        { 
          label: i18n.t('Minimize'),
          role: 'minimize' 
        },
        { 
          label: i18n.t('Zoom'),
          role: 'zoom' 
        },
        { type: 'separator' },
        { 
          label: i18n.t('Close'),
          role: 'close' 
        }
      ]
    },
    {
      label: i18n.t('Help'),
      role: 'help',
      submenu: [
        {
          label: i18n.t('Learn More'),
          click: async() => {
            const { shell } = require('electron');
            await shell.openExternal('http://smartworkproject.eu')
          }
        }
      ]
    }
  ];

  const languageMenu = config.languages.map((languageCode) => {
    return {
      label: i18n.t(languageCode),
      type: 'radio',
      checked: i18n.language === languageCode,
      click: () => {
        i18n.changeLanguage(languageCode);
      }
    }
  });

  menu.push(
    {
      label: i18n.t('Change Language'),
      submenu: languageMenu
    }
  )

  return menu;
}; 