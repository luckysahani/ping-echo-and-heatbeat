var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
var lasttime , curr_time;
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
        curr_time = (new Date()).getTime();
        if(curr_time - lasttime < predefinedTime){
            console.log('Received Message: ' + message.utf8Data);
            console.log("Still alive !!!\n");
            lasttime = curr_time;
        }
        else{
            console.log("Didn't got the heartbeat within pre-defined time .... Fault detected o.O");
        }
    });
});
 
client.connect('ws://172.16.133.128:8080/', 'echo-protocol');