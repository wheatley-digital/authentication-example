import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "josephwheatley";
const yourPassword = "hellomyman34";
const yourAPIKey = "b5422e3e-c221-4221-b6b6-c074d9d80862";
const yourBearerToken = "49e38ed5-1701-47d9-b75d-b1e27e595236";

// Get No Auth Data Async Function
async function getNoAuthData(baseURL) {
  try {
    let response = await axios.get(baseURL + '/random');
    let responseData = response.data;
    let responseDataString = JSON.stringify(responseData);
    console.log(responseDataString);
    return responseDataString;
  }
  catch (error) {
    console.error(error);
  }
}

// Get Basic Auth Data Async Function
async function getBasicAuthData(baseURL) {
  try {
    let response = await axios.get(baseURL + "/all?page=2", { auth: {username: yourUsername, password: yourPassword}} );
    let responseData = response.data;
    let responseDataString = JSON.stringify(responseData);
    console.log(responseDataString);
    return responseDataString;
  }
  catch (error) {
    console.error(error);
  }
}

// Get API Key Data Async Function
async function getAPIKeyData(baseURL) {
  try {
    let response = await axios.get(baseURL + "/filter", { params: {score: 5, apiKey: yourAPIKey}} );
    let responseData = response.data;
    let responseDataString = JSON.stringify(responseData);
    console.log(responseDataString);
    return responseDataString;
  }
  catch (error) {
    console.error(error);
  }
}

// Get Bearer Token Data Async Function
async function getBearerTokenData(baseURL) {
  try {
    let response = await axios.get(baseURL + "/secrets/42", { headers: {'Authorization': `Bearer ${yourBearerToken}`}} );
    let responseData = response.data;
    let responseDataString = JSON.stringify(responseData);
    console.log(responseDataString);
    return responseDataString;
  }
  catch (error) {
    console.error(error);
  }
}

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", (req, res) => {
  async function noAuth() {
    let noAuthData = await getNoAuthData(API_URL);
    res.render("index.ejs", { content: noAuthData})
  }
  noAuth();
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

app.get("/basicAuth", (req, res) => {
  async function basicAuth() {
    let basicAuthData = await getBasicAuthData(API_URL);
    res.render("index.ejs", { content: basicAuthData});
  }
  basicAuth();
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", (req, res) => {
  async function apiKeyAuth() {
    let APIKeyAuthData = await getAPIKeyData(API_URL);
    res.render("index.ejs", { content: APIKeyAuthData});
  }
  apiKeyAuth();
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", (req, res) => {
  async function bearerToken() {
    let bearerTokenData = await getBearerTokenData(API_URL);
    res.render("index.ejs", { content: bearerTokenData});
  }
  bearerToken();
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
