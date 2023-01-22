const express = require('express');
const cors = require('cors');

const app = express();
const port = 4500;

app.use(cors({
  origin: [
    'http://localhost:3000'
  ]
}));
app.use(express.static('public-server-acme'));

app.listen(port, () => {
  console.log(`Server Acme listening on port ${port}`)
});
