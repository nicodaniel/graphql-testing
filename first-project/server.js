/**
 * Express and GraphQL
 * enable CORS to call localhost
 * get first page of github data
 */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors');
const axios = require('axios');

var schema = buildSchema(`
  type Query {
	repository(id: Int!): Repository,
	repositories: [Repository]
  },
  type Repository {
	id: Int
	name: String
	description: String
	created_at: String
	clone_url: String
  }
`);


var getRepository = function(args) {
    var id = args.id;
    return githubData.filter(repository => {
        return repository.id == id;
    })[0];
};

/**
 * Get all repo from page 1
 * @param args
 */
var getRepositories = function(args) {
    return getDataFromGithubAPI();
};

var root = {
    repository: getRepository,
    repositories: getRepositories,
};

/**
 * Get data from github page 1
 */
var getDataFromGithubAPI = function(){
    var URL = "https://api.github.com/orgs/bamlab/repos?page=1";
    return axios({
        url: URL,
        method: 'GET',
    }).then(res => {
        return res.data;
    }).catch(error => {
        console.error("something went wrong...", error);
    });
};

var app = express();
// enable fucking `cors`
app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
