"use strict";
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const clientPath = `${__dirname}/../client`;
const fs = require('fs');
app.use(express.static(clientPath));
let PORT = process.env.PORT || 3100;
const server = http.createServer(app)
const io = socketio(server);
let user_list = {}


io.on('connection', (sock) => {
    sock.on('public', (user, cod, id) => {
        user_list[cod] = [];
        let u = {}
        let u_app = [user, sock]
        u[id] = u_app
        user_list[cod].push(u);
        let user_value = ""
        let s = "<div class='user_list'>" + user_list[cod][0][id][0] + "</div>"
        user_value = user_value + s
        sock.emit("user_list", user_value,user_list[cod].length)
    });
    sock.on('private', (user, cod, id) => {
        let b = false;
        for (let i = 0; i < user_list[cod].length; i++) {
            for (const [key, value] of Object.entries(user_list[cod][i])) {
                if (parseInt(key) === parseInt(id)) {
                    b = true;
                }
            }
        }
        if (b === false) {
            let u = {}
            let u_app = [user, sock]
            u[id] = u_app
            user_list[cod].push(u);
        }
        let user_value = []
        for (let i = 0; i < user_list[cod].length; i++) {
            for (const [key, value] of Object.entries(user_list[cod][i])) {
                let s = "<div class='user_list'>" + value[0] + "</div>"
                user_value = user_value + s
            }
        }
        for (let i = 0; i < user_list[cod].length; i++) {
            for (const [key, value] of Object.entries(user_list[cod][i])) {
                value[1].emit("user_list", user_value,user_list[cod].length)
            }
        }
    });
    sock.on('start', (cod, carte) => {
        console.log(carte)
        for (let i = 0; i < user_list[cod].length; i++) {
            for (const [key, value] of Object.entries(user_list[cod][i])) {
                let random = Math.floor(Math.random() * (carte.length));
                value[1].emit("card", carte[random]);
                carte.splice(random,1);
            }
        }
    });
});

server.on('error', (err) => {
    console.error('Server error:', err);
});

server.listen(PORT, () => {
    console.log('RPS started on port ' + PORT);
});