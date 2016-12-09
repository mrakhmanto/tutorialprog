var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient= require('mongodb').MongoClient

app.use(bodyParser.urlencoded({extended:true})) 

app.set('view engine', 'ejs');

//**connect db
MongoClient.connect('mongodb://mrakhmanto:123456@ds127948.mlab.com:27948/progtutorial', function(err, database){
  if (err) return console.log(err)
  db=database
  app.listen(3000, function(){
  console.log('3000 jalan') 
  });
});

//**index page
app.get('/', function (req, res){
    res.render('index'); //res.render itu udah otomatis masuk ke folder views
});

//**articles
app.get('/articles', function (req, res) {
  db.collection('progtutorialcoll').find().toArray((err, articles) => { //data dari mlab dimasukkin ke paramater kedua (articles)  / naming suka2 // kalo yg err wajib gaboleh diganti2

    if (err) return console.log(err)
    // renders index.ejs
    res.render('articles', {articles: articles}) //es6 ==> 1 aja cukup {articles})
  });
});

//**create article
app.get('/createarticle', function(req, res){
  //res.sendFile(__dirname + '/createarticle.html')
  res.render('createarticle');
});

app.post('/createarticle', function(req, res){
  //console.log(req.body)
  db.collection('progtutorialcoll').save(req.body, function(err, result){
    if (err) return console.log(err)

    console.log('saved to database')
    res.render('createarticle');
  });
});

//**categories
app.get('/categories', function (req, res){
    res.render('categories')
});

