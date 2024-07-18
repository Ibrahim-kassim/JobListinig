const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const jobRoutes = require('./routes/jobs');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors())

// Connect to Database
connectDb();

// Middleware
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/jobs', jobRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
