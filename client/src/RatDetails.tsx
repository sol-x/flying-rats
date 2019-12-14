import 'destyle.css';
import './RatDetails.css';
import React, {useState, useEffect} from 'react';
import {API_URL} from './constants';

interface RatDetailsProps {
  name: string;
}

const RatDetails: React.FC<RatDetailsProps> = ({name}) => {
  const [details, setDetails] = useState<Rat | null>();

  useEffect(() => {
    if (name) {
      fetch(`${API_URL}/rat/${name}`)
        .then(res => res.json())
        .then(response => {
          setDetails(response);
        })
        .catch(error => console.log(error));
    }
  }, [name]);

  if (!name || !details) {
    return <div/>;
  }

  return (
    <div className="rat-details">
      <span>Width: {details.width}</span>
      <span>Height: {details.height}</span>
      <span>Nickname: {details.nickname || 'Uncool Rat with no Nickname'}</span>
    </div>
  );
};

export type Rat = {
  width: string;
  height: string;
  nickname?: string;
}
export default RatDetails;
