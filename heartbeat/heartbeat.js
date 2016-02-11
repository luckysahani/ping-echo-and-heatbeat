var WebSocketServer = require('websocket').server;
var http = require('http');
var sleep = require('sleep');

var sleep_time=1000000;
var increment_factor = 500000; 
 
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
	console.log((new Date()) + ' Server is listening on port 8080');
});
 
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
 
wsServer.on('request', function(request) {
    var connection = request.accept('echo-protocol', request.origin);
        
    function send_heartbeat() {
        sleep.usleep(sleep_time);
        console.log('I am alive dude and this is my heartbeat:'+sleep_time.toString()+' microseconds');
        connection.sendUTF('I am alive dude and this is my heartbeat:'+sleep_time.toString()+' microseconds');
        sleep_time+=increment_factor
        send_heartbeat()
    }
    send_heartbeat()
    
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});