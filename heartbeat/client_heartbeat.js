var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
var lasttime;
var predefinedTime = 3000;
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    var date = new Date();
    lasttime = date.getTime();
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('Oops, It seems that the connection to the daemon has been lost.');
    });
    connection.on('message', function(message) {
        var date = new Date();
        var curr_time = date.getTime();
        if(curr_time-lasttime<=3000){
            if (message.type === 'utf8') {
                console.log(message);
            }
            lasttime=curr_time;
        }
        else{
            console.log('server faulty');
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});
 
client.connect('ws://localhost:8080/', 'echo-protocol');