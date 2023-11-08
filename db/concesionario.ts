import mongoose from "npm:mongoose@7.6.3";
import {Concesionario } from "../types.ts";

const Schema = mongoose.Schema;           // Se crea un esquema de mongoose

const concesionarioSchema = new Schema(   // Se crea el esquema de mongoose
  {
    nombre: { type: String, required: true, unique: true },     // Se define el campo nombre de tipo String
    coches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coches" }],   // Se define el campo coches de tipo Array de tipo ObjectId
    ventasBloqueadas: { type: Boolean, default: false },        // Se define el campo ventasBloqueadas de tipo Boolean que por defecto es false
  },
  { timestamps: true }  
);  

export type ConcesionarioModelType = mongoose.Document & Omit<Concesionario, "id">; // Se crea el tipo CocheModelType que es un Document de mongoose y que no tiene el campo id

const ConcesionarioModel = mongoose.model<ConcesionarioModelType>("Concesionarios", concesionarioSchema); //"Concesionarios" es el nombre de la colección en la base de datos

export default ConcesionarioModel;  // Se exporta el modelo de concesionario