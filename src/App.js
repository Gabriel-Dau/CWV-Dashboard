import DataTable from 'react-data-table-component';
import React from 'react';
import './App.css';

function App() {
  const [data, setData] =  React.useState({});

  React.useEffect(() => {
    fetch('http://localhost:3000').then(response => response.json().then(data => {
      setData(Object.keys(data).map(key => data[key]));
    }));
  }, []);

  const columns = [
    {
      name: 'Value',
      selector: row => row.value, 
    },
    {
      name: 'Rating',
      selector: row => row.rating,
    },
    {
      name: 'Delta',
      selector: row => row.delta,
    },
    {
      name: 'URL',
      selector: row => row.url,
    },
    {
      name: 'Date',
      selector: row => row.date,
    }
  ];

  return (
    <div className="App">
     <DataTable
      columns={columns}
      data={data}
     />
    </div>
  );
}

export default App;
// save