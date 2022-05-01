import express from 'express';
import bodyParser from 'body-parser';

import propertiesRoutes from './routes/properties.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/properties', propertiesRoutes);

app.get('/', (req,res) =>{
    res.send('Hello from homepage')
})

app.listen(PORT, () => console.log(`server running on port : http://localhost:${PORT}`));