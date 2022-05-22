const express = require("Express")
const app = express()
const clientAPI = require("./server/routes/ClientAPI")
const path = require("path")

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname , "dist")))
app.use(express.static(path.join(__dirname , "node_modules")))
app.use("/", clientAPI)

const port = 3000
app.listen(port, function () { console.log(`App is listening on port: ${port}`) })

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/Weather")