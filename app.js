const express = require('express');
const path = require("path");
const app = express();
let port = '8080';
app.listen(port,function(){
    console.log(`app is listeninng at port${port}`);
})
app.get("/",(req,res)=>{
    // console.log(req.hostname)
    // console.log(req.method)
    // console.log(req.path)
    res.send('<h1>this is h1</h1>')
});
let obj= {
    'name':'adarsh'
}
app.get("/user",(req,res)=>{
    res.json(obj);
})

// path = path of html file

app.get("/home",(req,res)=>{
    // res.sendFile("C:\\Users\\LENOVO_PC\\Desktop\\PEPcoding  Dev\\Backend\\foodApp\\index.html")
    console.log(__dirname);
    // res.send('./index.html',{root:__dirname});
    res.sendFile(path.join(__dirname,"./index.html"));

})