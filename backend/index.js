const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

const apiKey = "b634efbe35mshffbf34e2aa26d58p1303f5jsn23f2c1c12fc9";

const makeApiRequest = async (location) => {
  const options = {
    method: "GET",
    url: "https://realtor.p.rapidapi.com/locations/v2/auto-complete",
    params: {
      input: location,
      limit: "10",
    },
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "realtor.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

app.get("/api/real-estate/:location", async (req, res) => {
  try {
    const location = req.params.location;
    const data = await makeApiRequest(location);
    res.json(data);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
