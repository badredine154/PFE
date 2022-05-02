import express from 'express';
import { getProperties, getProperty, createProperty, deleteProperty, updateProperty } from '../controllers/properties.js';

const router = express.Router();

router.get('/',getProperties );

router.post('/',createProperty );

router.get('/:id',getProperty);

router.delete('/:id',deleteProperty );

router.patch('/:id',updateProperty )

export default router;
