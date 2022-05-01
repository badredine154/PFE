import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const properties = [
]

router.get('/', (req, res) => {
    res.send(properties);
});

router.post('/', (req, res) => {
    const property = req.body;

    properties.push({...property, id: uuidv4()});

    res.send(`property with name : ${property.title} added to the database`);
})

export default router;
