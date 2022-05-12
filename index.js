import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import propertiesRoutes from './routes/properties.js';
import mongoose from 'mongoose';

import AdminBro from 'admin-bro';
import expressAdminBro from '@admin-bro/express';
import mongooseAdminBro from '@admin-bro/mongoose';

import property from './models/property.js';

const app = express();
const PORT = process.env.PORT || 5000;

AdminBro.registerAdapter(mongooseAdminBro);
const AdminBroOptions = { resources: [property] }

const adminBro = new AdminBro(AdminBroOptions);
const router = expressAdminBro.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);


app.use(cors());
app.use(bodyParser.json());

app.use('/properties', propertiesRoutes);

app.get('/', (req, res) => {
    res.send('Hello from homepage')
})

mongoose.connect('mongodb+srv://admin:admin@cluster0.bz5zg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port : http://localhost:${PORT}/admin`)))
    .catch((error) => console.log(error.message));