const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/message', (req, res) => {
  res.json({ message: "Welcome User" });
  console.log("API message sent");
});

// Endpoint to handle POST request
app.post('/submit', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}! nice to meet you!` });
  console.log("API message sent");
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});