import './App.css';
import { Grid, Input, Text, Button } from '@nextui-org/react';
//import { Text }from '@nextui-org/react';
//Import 3D force graph effect
import React from 'react';
import { useState } from 'react';
import SampleData from './data/sample.json';
import ForceGraph3d from "react-force-graph-3d";
/*
function WelcomeView (){
  const axios = require('axios');
  const [userInput, setUserInput] = useState('');

  const handleClicked = () => {
    //Use axios to send the user input to the server without a cors error
    axios({
      method: 'POST',
      //url: 'https://stagazerbackend.azurewebsites.net/api/request',
      url: 'http://127.0.0.1:5000/api/request',
      data: userInput,
      headers: { 'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                  //Add encoding method as utf-8
                  'Accept': 'application/json, text/plain, ',
                  'Accept-Language': 'en-US,en;q=0.9'}
    }).then((postResponse) => {
      console.log(postResponse);
    }
    );
  }

  return (
    <div className="App">
      <div className="App-background">
        <Grid.Container gap={2} justify="center" alignItems="center" direction="column">
          <Grid justify="center" alignItems="center" direction="column">
            <Text h4>Welcome 2022 NASA Space App Challenge</Text>
            <Text h1>Enter your search</Text>
          </Grid>
          <Grid justify="center" alignItems="center" direction="column">
            <Input 
              width="350px"
              placeholder="Your input here"
              //Use react state to store the user input
              onChange={(e) => setUserInput(e.target.value)}
              animated
              aria-label="Close"
            />
          </Grid>
          <Grid justify="center" alignItems="center" direction="column">
            <Button
              color="primary"
              auto
              onPress={() => {
                //console.log(userInput);
                handleClicked();
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid.Container>
      </div>
    </div>
  );
}
*/
//Find the length of the SampleData object
function DataMapper(N = 100) {
  return {
    nodes: [...Array(N).keys()].map(i => ({ id: i })),
    links: [...Array(N).keys()]
      .filter(id => id)
      .map(id => ({
        source: id,
        target: Math.round(Math.random() * (id - 1))
      }))
  };
}
/*
const UserView = () => {
/*
  const axios = require('axios');
  
  //Use state to store the user input from the server return using axios
  const [userInput, setUserInput] = useState('');
  axios({
    method: 'get',
    url: 'http://127.0.0.1:5000/api/response',
    //CORS error
    headers: { 'Access-Control-Allow-Origin': '*' }
  }).then((getResponse) => {
    console.log(getResponse);
    setUserInput(getResponse.data);
  });

  const [viewState, setViewState] = useState(false);
  const axios = require('axios');
  const handleHomeClicked = () => {
    axios({
      method: 'POST',
      //url: 'https://stagazerbackend.azurewebsites.net/api/request',
      url: 'http://127.0.0.1:5000/api/req/home',
      data: "home",
      headers: { 'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                  //Add encoding method as utf-8
                  'Accept': 'application/json, text/plain, ',
                  'Accept-Language': 'en-US,en;q=0.9'}
    }).then((postResponse) => {
      console.log(postResponse);
    }
    );
    //setViewState(true);
  }
  // Format the user input as a JSON object
  const gData = DataMapper(SampleData.nodes.length);
  
  return (
    <div className="App">
      <div className="App-background">
        <Text h1>Your Star Map</Text>
        <ForceGraph3d
          height={700}
          backgroundColor={"rgba(0,0,0,0)"}
          nodeColor={() => "white"}
          linkColor={() => "black"}
          graphData={gData}
        />
        <Grid.Container gap={2} justify="center" alignItems="center" direction="column">
          <Grid justify="center" alignItems="center" direction="row">
        <Button
          color="primary"
          auto
          onPress={() => {
            setViewState(!viewState);
          }}
          >
          Reload
        </Button>
          </Grid> 
        <Grid justify="center" alignItems="center" direction="row">
        <Button
          color="primary"
          auto
          onPress={() => {
            handleHomeClicked();
          }}
          >
          Back to the search page
        </Button>
        </Grid>
        </Grid.Container>
      </div>
    </div>
  );
}
*/
export default function App() {
  //const [serverResponse, setServerResponse] = useState(false);

  // Use state to determine if we need to move back to the welcome page
  /*
  const [viewState, setViewState] = useState(false);
  axios({
    method: 'GET',
    //url: 'https://stagazerbackend.azurewebsites.net/api/request',
    url: 'http://127.0.0.1:5000/api/response/',
    headers: { 'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                //Add encoding method as utf-8
                'Accept': 'application/json, text/plain, *',
                'Accept-Language': 'en-US,en;q=0.9'}
  }).then((postResponse) => {
    console.log("Server Response", postResponse);
    setViewState(true);
  }
  );

  console.log(viewState);
  */
  //Use state to store the status response from the server return using axios
  const axios = require('axios');
  const [userInput, setUserInput] = useState('');

  const handleClicked = () => {
    //Use axios to send the user input to the server without a cors error
    axios({
      method: 'POST',
      //url: 'https://stagazerbackend.azurewebsites.net/api/request',
      url: 'https://stagazerbackend.azurewebsites.net/api/request',
      data: userInput,
      headers: { 'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                  //Add encoding method as utf-8
                  'Accept': 'application/json, text/plain, */*',
                  'Accept-Language': 'en-US,en;q=0.9'}
    }).then((postResponse) => {
      console.log(postResponse);
    }
    );
  }

  return (
    <div className="App">
    <div className="App-background">
      <Grid.Container gap={2} justify="center" alignItems="center" direction="column">
        <Grid justify="center" alignItems="center" direction="column">
          <Text h4>Welcome 2022 NASA Space App Challenge</Text>
          <Text h1>Enter your search</Text>
          <Input 
            width="350px"
            placeholder="Your input here"
            //Use react state to store the user input
            onChange={(e) => setUserInput(e.target.value)}
            animated
            aria-label="Close"
          />
        </Grid>
        <Grid justify="center" alignItems="center" direction="column">
          <Button
            color="primary"
            auto
            onPress={() => {
              //console.log(userInput);
              handleClicked();
            }}
          >
            Search
          </Button>
        </Grid>
        <Grid justify="center" alignItems="center" direction="column">
          <ForceGraph3d
            height={650}
            backgroundColor={"rgba(0,0,0,0)"}
            nodeColor={() => "white"}
            linkColor={() => "black"}
            graphData={DataMapper(SampleData.nodes.length)}
          />
        </Grid>

      </Grid.Container>
    </div>
  </div>
  );
}
