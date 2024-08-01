import cors from 'cors'

const allowedOrigins = [
  'http://localhost:3000',
  '*'
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

const corsMiddleware = cors(corsOptions)

export default corsMiddleware;