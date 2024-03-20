const express = require("express");
const mongoose = require("mongoose");
const { Recetas } = require("./models");

require("dotenv").config();

const app = express();
app.use(express.json());

app.get('/api/recetas', async (req, res) => {
    try {
      const recetas = await Recetas.find();
      const count = recetas.length;
      res.json({
        info: { count },
        results: recetas
      });
    } catch (error) {
      console.error("Error al obtener las recetas:", error);
      res.status(500).json({ error: "Error al obtener las recetas" });
    }
  });

  app.get('/api/recetas/:id', async (req, res) => {
    try {
      const receta = await Recetas.findById(req.params.id);
      if (!receta) {
        return res.status(404).json({ error: "Receta no encontrada" });
      }
      res.json(receta);
    } catch (error) {
      console.error("Error al obtener la receta:", error);
      res.status(500).json({ error: "Error al obtener la receta" });
    }
  });

  app.post('/api/recetas', async (req, res) => {
    try {
      const nuevaReceta = new Recetas(req.body);
      await nuevaReceta.save();
      res.json({ success: true, id: nuevaReceta._id });
    } catch (error) {
      console.error("Error al crear la receta:", error);
      res.status(500).json({ success: false, message: "Error al crear la receta" });
    }
  });

  app.put('/api/recetas/:id', async (req, res) => {
    try {
      const recetaActualizada = await Recetas.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!recetaActualizada) {
        return res.status(404).json({ success: false, message: "Receta no encontrada" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error al actualizar la receta:", error);
      res.status(500).json({ success: false, message: "Error al actualizar la receta" });
    }
  });

  app.delete('/api/recetas/:id', async (req, res) => {
    try {
      const recetaEliminada = await Recetas.findByIdAndDelete(req.params.id);
      if (!recetaEliminada) {
        return res.status(404).json({ success: false, message: "Ha ocurrido un error" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error al eliminar la receta:", error);
      res.status(500).json({ success: false, message: "Error al eliminar la receta" });
    }
  });

  const start = async () => {
    try {
      await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
      app.listen(8080, () => console.log("Server started on port 8080"));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();