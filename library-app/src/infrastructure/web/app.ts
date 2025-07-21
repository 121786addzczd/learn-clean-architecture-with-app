import express from 'express';
import routes from './routers';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

app.use(`/api/${API_VERSION}`, routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api/${API_VERSION}`);
});
