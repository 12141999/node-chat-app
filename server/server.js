const express = require('express');
const path = require('path');
const ejs = require('ejs');

const publicPath = path.join(__dirname + '../public');
let app = express();
app.use(express.static(publicPath));
//app.set("view engine" , "ejs");

const port = process.env.PORT || 3000 ;

app.get("/" , (req,res) => {
    res.render("index.ejs");
});

app.listen(port , () => {
    console.log('server is started');
});