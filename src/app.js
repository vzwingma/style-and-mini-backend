const express = require('express');
const setupRoutes = require('./routes/index');

const app = express();
const PORT = 8091;

app.use(express.json());
setupRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});