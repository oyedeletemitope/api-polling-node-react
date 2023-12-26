import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    console.log("Fetching data..."); // Log fetching message
    try {
      const response = await axios.get(
        "http://localhost:3001/api/real-estate/new-york"
      );
      setData(response.data);
      console.log("Data retrieved:", response.data); // Log retrieved data
    } catch (error) {
      console.error(error);
    }
  };

  // UseEffect to run fetchData initially
  useEffect(() => {
    fetchData();

    // Set up interval for API polling (e.g., every 5 seconds)
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Run effect only on mount

  return (
    <div>
      <h1>Real Estate Data for New York</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App;
