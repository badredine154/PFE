import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import propertiesRoutes from './routes/properties.js';
import mongoose from 'mongoose';

import mongooseAdminBro from '@admin-bro/mongoose';
import formidableMiddleware from 'express-formidable';
import AdminBro from 'admin-bro';
import AdminBroExpressjs from 'admin-bro-expressjs';
import property from './models/property.js';
import User from './models/User.js';

// We have to tell AdminBro that we will manage mongoose resources with it
AdminBro.registerAdapter(mongooseAdminBro);

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(formidableMiddleware());

app.use('/properties', propertiesRoutes);

app.get('/', (req, res) => {
    res.send('Hello from homepage')
})

// Pass all configuration settings to AdminBro
const adminBro = new AdminBro({
    resources: [{
        resource: property
    },
    {
      resource: User,
      options: {
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: 'string',
            isVisible: {
              list: false, edit: true, filter: false, show: false,
            },
          },
        },
        /*actions: {
          new: {
            before: async (request) => {
              if(request.payload.record.password) {
                request.payload.record = {
                  ...request.payload.record,
                  encryptedPassword: await bcrypt.hash(request.payload.record.password, 10),
                  password: undefined,
                }
              }
              return request
            },
          },
        }*/
      }
    }],
    rootPath: '/admin',
  })

  // Build and use a router which will handle all AdminBro routes
  const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email })
      if (user) {
        
         {
          return user
        }
      }
      return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
  })
  


app.use(adminBro.options.rootPath, router);


mongoose.connect('mongodb+srv://admin:admin@cluster0.bz5zg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port : http://localhost:${PORT}`)))
    .catch((error) => console.log(error.message));