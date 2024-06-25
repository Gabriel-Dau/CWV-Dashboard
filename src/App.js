import React from 'react';
import './App.css';

function App() {
  const [data, setData] =  React.useState({});

  React.useEffect(() => {
    fetch('http://localhost:3000').then(response => response.json().then(data => setData(data)));
  }, []);

  console.log(data);

  return (
    <div className="App">
     
    </div>
  );
}

export default App;
