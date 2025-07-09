import React, { useState } from "react";
import AppRoutes from "./routes";

function App() {
 
  const [changes, setChanges] = useState([]);

 
  const handleChange = (change) => {
    setChanges((prev) => [...prev, change]);
  };

  return <AppRoutes changes={changes} onChange={handleChange} />;
}

export default App;
