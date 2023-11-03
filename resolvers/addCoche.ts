import {Request, Response} from "npm:express@4.18.2";
import { Coche } from "../types.ts";
import cocheModel from "../db/coche.ts";

const addCoche = async (req: Request, res: Response) => {
    const {matricula, nombre, precio} = req.body;   // Variables que se reciben del body
    if(!matricula || !nombre || !precio){           // Si falta alguno de los datos
        res.status(400).send("Missing data");       // Se devuelve un error
        return;
    }

    const alreadyExists = await cocheModel.findOne({ matricula }).exec();   // Se busca el coche por matrícula
    if(alreadyExists){                                                      // Si ya existe                       
        res.status(400).send("El coche ya existe");                         // Se devuelve un error
        return;
    }
    if(precio < 0){                                                         // Si el precio es negativo                      
        res.status(400).send("El precio no puede ser negativo");            // Se devuelve un error
        return;
    }

    const coche = new cocheModel({          // Se crea el coche
        matricula, nombre, precio           // Se crea con matrícula, nombre y precio
    });

    await coche.save();                  // Se guarda el coche

    res.status(200).send({              // Se devuelve el coche con los datos: matrícula, nombre, precio e id
        matricula: coche.matricula,         
        nombre: coche.nombre,
        precio: coche.precio,
        id: coche.id
    })    
}

export default addCoche;    // Se exporta la función