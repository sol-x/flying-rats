import 'destyle.css';
import './App.css';
import React, {useState, useEffect} from 'react';
import {API_URL} from './constants';
import RatDetails from "./RatDetails";

const App: React.FC = () => {
  const [ratsNames, setRatsNames] = useState([]);
  const [selectedRat, setSelectedRat] = useState();

  useEffect(() => {
    fetch(`${API_URL}/rat-names`)
      .then(res => res.json())
      .then(response => {
        setRatsNames(response);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className="select" data-testid="rat-select">
        <select onChange={(event) => setSelectedRat(event.target.value)}>
          <option value="">No Rat</option>
          {
            ratsNames.map(name => <option key={name} value={name}>{name}</option>)
          }
        </select>
      </div>
      <RatDetails name={selectedRat}/>
    </div>
  );
};

export default App;
