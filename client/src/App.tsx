import "destyle.css";
import React from "react";
import SelectRats from "./SelectRats"

const App: React.FC = () => {
  return (
  <div>list of RATS That should stay away from my DAMN BINS
    <SelectRats />
  </div>
  );
};

export default App;
