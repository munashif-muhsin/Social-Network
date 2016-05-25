/**
 * Created by Muhsin on 13/05/2016.
 */


var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://localhost:7474');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(express.static(__dirname + "/Webpage"));


router.get('/showPosts/', function (req, res) {

    console.log(new Date().getTime());

    var id = req.body.id;
    console.log("id: ", id);





    db.cypher({
        query: 'match (a:Person),(m:POST),(b:Person),(a)-[:FOLLOWING]->(b)-[:POSTED]->(m) where id(a)='+id+' with collect({personid:m.personid, text:m.text, personname:m.personname,timestamp:m.timestamp, likes:m.likes, id:id(m)}) as rows match (z:Person)-[:POSTED]->(p:POST) where id(z)='+id+' WITH rows + collect({personid:p.personid, text:p.text, personname:p.personname,timestamp:p.timestamp, likes:p.likes, id:id(p)}) as allRows UNWIND allRows as row return row as u ORDER BY u.timestamp DESC'
    }, function (err, results) {
        if (err) throw err;
        var result = results[0];
        if (!result) {
            console.log('No user found.');
        } else {
            for (var i = 0; i < results.length; i++) {
                var user = results[i];
                console.log(JSON.stringify(user));
            }
        }
        res.json(results);
    });

});

router.post('/showPosts/', function (req, res) {
    var userID = req.body.userID;
    var text = req.body.text;
    var name= req.body.UserName;
    var Tstamp=new Date().getTime();
    console.log("Timestamp: "+Tstamp);

    db.cypher({
        query:'match (a:Person ) where id(a)='+userID+' create (a)-[:POSTED]->(u:POST{ text:"'+text+'",personid:'+userID+',personname:"'+name+'",timestamp:"'+Tstamp+'",likes:0})  return u'
    }, function (err, results) {
        if (err) throw err;
        console.log(JSON.stringify(results));
        res.json(results);
    });

});

router.post('/like/',function (req,res) {

    var userID = req.body.userID;
    var postID = req.body.postID;
    console.log("User :" + userID);
    console.log("Post :" + postID);

    db.cypher({
        query: 'match (n:Person),(m:POST) where id(n)=' + userID + ' AND id(m)=' + postID + ' create(n)-[r:LIKES]->(m)'
    }, function (err, results) {
        if (err) throw err;
        console.log(JSON.stringify(results));
        res.json(results);
    });


});

router.post('/comment/',function (req,res) {
    var name= req.body.userName;
    var userID = req.body.userID;
    var postID = req.body.postID;
    var text= req.body.text;
    var Tstamp=new Date().getTime();
    console.log("User :" + userID);
    console.log("Post :" + postID);
    console.log("Text :" + text);
    db.cypher({
        query: 'match (n:Person),(m:POST) where id(n)=' + userID + ' AND id(m)=' + postID + ' create (n)-[:COMMENTED]->(x:COMMENT{userID:'+userID+',name:"'+name+'",text:"'+text+'",timestamp:'+Tstamp+'})-[:COMMENTED_ON]->(m)'
    }, function (err, results) {
        if (err) throw err;
        console.log(JSON.stringify(results));
        res.json(results);
    });


});
module.exports = router;