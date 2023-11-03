import mongoose from "npm:mongoose@7.6.3";
import { Cliente } from "../types.ts";

const Schema = mongoose.Schema;       // Se crea un esquema de mongoose

const clienteSchema = new Schema(     // Se crea el esquema de mongoose
  {
    dni: { type: String, required: true, unique: true },        // Se define el campo dni de tipo String (único)
    nombre: { type: String, required: true },                   // Se define el campo nombre de tipo String
    dinero: { type: Number, required: true },                   // Se define el campo dinero de tipo Number
    coches: [{ type: Schema.Types.ObjectId, ref: "Coches" }],   // Se define el campo coches de tipo Array de tipo ObjectId
  },
  { timestamps: true }  
);  

export type ClienteModelType = mongoose.Document & Omit<Cliente, "id">; // Se crea el tipo CocheModelType que es un Document de mongoose y que tiene todos los campos menos el id

const ClienteModel = mongoose.model<ClienteModelType>("Clientes", clienteSchema); //"Clientes" es el nombre de la colección en la base de datos

export default ClienteModel;  // Se exporta el modelo de cliente