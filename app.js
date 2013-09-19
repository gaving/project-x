// Generated by CoffeeScript 1.3.3
(function() {
  var app, connections, events, express, fs, http, io, path, redis, server, _;

  express = require("express");

  http = require("http");

  path = require("path");

  redis = require("redis");

  fs = require("fs");

  _ = require('underscore');

  events = [];

  app = express();

  app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.favicon());
    app.use(express.logger("dev"));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    return app.use(express["static"](path.join(__dirname, "public")));
  });

  app.configure("development", function() {
    return app.use(express.errorHandler());
  });

  app.get("/events", function(req, res) {
    return res.send(events);
  });

  server = http.createServer(app);

  io = require("socket.io").listen(server);

  server.listen(process.env.PORT || 8080);

  connections = {};

  io.configure("production", function() {
    io.enable("browser client etag");
    return io.set("log level", 1);
  });

  io.sockets.on("connection", function(socket) {
    setInterval(function() {
      return fs.readFile("coords.txt", 'utf8', function(err, data) {
        var coords, num;
        if (err) {
          throw err;
        }
        coords = data.toString().split("\n");
        num = Math.floor(Math.random() * coords.length) + 1;
        console.log(coords[num]);
        return socket.send(coords[num]);
      });
    }, 1000);
    return socket.on("disconnect", function() {
      return socket.broadcast.emit("disconnect", {
        id: socket.id
      });
    });
  });

}).call(this);