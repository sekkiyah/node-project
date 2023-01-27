const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const logger = require('./utils/logger');
const user = require('./routes/user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5001;
const app = express();

dotenv.config({ path: './config/config.env' });
connectDb();

app.use(bodyParser.json());
app.use(cookieParser);

app.use(logger);
app.use('/user', user);

const server = app.listen(PORT, () => {
	console.log(`Server is listening on PORT ${PORT}`);
});

process.on('unhandledRejection', err => {
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});
