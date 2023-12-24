const { ansiColor } = require('./consoleUtils');
const ClientUtils = require('./clientUtils');
const figlet = require('figlet');
const gradient = require('gradient-string');
const Logger = require('./Logger');

const clearStyle = ansiColor(0, 'sgr');
const underlineStyle = ansiColor(4, 'sgr');
const whiteColor = ansiColor(15, 'foreground');
const yellowColor = ansiColor(11, 'foreground');
const blueBrightColor = ansiColor(33, 'foreground');

const devName = figlet.textSync('Shinou', { font: 'ANSI Shadow' });

console.info(gradient.fruit(devName));
console.info(
    gradient.instagram('Current Version: ' + ClientUtils.getVersion()),
);

Logger.info(
    'Client',
    whiteColor +
        'Copyright (C) 2023 YoruAkio. All rights reserved.' +
        clearStyle,
);
Logger.info('Client', 'Website: https://airi.dev' + clearStyle + `\n`);

if (
    process.env.npm_lifecycle_event &&
    process.env.npm_lifecycle_event === 'dev'
) {
    console.info(
        yellowColor +
            '┏━━━━━━━━━━━━━━ DEVELOPMENT MODE ━━━━━━━━━━━━━━┓' +
            clearStyle,
    );
    console.info(
        yellowColor +
            '┃                                              ┃' +
            clearStyle,
    );
    console.info(
        yellowColor +
            '┃  When in development mode some features may  ┃' +
            clearStyle,
    );
    console.info(
        yellowColor +
            '┃     not work, you can restart your system    ┃' +
            clearStyle,
    );
    console.info(
        yellowColor +
            '┃   immediately by typing ' +
            underlineStyle +
            'rs' +
            clearStyle +
            yellowColor +
            ' on the terminal.  ┃' +
            clearStyle,
    );
    console.info(
        yellowColor +
            '┃                                              ┃' +
            clearStyle,
    );
    console.info(
        yellowColor +
            '┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n' +
            clearStyle,
    );
}
