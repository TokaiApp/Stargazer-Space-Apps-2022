import './App.css';
//import { Grid, Input, Text, Button } from '@nextui-org/react';
import { Text }from '@nextui-org/react';
//Import 3D force graph effect
import React from 'react';
//import { useState } from 'react';
//import * as THREE from 'three';
//import SpriteText from 'three-spritetext';
import SampleData from './data/sample.json';
import ForceGraph3d from "react-force-graph-3d";
/*
function WelcomeView (){
  const axios = require('axios');
  const [userInput, setUserInput] = useState('');
  /*
  axios({
    method: 'post',
    url: 'https://dxdr-ai.herokuapp.com/',
    data: {
      input: userInput
    }
  }).then((postResponse) => {
    console.log(postResponse);
  });

  const handleClicked = () => {
    axios({
      method: 'post',
      url: 'https://dxdr-ai.herokuapp.com/request',
      data: {
        input: userInput
      }
    }).then((postResponse) => {
      console.log(postResponse);
    });
  }
  /*
  axios.post('https://dxdr-ai.herokuapp.com/', {
    input: userInput
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

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
              //Listen for the user input and store it in the userInput variable
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
                console.log(userInput);
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

const UserView = () => {
/*
  const axios = require('axios');
  
  //Use state to store the user input from the server return using axios
  const [userInput, setUserInput] = useState('');
  axios({
    method: 'get',
    url: 'http://localhost:5000/api/v1/users',
  }).then((getResponse) => {
    console.log(getResponse);
    setUserInput(getResponse.data);
  });
*/
  // Format the user input as a JSON object
  //Turn the user input into a JSON object and store it in the data variable;
  //const gData = SampleData;
  const gData = DataMapper(SampleData.nodes.length);
  
  //const sprite = new SpriteText(SampleData.nodes.id);
  
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
      </div>
    </div>
  );
}

function App() {
/*
  const axios = require('axios');
  const [serverResponse, setServerResponse] = useState('');
  axios({
    method: 'get',
    url: 'https://dxdr-ai.herokuapp.com/predict',
  }).then((getResponse) => {
    setServerResponse(getResponse.data);
  });
*/
  return (
      //Conditionally render the WelcomeView or UserView based on the serverResponse
      /*
      <div>
        {serverResponse === 'ok' ? <UserView /> : <WelcomeView />}
      </div>
      */
      <UserView />
  );
}

export default App;
