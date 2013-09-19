express = require("express")
http = require("http")
path = require("path")
redis = require("redis")
fs = require("fs")
_ = require('underscore')

app = express()

# configure the http server
app.configure ->
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(path.join(__dirname, "public"))

# configure logging
app.configure "development", ->
  app.use express.errorHandler()

server = http.createServer(app)
io = require("socket.io").listen(server)
server.listen process.env.PORT or 8080

connections = {}
io.configure "production", ->
  io.enable "browser client etag"
  io.set "log level", 1

io.sockets.on "connection", (socket) ->
  setInterval ->
    fs.readFile "data/coords.txt", 'utf8', (err, data) ->
      throw err  if err
      coords = data.toString().split("\n")
      num = Math.floor(Math.random() * coords.length) + 1
      socket.send(coords[num])
  , 1000

  socket.on "disconnect", ->
    socket.broadcast.emit "disconnect", id: socket.id
