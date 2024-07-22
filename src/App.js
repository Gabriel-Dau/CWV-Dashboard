import  from 'react-data-table-component';
import React from 'react';
import './App.css';

const ExpandedContent = ({ data }) => {
  const items = ['value', 'rating', 'url', 'date', 'delta', 'navigationType', 'id', 'DOMpath', 'userAgent']
  return (
    <table className='expandedContent'>
      {items.map(item => 
        <tr>
          <td>{item}: </td>
          <td className='expandedContentKey'>{data[item]}</td>
        </tr>
      )}
    
  </table>
  )
}
  

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
      name: 'Date',
      selector: row => row.date,
      sortable: true,
    }
  ];
    
  const conditionalRowStyles = [
    {
      when: row => row.value <= 200,
      style: {
        backgroundColor : 'rgba(63, 195, 128, 0.9)',
        color: 'white'
      },
      
    },
    {
      when: row => row.value >= 201 && row.value <= 500,
      style: {
        backgroundColor : 'rgba(248, 148, 6, 0.9)',
        color: 'white'
      },
    },
    {
      when: row => row.value > 500,
      style: {
        backgroundColor : 'rgba(242, 38, 19, 0.9)',
        color: 'white'
      },
    }
  ]
    
  return (
    <div className="App">
      <div className="title">
        <h1>Interaction to Next Paint</h1>
      </div>
      <div className='dataTable'>
        <DataTable
        columns={columns}
        data={data}
        theme="dark"
        pagination
        persistTableHead={true}
        conditionalRowStyles={conditionalRowStyles}
        expandableRows
        expandableRowsComponent={ExpandedContent}
        />
     </div>
    </div>
  );
}

export default App;