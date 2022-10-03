import './App.css';
import { Grid, Input, Text, Button } from '@nextui-org/react';

//Import 3D force graph effect
import React from 'react';
import { useState } from 'react';
import ForceGraph3d from "react-force-graph-3d";

export default function App() {
 
  const axios = require('axios');
  const [userInput, setUserInput] = useState('');

  const handleClicked = () => {
    axios({
      method: 'POST',
      url: 'https://stagazerbackend.azurewebsites.net/api/request',
      //url: 'http://127.0.0.1:5000/api/request',
      data: userInput,
      headers: { 'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                  'Accept': 'application/json, text/plain, */*',
                  'Accept-Language': 'en-US,en;q=0.9'}
    }).then((postResponse) => {
      setUserInput(postResponse.data);
      console.log(postResponse);
    }
    );
  }

  const DataMapper = (N, data) => {
    return {
      //Use the link to learn the relation between the nodes
      //The value of the link is the group number
      nodes: [...Array(N).keys()].map((i) => ({id: data.nodes[i].id,
                                              group: data.nodes[i].group})),
      links: [...Array(N).keys()].map((i) => ({ 
        //Find the relation between the nodes based on the group number
        //Use the link value and group id to find the relation
        source: data.links[i].source,
        target: data.links[i].target,
        value: data.links[i].value
      })),
    };
  }
  console.log(userInput);

  //Check if the server response is true
  //If true, then render the user view with the star map
  //If false, then render th text input and button
  if (userInput) {
    var gData = DataMapper(userInput.nodes.length, userInput);
  }

  return (
    <div className="App">
    <div className="App-background">
      <Grid.Container gap={2} justify="center" alignItems="center" direction="column">
        <Grid justify="center" alignItems="center" direction="column">
          <Text h4>Welcome to 2022 NASA Space App Challenge: The Art in Our World</Text>
          <Text h4>This is Stargazer System, please enter the keyword of the qeury you want to learn more about</Text>
          <Text h1>Enter your search</Text>
          <Input 
            width="350px"
            placeholder="Your input here"
            onSubmit={(e) => setUserInput(e.target.value)}
            animated
            aria-label="Close"
          />
        </Grid>
        <Grid justify="center" alignItems="center" direction="row">
        
          <Button
            color="primary"
            auto
            onPress={() => {
              handleClicked();
            }}
          >
            Search
          </Button>
          
        </Grid>
        <Grid justify="center" alignItems="center" direction="column">
        {userInput ? (
            <ForceGraph3d
              height={500}
              backgroundColor={"rgba(0,0,0,0)"}
              nodeColor={() => "blue"}
              linkColor={() => "white"}
              graphData={gData}
            />
          ) : (
            <Text h4>Waiting for server response</Text>
          )}
        </Grid>
      </Grid.Container>
    </div>
  </div>
  );
}