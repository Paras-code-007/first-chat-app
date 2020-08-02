let output= document.getElementById('output')
let handle= document.getElementById('handle')
let send= document.getElementById('send')
let message= document.getElementById('message')
let feedback= document.getElementById('feedback')

// const socket= io.connect('http://localhost:3000') //in mobile will mkae connection to localhost 
// const socket= io.connect('192.168.1.9:3000') //domain name and 
const socket= io.connect('https://anonymouschatter.herokuapp.com/') //domain name and 

function sendMessage() {
    socket.emit('sendmsg',{message: message.value, handle: handle.value})
    message.value=""
}

send.onclick= sendMessage

message.onkeydown= function (event) {
    // console.log("hello world")
    // console.log(event)
    if(event.keyCode===13){
        return sendMessage()
    }
    socket.emit('typing',handle.value)
}

socket.on('rcvmsg',function (data) {
    let element= document.createElement('p')
    let handleele= document.createElement('strong')
    handleele.innerText= data.handle+ ': '
    element.appendChild(handleele)
    element.append(data.message)
    output.appendChild(element)
    feedback.innerHTML= ""
})

socket.on('typing',function (data) {
    feedback.innerHTML= '<p><em>'+data+' is typing a message...</em></p>'
})