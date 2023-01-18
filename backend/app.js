const setUpDB  = require('./db/db_setup');
const express = require('express');
const cors = require('cors')
require('dotenv').config()
const app = express();
app.use(cors())
setUpDB()
app.use(express.json());

app.listen(5000, ()=>console.log('listening to port 5000'))

app.use('/user',require('./routes/userRoutes'))

