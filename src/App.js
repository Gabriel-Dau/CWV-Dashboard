import DataTable from 'react-data-table-component';
import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Button } from '@mui/material';

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

  const TextField = styled.input`
    height: 32px;
    width: 200px;
    border-radius: 3px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #e5e5e5;
    padding: 0 32px 0 16px;

    &:hover {
      cursor: pointer;
    }
  `;

  const ClearButton = styled(Button)`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 34px;
    width: 32px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <TextField
        id="search"
        type="text"
        placeholder="Filter By Url"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <ClearButton type="button" onClick={onClear}>
        X
      </ClearButton>
    </>
  );
  
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter(item => item.url && item.url.toLowerCase().includes(filterText.toLowerCase()));
  
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="App">
      <div className="title">
        <h1>Interaction to Next Paint</h1>
      </div>
      <div className='dataTable'>
        <DataTable
        columns={columns}
        data={filteredItems}
        theme="dark"
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        subHeader
        subHeaderComponentMemo={subHeaderComponentMemo}
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