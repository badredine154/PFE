import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import propertiesRoutes from './routes/properties.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/properties', propertiesRoutes);

app.get('/', (req, res) => {
    res.send('Hello from homepage')
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.bz5zg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port : http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));