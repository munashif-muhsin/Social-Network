/**
 * Created by Muhsin on 09/05/2016.
 */

var http = require('http');
var express = require('express');
var bodyParser= require('body-parser');
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');
var app= express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + "/Webpage"));





app.use('/',require('./router/showAllUsers'));
app.use('/',require('./router/showFollowed'));
app.use('/',require('./router/showPosts'));
app.use('/',require('./router/login'));




app.listen(3000);