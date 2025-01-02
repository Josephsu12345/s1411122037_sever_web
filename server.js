//install: node js
//install web server package: express >npm install express
var express = require("express");
var server = express();
var bodyParser = require("body-parser");
var path = require("path");

//web root
server.use(express.static(__dirname));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var fileUpload = require("express-fileupload");
server.use(fileUpload({defCharset:'utf8', defParamCharset:'utf8'}));


var DB = require("nedb-promises");
var ProfolioDB = DB.create(__dirname+"/profolio.db");
var ContactDB = DB.create(__dirname+"/contact.db");
 

 /*ProfolioDB.insert([
    { modal: "card1", imgSrc: "worpage/house_白模.jpg", link:"3D d.html" ,title:"Japanese street", text: "Graphic Design" },
    { modal: "card2", imgSrc: "worpage/mclaren-2.jpg", link:"3D d.html" ,title:"Mclaren720s", text: "Graphic Design" },
    { modal: "card3", imgSrc: "worpage/素描.jpg", link:"Graphic design.html" ,title:"Arthur Fleck / Dwayne Johnson ", text: "Graphic Design" },
    { modal: "card4", imgSrc: "worpage/基設色彩調和_2-19201080.jpg", link:"Graphic design.html" ,title:"Graphic Design", text: "Graphic Design" },
 ])*/

server.get("/services", (req, res)=>{
    //DB find
    var Services=[
        {icon: "fa-shopping-cart", heading:"E-Commerce", text:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."},
        {icon: "fa-laptop", heading:"Responsive Design", text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit."}
    ];
    res.send(Services);
});

server.get("/profolio", (req,res)=>{
      //DB
      ProfolioDB.find({}).then(results=>{
        if(results != null){
             res.send(results);
        }else{
            res.send("Error!");
        }
      })
})

server.post("/contact_me", (req,res)=>{
     ContactDB.insert(req.body);
     res.redirect("/#contact");
})

server.listen(4006, ()=>{
    console.log("Server is running at port 4006.");
})
server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/main web.html'));
  });
  