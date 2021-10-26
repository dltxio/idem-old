import express = require('express');
const webSocketServer = require('websocket').server;
const https = require('https');
const http = require('http');
const fs = require('fs');

export default class WebSocketService implements webSocketService.WebSocketService {
  private clients: Map<string, any>;
  private wsServer: any;

  constructor(private config: Config["webSocket"]) {
    var server;
    try {
      const privateKey = fs.readFileSync(config.privateKey, 'utf8');
      const certificate = fs.readFileSync(config.certificate, 'utf8');
      const credentials = { key: privateKey, cert: certificate };
      server = https.createServer(credentials);
    } catch (e) {
      server = http.createServer();
    }

    // This code generates unique userid for everyuser.
    const getUniqueID = () => {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return s4() + s4() + '-' + s4();
    };

  
    // Spinning the http server and the websocket server.
    server.listen(config.wsPort);
    this.wsServer = new webSocketServer({
      httpServer: server
    });
    this.clients = new Map;

    this.wsServer.on('request', (request: { origin: string; accept: (arg0: null, arg1: any) => any; }) => {
      var userID = getUniqueID();
      const connection = request.accept(null, request.origin);
      this.clients.set(userID, connection);
      connection.sendUTF("connected");
      
      console.log(this.clients.keys());
      connection.on('message', function(msg: any) {
        console.log(msg);
      })
    });
  
    this.wsServer.on('message', function(request: any) {
      console.log(request);
    });
  }

  public verifyAllUsers = (id: string) => {
    this.clients.forEach((client) => {
      client.sendUTF(JSON.stringify({email: "user@idem.com", name: "Mr Idem User", DoB: "25th December, 1984"}));
    });
  }
}