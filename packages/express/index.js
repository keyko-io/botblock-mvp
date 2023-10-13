import axios from "axios";
import cors from "cors";
import express from "express";

const app = express();
const port = 4040;

app.use(cors());

app.get("/fetch-robots-txt", async (req, res) => {
  const { url } = req.query; // Extract the 'url' query parameter

  if (!url) {
    return res.status(400).send("Missing url parameter");
  }

  try {
    const response = await axios.get(`${url}/robots.txt`);
    res.send(JSON.stringify(response.data));
  } catch (error) {
    res.status(500).send("Error fetching robots.txt");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
