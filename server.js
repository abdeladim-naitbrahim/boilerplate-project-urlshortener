require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
var dns = require('dns');
mongoose=require('mongoose');
process.env.MONGO_URI="mongodb+srv://bnight:8DRaVVfxQdJJQz7f@cluster0.pdoqs.mongodb.net/<dbname>?retryWrites=true&w=majority";

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


try{
   mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
   console.log("conect pice");
}
 catch(e)
  {
    console.log("catch3");
    console.log(e.error);
    console.log("catch4");
  }

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(bodyParser.json());

// Basic Configuration
let Person;
const  {Schema}  = mongoose;
 let urls=[];
  const personSchema  = new Schema({
    type:String,
data : { original_url : String, short_url : Number} ,
  });
     Person = mongoose.model('Person', personSchema);
let data0;
async function  geturls()
  {await Person.find({type:"url"}).select("data").exec((err,data)=>{
   if (err) {
   console.log("err");
        console.log(err);
        return 0;
      }
    else {
      console.log("get");
      data0=data;
     urls= data0.map(x=>x.data);
      return data;     
      }
      });}
 geturls();
 
console.log(data0);

 let i=0;
 
 app.post('/api/shorturl/new', function(req, res) {
	 
   //console.log(req.body);
let b=false;
let z0;


   let x=req.body.url;
   console.log(urls);
   while(!urls.reduce((s,xx)=>s&(xx.short_url!=i),true))
   i++;
   let y={ original_url : x, short_url : i};
 if((/^https:\/\/(www\.)*(([\w-])+)(\.([\w-]+))+(\/\w+)*$/).test(x))
 {urls.forEach((z)=>{if(z.original_url==x){b=true;y=z;}});
 if(!b)
 
 
 {let p=new Person( {type:"url",
 data:y});

 p.save(function(err,data) {if (err) {
   console.log("err2");
        console.log(err);}});
 }
 
 
 
   
	 urls[i]=y;
   console.log(y);
 res.json(y);
//res.json({ error: 'invalid url' });
}
 else
  {console.log({ error: 'invalid url' })
  
	 res.json({ "error": "Invalid URL" });}
});

app.get('/api/shorturl/:idurl', function(req, res) {
 // { error: 'invalid url' }
  console.log(urls[req.params.idurl])
  dns.lookup('www.w3schools.com', function (err, addresses, family) {
    if(!err)
    res.redirect(urls[req.params.idurl].original_url);
    else
    console.log("invalide");
  console.log(addresses);
});
  
});
