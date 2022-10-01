import './App.css';
import { Grid, Input, Text } from '@nextui-org/react';
import { useState } from 'react';
import { axios } from 'axios';

// Import a new view when the backend return a normal response
import { userView } from './views/userView';

const WelcomeView = () => {
  const [inputValue, setInputValue] = useState('');
  axios({
    method: 'post',
    url: 'http://localhost:5000/api',
    data: {
      inputValue: inputValue,
    },
  }).then((postResponse) => {
      console.log(postResponse);
  });

  return (
    <Grid.Container justify="center" alignItems="center" direction="column">
          <Grid justify="center" alignItems="center" direction="column">
            <Text h1>Enter your Search</Text>
          </Grid>
          <Grid justify="center" alignItems="center" direction="column">
            <Input 
              width="350px"
              placeholder="Your input here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              animated
            />
          </Grid>
        </Grid.Container>
  );
}

function App() {
  const backendResponse = axios({
    method: 'get',
    url: 'http://localhost:5000/api',
  }).then((response) => {
    console.log(response);
    return response;
  });

  return (
    <div className="App">
      <div className="App-background">
        {backendResponse.data === 'normal' ? <userView /> : <WelcomeView />}   
      </div>
    </div>
  );
}

export default App;
