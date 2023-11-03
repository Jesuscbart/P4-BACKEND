import mongoose from "npm:mongoose@7.6.3";
import { Coche } from "../types.ts";

const Schema = mongoose.Schema;   // Se crea un esquema de mongoose

const cocheSchema = new Schema(   // Se crea el esquema de mongoose
  {
    matricula: { type: String, required: true, unique: true },  // Se define el campo matrícula de tipo String (único)
    nombre: { type: String, required: true },                   // Se define el campo nombre de tipo String
    precio: { type: Number, required: true },                   // Se define el campo precio de tipo Number
  },
  { timestamps: true }  
);  

export type CocheModelType = mongoose.Document & Omit<Coche, "id">; // Se crea el tipo CocheModelType que es un Document de mongoose y que tiene todos los campos menos el id

const CocheModel = mongoose.model<CocheModelType>("Coches", cocheSchema); //"Coches" es el nombre de la colección en la base de datos

export default CocheModel;  // Se exporta el modelo de coche