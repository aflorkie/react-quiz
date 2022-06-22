import "./App.css";

import Card from "./components/UI/Card";
import Welcome from "./components/UI/Welcome";

const App = ( className ) => {
  return (
    <Card className="App">
      <Welcome />
    </Card>
  );
};

export default App;
