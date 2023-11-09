import express, { Request, Response } from "npm:express@4.18.2";    //Importo express
import mongoose from "npm:mongoose@7.6.3";                          //Importo mongoose
import {load} from "https://deno.land/std@0.204.0/dotenv/mod.ts";   //Importo librería para acceder a mi .env

import addCoche from "./resolvers/addCoche.ts";                                     
import deleteModeloCoche from "./resolvers/deleteModeloCoche.ts";                   
import addConcesionario from "./resolvers/addConcesionario.ts";
import deleteConcesionario from "./resolvers/deleteConcesionario.ts";
import addCliente from "./resolvers/addCliente.ts";
import deleteCliente from "./resolvers/deleteCliente.ts";
import sendCoche from "./resolvers/sendCoche.ts";
import getCochesConcesionario from "./resolvers/getCochesConcesionario.ts";
import sellCoche from "./resolvers/sellCoche.ts";
import getCochesCliente from "./resolvers/getCochesCliente.ts";
import deleteCocheConcesionario from "./resolvers/deleteCocheConcesionario.ts";
import deleteCocheCliente from "./resolvers/deleteCocheCliente.ts";
import traspasoCoche from "./resolvers/traspasoCoche.ts";
import addDinero from "./resolvers/addDinero.ts";
import bloquearVentas from "./resolvers/bloquearVentas.ts";

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
    .post("/addCoche", addCoche)                                                                             //Añado coche
    .delete("/deleteModeloCoche/:matricula", deleteModeloCoche)                                              //Borro coche
    .post("/addConcesionario", addConcesionario)                                                             //Añado concesionario
    .delete("/deleteConcesionario/:nombre", deleteConcesionario)                                             //Borro concesionario
    .post("/addCliente", addCliente)                                                                         //Añado cliente
    .delete("/deleteCliente/:dni", deleteCliente)                                                            //Borro cliente
    .post("/sendCoche/:matriculacoche/:nombreconcesionario", sendCoche)                                      //Envío coche a concesionario
    .get("/getCochesConcesionario/:concesionario", getCochesConcesionario)                                   //Obtengo coches de un concesionario
    .post("/sellCoche/:nombreconcesionario/:matriculacoche/:dnicliente", sellCoche)                          //Vendo coche
    .get("/getCochesCliente/:dnicliente", getCochesCliente)                                                  //Obtengo coches de un cliente
    .delete("/deleteCocheConcesionario/:matriculacoche/:nombreconcesionario", deleteCocheConcesionario)      //Borro coche de un concesionario
    .delete("/deleteCocheCliente/:matriculacoche/:dni", deleteCocheCliente)                                  //Borro coche de un cliente
    .post("/traspasoCoche/:matriculacoche/:dnitraspasa/:dnirecibe", traspasoCoche)                           //Traspaso coche de un cliente a otro
    .post('/addDinero/:dni/:cantidad', addDinero)                                                            //Añado dinero a un cliente                              
    .post('/bloquearVenta/:nombreConcesionario/:estadoBloqueo', bloquearVentas);                             //Bloqueo ventas de un concesionario

    app.listen(3000, () => console.info("Listening on port 3000. API ready to use"));   //Escucho en el puerto 3000
}
catch(e){
    console.error(e);
}   