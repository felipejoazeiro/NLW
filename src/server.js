const express = require("express")
const server = express()

//Pegar o BD.
const db = require('./database/db')

//configurar pasta pública
server.use(express.static('public'))


//Habilitar o uso do req.body, na aplicação:
server.use(express.urlencoded({extended:true}))

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
    console.log(req.query);

    return res.render("create-point.html")
})

server.post("/savepoint",(req,res)=>{

    // req.body: O corpo do nosso formulário.
    console.log(req.body);

    const query = `
    INSERT INTO places(
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?)
`
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("Cadastrado com sucesso");
        console.log(this)
        return res.render("create-point.html", {saved:true})

    }
    db.run(query, values, afterInsertData)
    
})

server.get("/search", (req,res) => {
    const search = req.query.search;

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html",{total:0})
    }
    //Pegar os dados do Banco de Dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'` , function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length;
        return res.render("search-results.html" ,{places:rows, total:total})
    })
})


//ligar o servidor
server.listen(3000)