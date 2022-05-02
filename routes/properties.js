import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let properties = [
]

router.get('/', (req, res) => {
    res.send(properties);
});

router.post('/', (req, res) => {
    const property = req.body;

    properties.push({...property, id: uuidv4()});

    res.send(`property with name : ${property.title} added to the database`);
});

router.get('/:id',(req,res) => {
    const { id } = req.params;

    const foundProperty = properties.find((property) => property.id === id);

    res.send(foundProperty);
});

router.delete('/:id', (req,res) => {
    const { id } = req.params;

    properties = properties.filter((property) => property.id !== id);

    res.send(`Property with the id${id} deleted`);


});

export default router;
