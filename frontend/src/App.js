import './App.css';
import { Grid, Input, Text } from '@nextui-org/react';

function App() {
  return (
    <div className="App">
      <div className="App-background">
        <Grid.Container justify="center" alignItems="center" direction="column">
          <Grid justify="center" alignItems="center" direction="column">
            <Text h1>Enter your Search</Text>
          </Grid>
          <Grid justify="center" alignItems="center" direction="column">
            <Input width="350px" animated placeholder="Your Idea..." />
          </Grid>
        </Grid.Container>

      </div>
    </div>
  );
}

export default App;
