import 'destyle.css';
import './App.css';
import React, {useState, useEffect} from 'react';
import {API_URL} from './constants';

const App: React.FC = () => {
  const [ratsNames, setRatsNames] = useState([]);
  const [selectedRat, setSelectedRat] = useState<Rat | null>();

  useEffect(() => {
    fetch(`${API_URL}/rat-names`)
      .then(res => res.json())
      .then(response => {
        setRatsNames(response);
      })
      .catch(error => console.log(error));
  }, []);

  async function onRatChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedRatName = event.target.value;
    if (!selectedRatName) {
      setSelectedRat(null);
      return;
    }

    const response = await fetch(`${API_URL}/rat/${selectedRatName}`);
    setSelectedRat(await response.json());
  }

  return (
    <div className="container">
      <div className="select" data-testid="rat-select">
        <select onChange={onRatChange}>
          <option value="">No Rat</option>
          {
            ratsNames.map(name => <option key={name} value={name}>{name}</option>)
          }
        </select>
      </div>

      {
        selectedRat &&
        <div className="rat-details">
            <span>Width: {selectedRat.width}</span>
            <span>Height: {selectedRat.height}</span>
            <span>Nickname: {selectedRat.nickname || 'Uncool Rat with no Nickname'}</span>
        </div>
      }
    </div>
  );
};

export type Rat = {
  width: string;
  height: string;
  nickname?: string;
}
export default App;
