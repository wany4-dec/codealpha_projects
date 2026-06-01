const express = require('express');
const app = express();
const PORT = 3000;
//THIS PARSES JSON  REQUEST BODIES
app.use(express.json());
//THIS TESTS THE ROUTE
app.get('/', (req, res) => {
  res.send('Express server is successfully running!');
});
//THIS IS WHERE IT STARTS LISTENING FOR THE REQUESTS
app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});