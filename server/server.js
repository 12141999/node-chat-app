const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname + '../public');
let app = express();
app.use(express.static(publicPath));

const port = process.env.PORT || 3000 ;

app.listen(port , () => {
    console.log('server is started');
});