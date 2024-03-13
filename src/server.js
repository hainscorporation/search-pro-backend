import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from "helmet";
import axios from "axios";

import router from "./routes/routes.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 3000;;

// CORS
const corsOptions = {
  exposedHeaders: ['X-Auth', 'X-Total-Pages','X-Current-Page', 'X-Total-Record', 'X-Page-Size', 'X-Next-Page','X-Prev-Page'],
  origin: ['*'],
  methods: ['GET','HEAD','POST','PUT','PATCH','DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(helmet());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.post('/validate-lot-plan', async (req, res) => {
  try {
    const username = process.env.PSL_PLUS_USERNAME;
    const password = process.env.PSL_PLUS_PASSWORD;
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    
    const body = {
      ValidateLotPlan: {
        usernameOrEmail: username,
        LotNumber: req.body.lot,
        PlanNumber: req.body.plan
      }
    }

    const response = await axios.post(
      'https://information.qld.gov.au/service/Addressing/ValidationService/PLSplusPublic/rest/ValidateLotPlan', 
      body, 
      {
        headers: {
          'accept': 'application/json',
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const shapedResponse = {
      council: response.data.ValidateLotPlanResponse.ValidateLotPlanResult.Results.Result.LocalGovernmentArea,
      address: response.data.ValidateLotPlanResponse.ValidateLotPlanResult.Results.Result.MetaData[1],
      parcel: response.data.ValidateLotPlanResponse.ValidateLotPlanResult.Results.Result.Parcel
    }
    
    res.json(shapedResponse);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing the request.');
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(Status_Codes.InternalServer).json({error: 'Internal server error: Something is broken'})
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});