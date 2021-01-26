import express, { Express } from 'express';
import mongoose from 'mongoose';
import authRoute from './routes/auth';
import cors from "cors"
import indexRoute from './routes';
import config from './config/dbconfig';

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000

app.use(cors())

app.use('/', indexRoute);
app.use('/api/auth', authRoute);

const {MONGO_PATH, MONGO_DB} = config.env;
const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
const uri = `mongodb://${MONGO_PATH}/${MONGO_DB}`;
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
})