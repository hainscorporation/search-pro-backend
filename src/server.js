import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from "helmet";

import router from "./routes/routes.js";

dotenv.config()

const app = express();
const port = 8000;


// CORS
const corsOptions = {
  exposedHeaders: ['X-Auth', 'X-Total-Pages','X-Current-Page', 'X-Total-Record', 'X-Page-Size', 'X-Next-Page','X-Prev-Page'],
  origin: ['http://localhost:3000'],
  methods: ['GET','HEAD','POST','PUT','PATCH','DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet());

app.use('/', router);

/* app.get('/', (req, res) => {
  res.send('Welcome to my server!');
}); */

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(Status_Codes.InternalServer).json({error: 'Internal server error: Something is broken'})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});