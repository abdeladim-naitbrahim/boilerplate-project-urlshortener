require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());
// Basic Configuration
 
 let urls=[];
 let i=0;
 
 app.post('/api/shorturl/new', function(req, res) {
	 
   console.log(req.body);
   let x=req.body.url;
 if((/^https:\/\/(www\.)*(([\w-])+)(\.([\w-]+))+(\/\w+)*$/).test(x))
 {let y={ original_url : x, short_url : ++i};
	 urls[i]=y;
 res.json(y);}
 else
	 res.json({ error: 'invalid url' });
});

app.get('/api/shorturl/:idurl', function(req, res) {
  console.log(urls[req.params.idurl])
  res.redirect(urls[req.params.idurl].original_url);
});
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
