const express= require('express')
const socketio= require('socket.io')
const {Messages,db}= require('./db')

const SERVER_PORT= process.env.PORT || 3000

//express server 
const app= express()
app.use(express.static(__dirname+'/public'))

var server= app.listen(SERVER_PORT, ()=>{console.log("server started on 192.168.1.9:3000 or http://localhost:3000")})

//socket server
const io= socketio(server)

io.on('connection',function (socket) {
    console.log('made socket connection with'+ socket.id)
    
    socket.on('sendmsg',async function (data) {
        
        try {
            const message= await Messages.create({
                socketid: socket.id,
                name: data.handle,
                message: data.message
            })

            io.sockets.emit('rcvmsg',data)
            console.log(message)
            // console.log(data)
            // console.log(socket.id)
        } catch (err) {
            console.log(err)
        }
        
    })
    socket.on('typing',function (data) {
        socket.broadcast.emit('typing',data) 
    })
})
