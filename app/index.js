import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 3000);

// Aquí configuras tu aplicación Express

export default app;
