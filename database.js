/**
 * Created by Muhsin on 26/05/2016.
 */
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://neo4j:neo4jpass@localhost:7474');
module.exports = db;