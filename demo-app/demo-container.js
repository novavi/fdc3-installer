const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors({
  origin: [
    'http://localhost:3000'
  ]
}));
app.use(express.static('public-container'));

app.listen(port, () => {
  console.log(`Micro-frontend Container listening on port ${port}`)
});
