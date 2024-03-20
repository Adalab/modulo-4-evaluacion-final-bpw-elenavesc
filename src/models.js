const mongoose = require("mongoose");

const RecetasSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    ingredientes:{
        type: String,
        required: true,
    },
    instrucciones:{
        type: String, 
        required: true,
    },
});

const Recetas = mongoose.model("Recetas", RecetasSchema);

model.exports = { Recetas };