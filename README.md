Implemented two availability tactics for fault detection: 
------------------------------------------------------------------------------
1. ping-echo: Machine A continuously ping to machine B and machine B responds within predefined time. If machine A fails to get an echo from machine B, it reports the fault. 
==============================================================================
In my code a_machine(client) continously pings to b_machine(server) and the b_machine(server) responds within a predefined time of 3 seconds. if it fails to reply during the predefined time, a_machine(client) will give the fault. For checking the fault, I have used sleep which will make the reply late by few seconds. Then I will increment the sleep time by an incremental factor which when makes the sleep time greater than the predefined time will cause a fault.
 
2. heartbeat: A component periodically emits a heartbeat message, and another component listens to it. If the listening component does not find the heartbeat message within predefined time, it reports the fault. 
==============================================================================
In my code, server will continuously send the heartbeat to the listening component(client), and the client will compare the time difference between the new hearbeat and previous heartbeat. If the time difference is greater than the predefinedTime, then the listening component(client) will report the fault.


Implementation Details
------------------------------------------------------------------------------
Implemented the above using the websocket APi in nodejs. Websocket includes bothe the client and server functionality , which can be accessed through WebSocketClient and WebSocketServer. Once a connection is established, the data can be send through client and server. However, the API for sending the data is identical for both client and server. The ip of the server will automatically will be the ip of the machine. To connect from the server, the client has to use command client.connect( ip of the server with port).
The above is implemented on VmWare Virtual Machine(Ubuntu 14.04) and my own Ubuntu 14.04 machine.

WebSocketClient allows you to make client connections to a WebSocket server. WebSocketConnection is an instance of WebSocketConnection that can be used to send and receive messages with the remote server.

