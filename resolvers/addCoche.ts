import {Request, Response} from "npm:express@4.18.2";
import cocheModel from "../db/coche.ts";

const addCoche = async (req: Request, res: Response) => {
    const {matricula, nombre, precio} = req.body;   // Variables que se reciben del body
    if(!matricula || !nombre || !precio){           // Si falta alguno de los datos
        const error={                               // Se devuelve un error
            "error":"missing data",               
            "mensage": "Some required data is missing. "
          }
          return res.status(400).json(error);
    }

    const alreadyExists = await cocheModel.findOne({ matricula }).exec();   // Se busca el coche por matrícula
    if(alreadyExists){                                                      // Si ya existe                                           
        const error={                                                       // Se devuelve un error
            "error":"car_already_exists",
            "mensage": "The car already exists. "
          }
          return res.status(400).json(error);
    }
    if(precio < 0){                                                         // Si el precio es negativo                      
        const error={                                                       // Se devuelve un error
            "error":"price_negative",
            "mensage": "Price can't be negative. "
          }
          return res.status(400).json(error);
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