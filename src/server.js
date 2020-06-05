const express = require("express")
const server = express()


//configurar pasta pública
server.use(express.static('public'))

//Instalar o nunjucks para melhorar a usuabilidade do html
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



server.get("/", (req,res) => {
    return res.render("index.html" ,{title: "Um titulo qualquer"})
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.get("/search", (req,res) => {
    return res.render("search-results.html")
})


//ligar o servidor
server.listen(3000)