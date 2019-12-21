import React, { useState, useEffect } from "react";
import axios from 'axios';

function SelectRats() {
  const initialValue = [{ id: 0, value: "No Rats" }];
  const ALL_SELECT_VALS = [{ id: 0, value: "No Rats" }];
  const [nameOfRat, setNameOfRat] = useState("No Rats")
  const [responseRats, setResponseRats] = useState(initialValue)
  const [selectedRatData, setSelectedRatData] = useState({ width: 0, height: 0, nickname: "Uncool Rat with no Nickname" })
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:7421/rat-names'
      );
      for (var v in result.data) {
        ALL_SELECT_VALS.push({ id: parseInt(v) + 1, value: result.data[v] })
      }
      setResponseRats(ALL_SELECT_VALS);
    };
    fetchData();
  })

  function handleChange(event) {
    setNameOfRat(event.target.value)
  }

  useEffect(() => {
    const fetchSelectedRatData = async () => {
      let url = 'http://localhost:7421/rat/' + nameOfRat
      const resultData = await axios(url);
      setSelectedRatData(resultData.data)
    };
    if (nameOfRat && nameOfRat !== 'No Rats') {
      fetchSelectedRatData();
    }
  }, [nameOfRat])

  useEffect(() => {
    const getScreenSize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', getScreenSize);
    return () => {
      window.removeEventListener('resize', getScreenSize);
    }
  })

  return (
    <div>
      <div className={windowWidth < 500 ? "detailsBox" : ""}>
        <select onChange={handleChange} className="select-css">
          {responseRats.map((localState) => (
            <option value={localState.value}>{localState.value}</option>
          ))}
        </select>
      </div>
      {nameOfRat !== "No Rats" &&
        <div className="detailsBox">
          <div className="detailsBoxdiv">
            <div>Height</div>
            <div className="detailsBoxdiv">{selectedRatData.height}</div>
          </div>
          <div className="detailsBoxdiv">
            <div>Width</div>
            <div className="detailsBoxdiv">{selectedRatData.width}</div>
          </div>
          <div className="detailsBoxdiv">
            <div>Nick Name</div>
            {
              selectedRatData.nickname ?
                <div className="detailsBoxdiv">{selectedRatData.nickname}</div>
                :
                <div className="detailsBoxdiv">Uncool Rat with no Nickname</div>
            }
          </div>
        </div>
      }
    </div>
  );
}

export default SelectRats;