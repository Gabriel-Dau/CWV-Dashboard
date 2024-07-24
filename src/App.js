import DataTable from 'react-data-table-component';
import React from 'react';
import './App.css';
import styled from 'styled-components';

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

const ClearButton = styled('button')`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 34px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2979ff;
  border: none;
  color: white;
`;

const FilterComponent = ({ filterText, onFilter, onClear, placeholder }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder={placeholder}
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton type="button" onClick={onClear}>
      X
    </ClearButton>
  </>
);

const ExpandedContent = ({ data }) => {
  const map = {
    'value': 'Value', 
    'rating': 'Rating', 
    'url': 'URL', 
    'date': 'Date', 
    'domNode': 'DOM Node', 
    'domPath': 'DOM Path', 
    'userAgent': 'User Agent',
  };
  return (
    <table className='expandedContent'>
      <tbody>
        {Object.keys(map).map(key =>
          <tr key={key} className="expandedContentRow">
            <td className='expandedContentKey'>{map[key]}: </td>
            <td className='expandedContentValue'>{data[key]}</td>
          </tr>
        )}
      </tbody>
  </table>
  )
};
  
function App() {
  const [data, setData] =  React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:3000').then(response =>
      response.json().then(data => {
        const urlParams = new URLSearchParams(window.location.search);
        const url = urlParams.get('url');
        const dataAsArray = Object.keys(data).map(key => data[key]);
        const filteredData = url ? dataAsArray.filter(data => data.url?.toLowerCase().includes(decodeURIComponent(url))) : dataAsArray;
        setData(filteredData);
      })
    );
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
        padding: '0px 24px',
        color: 'white'
      },
      
    },
    {
      when: row => row.value >= 201 && row.value <= 500,
      style: {
        backgroundColor : 'rgba(248, 148, 6, 0.9)',
        padding: '0px 24px',
        color: 'white'
      },
    },
    {
      when: row => row.value > 500,
      style: {
        backgroundColor : 'rgba(242, 38, 19, 0.9)',
        padding: '0px 24px',
        color: 'white'
      },
    }
  ];
  
  const [filterText, setfilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

  const filteredItems = data.filter(item =>
    `${item.date?.toLowerCase()} ${item.userAgent?.toLowerCase()} ${item.rating?.toLowerCase()}`.includes(filterText.toLowerCase())
  );
  
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setfilterText('');
      }
    };
    return (
      <div className="subHeader">
        <h1>Interaction to Next Paint</h1>
        <div className="filter">
          <FilterComponent 
            placeholder="Search"
            onFilter={e => setfilterText(e.target.value)} 
            onClear={handleClear} 
            filterText={filterText} 
          />
        </div>
      </div>
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="App">
      <div className="dataTable">
        <DataTable
          columns={columns}
          data={filteredItems}
          theme="dark"
          pagination
          paginationPerPage={25}
          paginationRowsPerPageOptions={[25, 50, 75, 100]}
          paginationResetDefaultPage={resetPaginationToggle}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
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