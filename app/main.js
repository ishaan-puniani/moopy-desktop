var AutoLaunch = require('auto-launch');
 
var minecraftAutoLauncher = new AutoLaunch({
	 name: 'Moopy'
});
 
minecraftAutoLauncher.enable();
 
//minecraftAutoLauncher.disable(); 
 
 
minecraftAutoLauncher.isEnabled()
.then(function(isEnabled){
    if(isEnabled){
        return;
    }
    minecraftAutoLauncher.enable();
})
.catch(function(err){
    // handle error 
});






var menubar = require('menubar');
var http = require('http');
var path = require('path');
var child_process = require('child_process');
var machineName = child_process.execSync('cmd.exe /c "echo %username%');
var options = {
    host: 'localhost',
    port: "9090",
    path: '/api/getNotificationUpdate'
};


var mb = menubar({dir: __dirname,index : 'file://' + path.join(__dirname, 'index.html')+"?"+ machineName.toString(), preloadWindow: true, width: 400, height: 130, tooltip: "hello"})

mb.on('ready', function ready() {
    /*setInterval(function () {
        getNotification(function (res) {
            console.log(res);
            res = JSON.parse(res);
            if (res.success) {
                mb.window.show();
            }
        })
    }, 10 * 1000)*/
});

mb.on('after-create-window', function () {
    console.log(machineName.toString());

    // mb.window.openDevTools()
})

mb.on('after-show', function () {
    console.log(machineName.toString());


    // mb.window.openDevTools()
});


function getNotification(cb) {
    var req = http.get(options, function (res) {
       // console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));

        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        res.on('data', function (chunk) {
            bodyChunks.push(chunk);
        }).on('end', function () {
            var body = Buffer.concat(bodyChunks);
            cb(body.toString());
        })
    });

    req.on('error', function (e) {
        console.log('ERROR: ' + e.message);
        cb(e.message)
    });
}