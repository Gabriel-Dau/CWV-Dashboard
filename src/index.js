import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataTable } from './DataTable';
import './index.css';

const InpDashboard = () => {
  const [inpData, setInpData] =  React.useState([]);
  const [title, setTitle] = React.useState('');

  React.useEffect(() => {
    fetch('http://localhost:3000').then(response =>
      response.text().then(dataAsString => {
        const urlParams = new URLSearchParams(window.location.search);
        const url = urlParams.get('url');

        const dataAsArray = dataAsString.split(/\r?\n/).map(item => {
          try {
            return JSON.parse(item);
          } catch (err) {
            return null;
          }
        });

        const filteredData = dataAsArray.filter(item => {
          if (!item) {
            return false;
          } else if (url) {
            return item.url?.toLowerCase().includes(decodeURIComponent(url))
          } else {
            return true;
          }
        });

        setTitle(`Interaction to Next Paint${url ? ` - ${url}` : ''}`);
        setInpData(filteredData);
      })
    );
  }, []);

  return (
    <div className="inpDashboard">
      <DataTable title={title} data={inpData} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<InpDashboard />);
