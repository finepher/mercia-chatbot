const product = []
const express = require('express');
const cors = require('cors');



const {Server} = require("socket.io")

const socket = new Server(3001,{
    cors: "*"
})

socket.on("connection", (socketConnection) => {
    console.log("connected")

    socketConnection.on("chat_message", function(data){
        console.log(data, "<<message received")
    })

    const date = new Date()
   setInterval(function(){
     socketConnection.emit("chat_message", "hello there, message from server " + (date.toLocaleDateString()))
   },1000)
    
})


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/message', (req, res) => {
    res.setHeader("content-type", "text/hl");
    res.send('Hello World rom GET');
})
app.post('/message', (req, res) => {
    req.body
    res.send('Hello World form POST');
})

app.listen(PORT, () => {
    console.log(`✅ server running on port ${PORT}`);
})

