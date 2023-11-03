import {Request, Response} from "npm:express@4.18.2";
import clienteModel from "../db/cliente.ts";

const addCliente = async (req: Request, res: Response) => {
    const {dni, nombre, dinero} = req.body;     // Variables que se reciben del body
    if(!dni || !nombre || !dinero){             // Si falta alguna de las variables
        res.status(400).send("Missing data");   // Se devuelve un error
        return;
    }

    const alreadyExists = await clienteModel.findOne({ dni }).exec();   // Se busca el cliente por DNI
    if(alreadyExists){                                                  // Si ya existe                               
        res.status(400).send("El cliente ya existe");                   // Se devuelve un error
        return;
    }

    const cliente = new clienteModel({               // Se crea el cliente                     
        dni, nombre, dinero, coches: []              // Se crea con dni, nombre, dinero y se le asigna un array vacío de coches
    });

    await cliente.save();        // Se guarda el cliente

    res.status(200).send({       // Se devuelve el cliente con los datos: dni, nombre, dinero, coches e id
        dni: cliente.dni,
        nombre: cliente.nombre,
        dinero: cliente.dinero,
        coches: cliente.coches,
        id: cliente.id
    })    
}

export default addCliente;       // Se exporta la función