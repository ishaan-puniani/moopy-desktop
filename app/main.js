var host = "http://trackmypeople.coderower.com";
var request = require('request');

var AutoLaunch = require('auto-launch');
var minecraftAutoLauncher = new AutoLaunch({
    name: 'Moopy'
});

minecraftAutoLauncher.enable();

minecraftAutoLauncher.isEnabled()
    .then(function (isEnabled) {
        if (isEnabled) {
            return;
        }
        minecraftAutoLauncher.enable();
    })
    .catch(function (err) {
        // handle error
    });


var menuBar = require('menubar');
var http = require('http');
var path = require('path');
var username = require('username');
var machineName = username.sync();
var electron = require('electron')

var mb = menuBar({
    dir: __dirname,
    index: 'file://' + path.join(__dirname, 'index.html') + "?name=" + machineName,
    preloadWindow: true,
    width: 400,
    height: 130,
    tooltip: "Moopy",
    showDockIcon: true,
    fullscreenable: false,
    show_in_taskbar: false,
    windowPosition: "center",
    resizable: false//,
    //icon: __dirname + '/IconTemplate.png'
});

mb.on('ready', function ready() {
    setInterval(function () {
        request(host + "/api/notifications/" + machineName, function (error, response, body) {
            try {
                var res = JSON.parse(body);
                if (res.success) {
                    mb.window.show();
                }
            } catch (ex) {
            }
        })
    }, 10 * 1000)
});

mb.on('after-create-window', function () {
    console.log(machineName.toString());
})

mb.on('after-show', function () {
    console.log(machineName.toString());
});
