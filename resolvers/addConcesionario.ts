import {Request, Response} from "npm:express@4.18.2";
import concesionarioModel from "../db/concesionario.ts";

const addConcesionario = async (req: Request, res: Response) => {
    const {nombre} = req.body;                      //Variables que se reciben del body
    if(!nombre){                                    //Si no se recibe el nombre     
        const error={                               //Se devuelve un error
            "error":"missing_data",
            "mensage": "The name is missing. "
          }
          return res.status(400).json(error);
    }

    const alreadyExists = await concesionarioModel.findOne({ nombre }).exec();  //Se busca el concesionario por nombre
    if(alreadyExists){                                                          //Si ya existe
        res.status(400).send("El concesionario ya existe");                     //Se devuelve un error
        const error={
            "error":"already_exists",
            "mensage": "The dealer already exists. "
          }
          return res.status(400).json(error);
    }

    const concesionario = new concesionarioModel({      //Se crea el concesionario
        nombre, coches: []                              //Se crea con nombre y se le asigna un array vacío de coches
    });

    await concesionario.save();         //Se guarda el concesionario

    res.status(200).send({              //Se devuelve el concesionario con los datos: nombre, coches e id
        nombre: concesionario.nombre,
        coches: concesionario.coches,
        id: concesionario.id
    })    
}

export default addConcesionario;        //Se exporta la función