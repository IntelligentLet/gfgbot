const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Your bot is alive!')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log("express server ready")});
}
module.exports = keepAlive;