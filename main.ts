import express, { Request, Response } from "npm:express@4.18.2";  //Importo express
import mongoose from "npm:mongoose@7.6.3";  //Importo mongoose
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";   //Importo librería para acceder a mi .env

import addCoche from "./resolvers/addCoche.ts";  //Importo addCoche
import deleteCoche from "./resolvers/deleteCoche.ts";
import addConcesionario from "./resolvers/addConcesionario.ts";
import deleteConcesionario from "./resolvers/deleteConcesionario.ts";
import addCliente from "./resolvers/addCliente.ts";
import deleteCliente from "./resolvers/deleteCliente.ts";

import sendCoche from "./resolvers/sendCoche.ts";

const env = await load();   //Cargo variables de entorno

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");  //Si no hay archivo .env, leo las variables del sistema operativo buscando MONGO_URL
if(!MONGO_URL){
    console.error("Debes definir la variable MONGO_URL");
    Deno.exit(1);
}

try{

    await mongoose.connect(MONGO_URL);   //Conecto a mongo
    console.info("Successfully connected to MongoDB");

    
    const app = express()   //Creo app
    app.use(express.json());    //Uso json

    app
    .post("/addCoche", addCoche)  //Añado coche
    .delete("/deleteCoche/:matricula", deleteCoche)  //Borro coche
    .post("/addConcesionario", addConcesionario)  //Añado concesionario
    .delete("/deleteConcesionario/:nombre", deleteConcesionario)  //Borro concesionario
    .post("/addCliente", addCliente)  //Añado cliente
    .delete("/deleteCliente/:dni", deleteCliente)  //Borro cliente

    .post("/sendCoche/:matriculacoche/:nombreconcesionario", sendCoche)  //Envío coche a concesionario

    


    app.listen(3000, () => console.info("Listening on port 3000. API ready to use"));
}
catch(e){
    console.error(e);
}   
// Copiar objeto de mongo a otro-relacionar objetos de mongo-con cambiar el precio de uno, se actualiza el precio de todos

