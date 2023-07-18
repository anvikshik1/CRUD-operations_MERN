const express = require('express');
const app = express();
const connectDB = require('./connect');
const router = require('./routes/userRoute');
const cors = require('cors')

app.use(cors());
require('dotenv').config()

app.use(express.json());
app.use(router);

connectDB(process.env.URI || 8000).then(() =>{
    app.listen(process.env.PORT,console.log(`server is listening on port ${process.env.PORT}`))
}).catch((err) => {
    console.log(err);
})



