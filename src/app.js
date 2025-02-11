const express = require('express');
const cors = require('cors');
const setupRoutes = require('./routes/index');

const app = express();
app.use(cors());
const PORT = 8091;

app.use(express.json());
setupRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});