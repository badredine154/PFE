import mongoose from "mongoose";


const propertySchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required:true
    },
    type:{
        type: String,
        enum: ["apartment","house","land","studio","warehouse"],
        required: true
    },
    purpose:{
        type: String,
        enum: ["rent","sale"],
        required: true
    },
    area:{
        type: String,
        required: true
    },
    baths:{
        type: Number,
        required: true
    },
    rooms:{
        type: Number,
        required: true
    },
    agency: { type: String },

    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    rentFrequency: { type: Number },
    furnishingStatus: { type: Boolean },
    amenities: { type: [String] },
    photos:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:["available","sold"],
        required:true
    }

})

const property = mongoose.model ('property', propertySchema);

export default property;
