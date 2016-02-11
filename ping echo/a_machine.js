var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
var lasttime , curr_time;
var predefinedTime = 3000;

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    var date = new Date();
    lasttime = date.getTime();
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('Oops, It seems that the connection to the daemon has been lost.');
    });
    connection.on('message', function(message) {
        curr_time = (new Date()).getTime();
        if(curr_time - lasttime < predefinedTime){
            console.log("Yay, machine b is running in good condition !!");
        }
        lasttime = curr_time;
    });
    
    function ping_to_machine_b() {
        if (connection.connected) {
            connection.sendUTF('Sending the data ....');
            setTimeout(ping_to_machine_b, 1000);
            curr_time = (new Date()).getTime();
            if(curr_time - lasttime > predefinedTime){
                console.log('Machine b is faulty');
            }
        }
    }
    ping_to_machine_b();
});
 
client.connect('ws://172.16.133.128:8080/', 'echo-protocol');