import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import router from "./routes/routes.js";

import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";

dotenv.config()

const app = express();
const port = 8000;

// DB Mongoose connection
const uri = process.env.MONGODB_URI;

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({
      ping: 1
    });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// run().catch(console.dir);


// SEEDER
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  try {
    await client.connect();
    console.log("Connected correctly to server");

    const collection = await client.db("surch-it").collection("orders");

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    // make a bunch of time series data
    let timeSeriesData = [];

    for (let i = 0; i < 5; i++) {
      let newOrder = {
        searchName: faker.string.alpha(10),
        requested: faker.date.past(),
        ordered: faker.date.anytime(),
        resultSent: faker.date.anytime(),
        ref: faker.string.alphanumeric({
          casing: 'upper'
        }),
        buyers: [],
        sellers: [],
        propertyAddress: faker.location.streetAddress(),
        council: faker.location.state(),
        lot: faker.number.int({
          min: 1,
          max: 99
        }),
        plan: faker.number.int({
          min: 100,
          max: 9999
        }),
        planType: faker.string.alpha(2),
        price: faker.commerce.price({
          min: 100000,
          max: 3000000,
          dec: 0,
          symbol: '$'
        }),
        requestedBy: faker.company.name()
      };

      for (let j = 0; j < randomIntFromInterval(1, 6); j++) {
        let newBuyer = {
          name: faker.person.fullName(),
        }
        let newSeller = {
          name: faker.person.fullName(),
        }
        newOrder.buyers.push(newBuyer);
        newOrder.sellers.push(newSeller);
      }
      timeSeriesData.push(newOrder);
    }
    collection.insertMany(timeSeriesData);

    console.log("Database seeded! :)");
  } catch (err) {
    console.log(err.stack);
  } finally {    
    await client.close();
  }
}

// seedDB();

// CORS
let corsOptions = {
  origin: ['http://localhost:3000'],
}

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

app.use('/', router);

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});