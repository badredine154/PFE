import { v4 as uuidv4 } from 'uuid';

let properties = [
]

export const createProperty = (req, res) => {
    const property = req.body;

    properties.push({...property, id: uuidv4()});

    res.send(`property with name : ${property.title} added to the database`);
}

export const getProperties = (req, res) => {
    res.send(properties);
}

export const getProperty = (req,res) => {
    const { id } = req.params;

    const foundProperty = properties.find((property) => property.id === id);

    res.send(foundProperty);
}

export const deleteProperty = (req,res) => {
    const { id } = req.params;

    properties = properties.filter((property) => property.id !== id);

    res.send(`Property with the id${id} deleted`);
}

export const updateProperty = (req,res) => {
    const { id } = req.params;
    const { title, location, Price, type, yearOfConstruction} = req.body;

    const property = properties.find((property) => property.id === id);

    if(title) property.title = title;
    if(location) property.location = location;
    if(Price)  property.Price = Price;
    if(type)  property.type = type;
    if(yearOfConstruction) property.yearOfConstruction = yearOfConstruction;

    res.send(`user with the id${id} has been updated`);
}