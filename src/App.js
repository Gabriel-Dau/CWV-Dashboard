import DataTable from 'react-data-table-component';
import React from 'react';
import './App.css';



function App() {
  const [data, setData] =  React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000').then(response => response.json().then(data => {
      setData(Object.keys(data).map(key => data[key]));
    }));
  }, []);

  const columns = [
    {
      name: 'Value',
      sortable: true,
      selector: row => row.value, 
    },
    {
      name: 'Rating',
      selector: row => row.rating,
      sortable: true,
    },
    {
      name: 'Delta',
      selector: row => row.delta,
      sortable: true,
    },
    {
      name: 'URL',
      selector: row => row.url,
      sortable: true,
    },
    {
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    }
  ];
  
  // const Basic = () => <DataTable title="Interaction to Next Paint" columns={columns} data={data} pagination />;
  
  return (
    <div className="App">
      <h2>Interaction to Next Paint</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
     />
    </div>
  );
}

export default App;
// save