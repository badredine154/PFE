import { v4 as uuidv4 } from 'uuid';

import property from '../models/property.js';

export const createProperty = (req, res) => {
    const property = new propertyModel (req.body);

    properties.push({ ...property, id: uuidv4() });

    res.send(`property with name : ${property.title} added to the database`);
}

export const getProperties = async (req, res) => {
    try {
        const properties = await property.find();

        res.status(200).json(properties);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const getProperty = (req, res) => {
    const { id } = req.params;

    const foundProperty = properties.find((property) => property.id === id);

    res.send(foundProperty);
}

export const deleteProperty = (req, res) => {
    const { id } = req.params;

    properties = properties.filter((property) => property.id !== id);

    res.send(`Property with the id${id} deleted`);
}

export const updateProperty = (req, res) => {
    const { id } = req.params;
    const { title, location, Price, type, yearOfConstruction } = req.body;

    const property = properties.find((property) => property.id === id);

    if (title) property.title = title;
    if (location) property.location = location;
    if (Price) property.Price = Price;
    if (type) property.type = type;
    if (yearOfConstruction) property.yearOfConstruction = yearOfConstruction;

    res.send(`user with the id${id} has been updated`);
}