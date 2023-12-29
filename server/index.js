const express = require("express")
const cors = require("cors")
require("./db/conn");
const dotenv =require("dotenv")
const router = require("../server/routers/signup")

const app =express()
app.use(express.json())
app.use(cors())
dotenv.config()

app.use(router)

//set the port
const port = process.env.PORT || 5000


app.get('/', async (req, res) => {
    res.status(200).send("Hello from the Malahim Haseeb");
});

//Listening the app
app.listen(port, () => {
    console.log(`app is listening on http://localhost:${port}/`)
})