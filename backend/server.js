const express = require('express');
const app = express();
const mongoose = require('mongoose');

port = 3000;

app.get("/",(req,res)=>{
    res.send("api is running");
});

app.listen(port,console.log(`server is listening on port ${port}`))