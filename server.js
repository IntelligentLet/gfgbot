const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Your bot is alive!');
})
function keepAlive(){
    server.listen(process.env.PORT || 5000);
}
module.exports = keepAlive;
