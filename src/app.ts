// Carter Campbell
// Importing express, and the request/response modules used to receive and send messages from the live server.
// test update commit
import express from 'express';
import logger from './middleware/logger.middleware';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
// Import the router for records
import recordsRouter from './records/records.routes';
dotenv.config();

// initializing express to handle any HTTP requests or responses
const app = express();
// initializing the port our ts application will run on
const port = 3000;
// parse JSON bodies
app.use(express.json());
// parse url-encoded bodies
app.use(express.urlencoded({extended: true}));

// enable all cors requests
app.use(cors());

// adding set of security middleware
app.use(helmet());

if(process.env.NODE_ENV == 'development') {
  // add logger middleware
  app.use(logger);
  console.log(process.env.GREETING + ' in dev mode');
}

// Use the records router for handling /records endpoints
app.use('/', recordsRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});