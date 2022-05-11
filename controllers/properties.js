import mongoose from 'mongoose';

import property from '../models/property.js';

export const createProperty = async (req, res) => {
    const Property = req.body;

    const newProperty = new property(Property);

    try {
        await newProperty.save();

        res.status(201).json(newProperty);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getProperties = async (req, res) => {
    try {
        const properties = await property.find();

        res.status(200).json(properties);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProperty = async (req, res) => {
    const { id } = req.params;
    try{
    const Property = await property.findById(id);
    
    res.json(Property);
    } catch(error) {
        res.json({message: error});
    }
}

export const deleteProperty = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No property with that id');

    await property.findByIdAndRemove(id);

    res.json({ message: 'Property deleted successfully' });
}

export const updateProperty = async (req, res) => {
    const { id: _id } = req.params;
    const Property = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No property with that id');

    const updatedProperty = await property.findByIdAndUpdate(_id, { ...Property, _id }, { new: true });

    res.json(updatedProperty);
}