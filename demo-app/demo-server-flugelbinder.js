const express = require('express');
const cors = require('cors');

const app = express();
const port = 4501;

app.use(cors({
  origin: [
    'http://localhost:3000'
  ]
}));
app.use(express.static('public-server-flugelbinder'));

app.listen(port, () => {
  console.log(`Server Flugelbinder listening on port ${port}`)
});
