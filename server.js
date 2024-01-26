const express = require("express");
const databaseConnect = require("./database");
const { db } = require("./db");
const taskRoutes = require('./routes/route')

const app = express();

require('dotenv').config();

app.use(express.json());

app.use('/', taskRoutes);

databaseConnect();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


