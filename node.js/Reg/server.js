const express = require(`express`)
const path = require(`path`)
const app = express()
const jsonRouter = require(`./routers/router.js`)

const PORT = 8080

app.use(express.static(`scr`))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get(`/`, (req,res)=>{
    res.sendFile(path.join(__dirname+`/src/index.html`))
})

app.use(`/json`, jsonRouter)

app.use(function(req,res){
    res.status(404).sendFile(__dirname+`/src/error.html`)
})

app.listen(PORT, ()=>console.log(`Server has been started of PORT:${PORT}`))