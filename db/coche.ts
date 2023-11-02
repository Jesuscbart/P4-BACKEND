import mongoose from "npm:mongoose@7.6.3";
import { Coche } from "../types.ts";

const Schema = mongoose.Schema; // Se crea un esquema de mongoose

const cocheSchema = new Schema(  // Se crea el esquema de mongoose
  {
    matricula: { type: String, required: true, unique: true },  // Se define el campo dni de tipo String
    nombre: { type: String, required: true }, // Se define el campo nombre de tipo String
    precio: { type: Number, required: true },  // Se define el campo age de tipo Number
  },
  { timestamps: true }  
);  

export type CocheModelType = mongoose.Document

const CocheModel = mongoose.model<CocheModelType>("Coches", cocheSchema);

export default CocheModel;
