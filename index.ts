import express from 'express'
import dotenv from 'dotenv';
import path from 'path';

import corsMiddleware from './src/config/cors';
import logMiddleware from './src/config/log';
import router from './src/routes';

dotenv.config();

const app = express()
const PORT = process.env.SERVER_PORT || 8000;

app.use(corsMiddleware);
app.use(logMiddleware)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.use('/api', router);

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT} 🚀`))