const { response } = require('express')
const express = require('express')
const handlebars = require('express-handlebars')
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')



const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))



const messages = []
const prod = []


app.use(express.static('./public'))
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

/* Server Listen */
const PORT = process.env.PORT || 8080
const server = httpServer.listen(PORT , () => console.log(`servidor Levantado ${PORT}`))
server.on('error', (error) => console.log(`Error en servidor ${error}`))


io.on('connection', (socket) => {
  console.log('se conecto un usuario')
  
  socket.emit('mensajes', messages)
  socket.emit('productos', prod)

  socket.on('new-message',(data) => {
    messages.push(data);
    io.sockets.emit('messages', messages);
  })

  socket.on('new-prod',(data) => {
    prod.push(data);
    io.sockets.emit('prod', prod);
  })


})