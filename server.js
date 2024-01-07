const express = require("express");
const app = express();
const cors = require("cors");
require ("dotenv").config()

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.listen(PORT || 3000, () => {
    console.log('The server is running.')
})