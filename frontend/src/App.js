import './App.css';
import { Grid, Input, Text } from '@nextui-org/react';
import { useState } from 'react';
import { axios } from 'axios';

// Instate the axios library



function WelcomeView (){
  const axios = require('axios');
  const [userInput, setUserInput] = useState('');
  axios({
    method: 'post',
    url: 'http://localhost:5000/api/v1/users',
    data: {
      input: userInput
    }
  }).then((postResponse) => {
    console.log(postResponse);
  });

  return (
    <div className="App">
      <div className="App-background">
        <Grid.Container justify="center" alignItems="center" direction="column">
          <Grid justify="center" alignItems="center" direction="column">
            <Text h1>Enter your Search</Text>
          </Grid>
          <Grid justify="center" alignItems="center" direction="column">
            <Input 
              width="350px"
              placeholder="Your input here"
              //Get the user input and set it to the userInput state
              onChange={(e) => setUserInput(e.target.value)}
              animated
            />
          </Grid>
        </Grid.Container>
      </div>
    </div>
  );
}

const UserView = () => {
  return (
    <div className="App">
      <div className="App-background">
      <h1>userView</h1>
      </div>
    </div>
  );
}

function App() {
  const axios = require('axios');
  const [serverResponse, setServerResponse] = useState('');
  axios({
    method: 'get',
    url: 'http://localhost:5000/api',
  }).then((getResponse) => {
    setServerResponse(getResponse.data);
  });

  return (
      //Conditionally render the WelcomeView or UserView based on the serverResponse
      <div>
        {serverResponse === 'Welcome' ? <UserView /> : <WelcomeView />}
      </div>
  );
}

export default App;
