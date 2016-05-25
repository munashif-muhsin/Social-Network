/**
 * Created by Muhsin on 10/05/2016.
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


<<<<<<< HEAD
router.get('/showFollowed/', function (req, res) {

    var id = req.body.id;
=======
router.get('/showFollowed:id', function (req, res) {

    var id = req.params.id;
>>>>>>> origin/master
    console.log("id: ", id);

    db.cypher({
        query: 'MATCH (a:Person),(u:Person) WHERE id(a)='+id+' AND (a)-[:FOLLOWING]->(u) AND NOT id(u)='+id+' return u'
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

router.post('/showFollowed/', function (req, res) {

    var userID = req.body.userID;
    var unfollowID = req.body.unfollowID;
    console.log("User :" + userID);
    console.log("Follow :" + unfollowID);

    db.cypher({
        query:'match (n:Person),(m:Person),(m)-[r:FOLLOWING]->(n) where id(m)='+userID+' AND id(n)='+unfollowID+' delete r'
    }, function (err, results) {
        if (err) throw err;
        console.log(JSON.stringify(results));
        res.json(results);
    });

});


module.exports = router;